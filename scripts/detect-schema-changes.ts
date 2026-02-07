#!/usr/bin/env node

/**
 * Detects the type of changes between two OpenAPI schemas and determines
 * the appropriate semantic version bump (major/minor/patch).
 *
 * Usage:
 *   node detect-schema-changes.ts <old-schema-path> <new-schema-path>
 *
 * Output:
 *   "major" | "minor" | "patch" (to stdout)
 *
 * Exit codes:
 *   0 = success
 *   1 = error (missing args, file not found, invalid JSON, etc.)
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'

interface OpenAPISchema {
  openapi: string
  info: any
  paths: {
    [path: string]: {
      [method: string]: Operation
    }
  }
  components?: {
    schemas?: { [key: string]: any }
    parameters?: { [key: string]: Parameter }
  }
}

interface Operation {
  operationId?: string
  summary?: string
  description?: string
  parameters?: Array<Parameter | { $ref: string }>
  requestBody?: {
    required?: boolean
    content?: {
      [contentType: string]: {
        schema?: SchemaObject | { $ref: string }
      }
    }
  }
  responses?: {
    [statusCode: string]: {
      description?: string
      content?: {
        [contentType: string]: {
          schema?: SchemaObject | { $ref: string }
        }
      }
    }
  }
}

interface Parameter {
  name: string
  in: 'path' | 'query' | 'header' | 'cookie'
  required?: boolean
  schema?: SchemaObject | { $ref: string }
  description?: string
}

interface SchemaObject {
  type?: string
  $ref?: string
  items?: SchemaObject | { $ref: string }
  properties?: { [key: string]: SchemaObject }
  required?: string[]
  enum?: any[]
}

interface OperationInfo {
  operationId: string
  method: string
  path: string
  parameters: {
    path: ParameterInfo[]
    query: ParameterInfo[]
  }
  requestBody?: {
    required: boolean
    schemaRef?: string
  }
  response: {
    schemaRef?: string
    type?: string
  }
}

interface ParameterInfo {
  name: string
  required: boolean
  type: string
  enum?: string[]
}

interface ChangeSet {
  removed: OperationInfo[]
  added: OperationInfo[]
  modified: Array<{
    old: OperationInfo
    new: OperationInfo
  }>
}

const HTTP_METHODS = ['get', 'post', 'put', 'delete', 'patch'] as const

function loadSchema(filePath: string): OpenAPISchema {
  try {
    const absolutePath = resolve(filePath)
    const content = readFileSync(absolutePath, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      console.error(`Error: File not found: ${filePath}`)
    } else if (error instanceof SyntaxError) {
      console.error(`Error: Invalid JSON in file: ${filePath}`)
    } else {
      console.error(`Error loading schema: ${error}`)
    }
    process.exit(1)
  }
}

function extractOperations(schema: OpenAPISchema): Map<string, OperationInfo> {
  const operations = new Map<string, OperationInfo>()

  for (const [path, pathItem] of Object.entries(schema.paths)) {
    for (const method of HTTP_METHODS) {
      const operation = pathItem[method] as Operation | undefined
      if (!operation) continue

      const operationId = operation.operationId || `${method}${path}`
      const key = `${method.toUpperCase()}:${path}`

      const pathParams: ParameterInfo[] = []
      const queryParams: ParameterInfo[] = []

      if (operation.parameters) {
        for (const param of operation.parameters) {
          const resolved = resolveParameter(param, schema)
          if (!resolved) continue

          const paramInfo: ParameterInfo = {
            name: resolved.name,
            required: resolved.required ?? false,
            type: getSchemaType(resolved.schema),
            enum: getSchemaEnum(resolved.schema),
          }

          if (resolved.in === 'path') {
            pathParams.push(paramInfo)
          } else if (resolved.in === 'query') {
            queryParams.push(paramInfo)
          }
        }
      }

      let requestBody: OperationInfo['requestBody']
      if (operation.requestBody) {
        requestBody = {
          required: operation.requestBody.required ?? false,
          schemaRef: getRequestBodySchemaRef(operation.requestBody),
        }
      }

      const responseSchema = getSuccessResponseJsonSchema(operation.responses)

      operations.set(key, {
        operationId,
        method: method.toUpperCase(),
        path,
        parameters: { path: pathParams, query: queryParams },
        requestBody,
        response: {
          schemaRef: getSchemaRef(responseSchema),
          type: getResponseType(responseSchema),
        },
      })
    }
  }

  return operations
}

function resolveParameter(
  param: Parameter | { $ref: string },
  schema: OpenAPISchema
): Parameter | null {
  if ('$ref' in param) {
    const refPath = param.$ref.replace('#/components/parameters/', '')
    return schema.components?.parameters?.[refPath] || null
  }
  return param
}

function getSchemaType(
  schema: SchemaObject | { $ref: string } | undefined
): string {
  if (!schema) return 'unknown'
  if ('$ref' in schema) return schema.$ref!
  if (schema.type === 'array' && schema.items) {
    return `${getSchemaType(schema.items)}[]`
  }
  return schema.type || 'unknown'
}

function getSchemaEnum(
  schema: SchemaObject | { $ref: string } | undefined
): string[] | undefined {
  if (!schema) return undefined
  if ('$ref' in schema) return undefined
  return schema.enum?.map(String)
}

function getRequestBodySchemaRef(
  requestBody: Operation['requestBody']
): string | undefined {
  const schema = requestBody?.content?.['application/json']?.schema
  if (schema && '$ref' in schema) return schema.$ref
  return undefined
}

function getSuccessResponseJsonSchema(
  responses: Operation['responses']
): SchemaObject | { $ref: string } | undefined {
  if (!responses) return undefined
  const response = responses['200'] || responses['201']
  return response?.content?.['application/json']?.schema
}

function getSchemaRef(
  schema: SchemaObject | { $ref: string } | undefined
): string | undefined {
  if (schema && '$ref' in schema) return schema.$ref
  return undefined
}

function getResponseType(
  schema: SchemaObject | { $ref: string } | undefined
): string | undefined {
  if (!schema) return undefined
  if ('$ref' in schema) return 'ref'
  return schema.type
}

function compareOperations(
  oldOps: Map<string, OperationInfo>,
  newOps: Map<string, OperationInfo>
): ChangeSet {
  const removed: OperationInfo[] = []
  const added: OperationInfo[] = []
  const modified: ChangeSet['modified'] = []

  for (const [key, oldOp] of oldOps) {
    if (!newOps.has(key)) {
      removed.push(oldOp)
    }
  }

  for (const [key, newOp] of newOps) {
    const oldOp = oldOps.get(key)
    if (!oldOp) {
      added.push(newOp)
    } else if (hasOperationChanged(oldOp, newOp)) {
      modified.push({ old: oldOp, new: newOp })
    }
  }

  return { removed, added, modified }
}

function hasOperationChanged(
  oldOp: OperationInfo,
  newOp: OperationInfo
): boolean {
  return (
    !areParametersEqual(oldOp.parameters, newOp.parameters) ||
    oldOp.requestBody?.required !== newOp.requestBody?.required ||
    oldOp.requestBody?.schemaRef !== newOp.requestBody?.schemaRef ||
    oldOp.response.schemaRef !== newOp.response.schemaRef ||
    oldOp.response.type !== newOp.response.type
  )
}

function areParametersEqual(
  oldParams: OperationInfo['parameters'],
  newParams: OperationInfo['parameters']
): boolean {
  return (
    areParameterListsEqual(oldParams.path, newParams.path) &&
    areParameterListsEqual(oldParams.query, newParams.query)
  )
}

function areParameterListsEqual(
  oldList: ParameterInfo[],
  newList: ParameterInfo[]
): boolean {
  if (oldList.length !== newList.length) return false

  const oldMap = new Map(oldList.map(p => [p.name, p]))
  const newMap = new Map(newList.map(p => [p.name, p]))

  for (const [name, oldParam] of oldMap) {
    const newParam = newMap.get(name)
    if (!newParam) return false
    if (
      oldParam.required !== newParam.required ||
      oldParam.type !== newParam.type ||
      !areEnumsEqual(oldParam.enum, newParam.enum)
    ) {
      return false
    }
  }

  return true
}

function areEnumsEqual(
  oldEnum: string[] | undefined,
  newEnum: string[] | undefined
): boolean {
  if (!oldEnum && !newEnum) return true
  if (!oldEnum || !newEnum) return false
  if (oldEnum.length !== newEnum.length) return false
  const oldSet = new Set(oldEnum)
  return newEnum.every(value => oldSet.has(value))
}

function flattenParams(
  params: OperationInfo['parameters']
): Map<string, ParameterInfo> {
  return new Map([...params.path, ...params.query].map(p => [p.name, p]))
}

function hasBreakingChanges(changes: ChangeSet): boolean {
  if (changes.removed.length > 0) return true

  for (const { old: oldOp, new: newOp } of changes.modified) {
    if (
      !areRequiredParamsSame(oldOp.parameters.path, newOp.parameters.path) ||
      !areRequiredParamsSame(oldOp.parameters.query, newOp.parameters.query)
    ) {
      return true
    }

    if (hasParameterTypeChanged(oldOp.parameters, newOp.parameters)) {
      return true
    }

    if (hasEnumNarrowed(oldOp.parameters, newOp.parameters)) {
      return true
    }

    if (
      oldOp.requestBody &&
      newOp.requestBody &&
      !oldOp.requestBody.required &&
      newOp.requestBody.required
    ) {
      return true
    }

    if (
      oldOp.response.schemaRef &&
      newOp.response.schemaRef &&
      oldOp.response.schemaRef !== newOp.response.schemaRef
    ) {
      return true
    }

    if (
      oldOp.response.type &&
      newOp.response.type &&
      oldOp.response.type !== newOp.response.type
    ) {
      return true
    }
  }

  return false
}

function areRequiredParamsSame(
  oldParams: ParameterInfo[],
  newParams: ParameterInfo[]
): boolean {
  const oldRequired = new Set(
    oldParams.filter(p => p.required).map(p => p.name)
  )
  const newRequired = new Set(
    newParams.filter(p => p.required).map(p => p.name)
  )

  if (oldRequired.size !== newRequired.size) return false
  for (const name of oldRequired) {
    if (!newRequired.has(name)) return false
  }
  return true
}

function hasParameterTypeChanged(
  oldParams: OperationInfo['parameters'],
  newParams: OperationInfo['parameters']
): boolean {
  const oldMap = flattenParams(oldParams)
  const newMap = flattenParams(newParams)

  for (const [name, oldParam] of oldMap) {
    const newParam = newMap.get(name)
    if (newParam && oldParam.type !== newParam.type) {
      return true
    }
  }

  return false
}

function hasEnumNarrowed(
  oldParams: OperationInfo['parameters'],
  newParams: OperationInfo['parameters']
): boolean {
  const oldMap = flattenParams(oldParams)
  const newMap = flattenParams(newParams)

  for (const [name, oldParam] of oldMap) {
    const newParam = newMap.get(name)
    if (!newParam || !oldParam.enum || !newParam.enum) continue

    const newSet = new Set(newParam.enum)
    if (oldParam.enum.some(value => !newSet.has(value))) {
      return true
    }
  }

  return false
}

function hasNewFeatures(changes: ChangeSet): boolean {
  if (changes.added.length > 0) return true

  for (const { old: oldOp, new: newOp } of changes.modified) {
    const oldQueryNames = new Set(oldOp.parameters.query.map(p => p.name))
    for (const param of newOp.parameters.query) {
      if (!param.required && !oldQueryNames.has(param.name)) {
        return true
      }
    }

    const oldMap = flattenParams(oldOp.parameters)
    const newMap = flattenParams(newOp.parameters)

    for (const [name, newParam] of newMap) {
      const oldParam = oldMap.get(name)
      if (!oldParam || !oldParam.enum || !newParam.enum) continue

      const oldSet = new Set(oldParam.enum)
      if (newParam.enum.some(value => !oldSet.has(value))) {
        return true
      }
    }
  }

  return false
}

function determineVersionBump(changes: ChangeSet): 'major' | 'minor' | 'patch' {
  if (hasBreakingChanges(changes)) return 'major'
  if (hasNewFeatures(changes)) return 'minor'
  return 'patch'
}

function main(): void {
  const args = process.argv.slice(2)

  if (args.length !== 2) {
    console.error('Usage: detect-schema-changes.ts <old-schema> <new-schema>')
    process.exit(1)
  }

  const [oldSchemaPath, newSchemaPath] = args
  const oldSchema = loadSchema(oldSchemaPath)
  const newSchema = loadSchema(newSchemaPath)
  const oldOps = extractOperations(oldSchema)
  const newOps = extractOperations(newSchema)
  const changes = compareOperations(oldOps, newOps)
  const bump = determineVersionBump(changes)

  console.log(bump)
}

main()
