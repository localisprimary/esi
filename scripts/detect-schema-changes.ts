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

// ============================================================================
// Types
// ============================================================================

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

// ============================================================================
// Main Logic
// ============================================================================

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
    for (const method of ['get', 'post', 'put', 'delete', 'patch']) {
      const operation = pathItem[method] as Operation | undefined
      if (!operation) continue

      const operationId = operation.operationId || `${method}${path}`
      const key = `${method.toUpperCase()}:${path}`

      // Extract parameters
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

      // Extract request body
      let requestBody: OperationInfo['requestBody']
      if (operation.requestBody) {
        const schemaRef = getRequestBodySchemaRef(operation.requestBody)
        requestBody = {
          required: operation.requestBody.required ?? false,
          schemaRef,
        }
      }

      // Extract response (focus on 200 response)
      const responseSchemaRef = getResponseSchemaRef(operation.responses)
      const responseType = getResponseType(operation.responses)

      operations.set(key, {
        operationId,
        method: method.toUpperCase(),
        path,
        parameters: { path: pathParams, query: queryParams },
        requestBody,
        response: {
          schemaRef: responseSchemaRef,
          type: responseType,
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
    // Resolve reference: #/components/parameters/ParameterName
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
    const itemType = getSchemaType(schema.items)
    return `${itemType}[]`
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
  if (!requestBody?.content) return undefined
  const jsonContent = requestBody.content['application/json']
  if (!jsonContent?.schema) return undefined
  if ('$ref' in jsonContent.schema) return jsonContent.schema.$ref
  return undefined
}

function getResponseSchemaRef(
  responses: Operation['responses']
): string | undefined {
  if (!responses) return undefined
  const response = responses['200'] || responses['201']
  if (!response?.content) return undefined
  const jsonContent = response.content['application/json']
  if (!jsonContent?.schema) return undefined
  if ('$ref' in jsonContent.schema) return jsonContent.schema.$ref
  return undefined
}

function getResponseType(
  responses: Operation['responses']
): string | undefined {
  if (!responses) return undefined
  const response = responses['200'] || responses['201']
  if (!response?.content) return undefined
  const jsonContent = response.content['application/json']
  if (!jsonContent?.schema) return undefined
  if ('$ref' in jsonContent.schema) return 'ref'
  return jsonContent.schema.type
}

function compareOperations(
  oldOps: Map<string, OperationInfo>,
  newOps: Map<string, OperationInfo>
): ChangeSet {
  const removed: OperationInfo[] = []
  const added: OperationInfo[] = []
  const modified: ChangeSet['modified'] = []

  // Find removed operations
  for (const [key, oldOp] of oldOps) {
    if (!newOps.has(key)) {
      removed.push(oldOp)
    }
  }

  // Find added and modified operations
  for (const [key, newOp] of newOps) {
    const oldOp = oldOps.get(key)
    if (!oldOp) {
      added.push(newOp)
    } else {
      // Check if operation was modified
      if (hasOperationChanged(oldOp, newOp)) {
        modified.push({ old: oldOp, new: newOp })
      }
    }
  }

  return { removed, added, modified }
}

function hasOperationChanged(
  oldOp: OperationInfo,
  newOp: OperationInfo
): boolean {
  // Compare parameters
  if (!areParametersEqual(oldOp.parameters, newOp.parameters)) {
    return true
  }

  // Compare request body
  if (
    oldOp.requestBody?.required !== newOp.requestBody?.required ||
    oldOp.requestBody?.schemaRef !== newOp.requestBody?.schemaRef
  ) {
    return true
  }

  // Compare response
  if (
    oldOp.response.schemaRef !== newOp.response.schemaRef ||
    oldOp.response.type !== newOp.response.type
  ) {
    return true
  }

  return false
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

function hasBreakingChanges(changes: ChangeSet): boolean {
  // Rule 1: Operations removed
  if (changes.removed.length > 0) {
    return true
  }

  // Rule 2: Check modified operations for breaking changes
  for (const { old: oldOp, new: newOp } of changes.modified) {
    // Breaking: Required path parameter added or removed
    if (
      !areRequiredParametersCompatible(
        oldOp.parameters.path,
        newOp.parameters.path
      )
    ) {
      return true
    }

    // Breaking: Required query parameter added or removed
    if (
      !areRequiredParametersCompatible(
        oldOp.parameters.query,
        newOp.parameters.query
      )
    ) {
      return true
    }

    // Breaking: Parameter type changed
    if (hasParameterTypeChanged(oldOp.parameters, newOp.parameters)) {
      return true
    }

    // Breaking: Enum options removed (type narrowing)
    if (hasEnumNarrowed(oldOp.parameters, newOp.parameters)) {
      return true
    }

    // Breaking: Request body required flag changed to true
    if (
      oldOp.requestBody &&
      newOp.requestBody &&
      !oldOp.requestBody.required &&
      newOp.requestBody.required
    ) {
      return true
    }

    // Breaking: Response schema reference changed
    if (
      oldOp.response.schemaRef &&
      newOp.response.schemaRef &&
      oldOp.response.schemaRef !== newOp.response.schemaRef
    ) {
      return true
    }

    // Breaking: Response type changed
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

function areRequiredParametersCompatible(
  oldParams: ParameterInfo[],
  newParams: ParameterInfo[]
): boolean {
  const oldRequired = new Set(
    oldParams.filter(p => p.required).map(p => p.name)
  )
  const newRequired = new Set(
    newParams.filter(p => p.required).map(p => p.name)
  )

  // Breaking if required params were added or removed
  for (const name of oldRequired) {
    if (!newRequired.has(name)) return false
  }
  for (const name of newRequired) {
    if (!oldRequired.has(name)) return false
  }

  return true
}

function hasParameterTypeChanged(
  oldParams: OperationInfo['parameters'],
  newParams: OperationInfo['parameters']
): boolean {
  const allOldParams = [...oldParams.path, ...oldParams.query]
  const allNewParams = [...newParams.path, ...newParams.query]

  const oldMap = new Map(allOldParams.map(p => [p.name, p]))
  const newMap = new Map(allNewParams.map(p => [p.name, p]))

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
  const allOldParams = [...oldParams.path, ...oldParams.query]
  const allNewParams = [...newParams.path, ...newParams.query]

  const oldMap = new Map(allOldParams.map(p => [p.name, p]))
  const newMap = new Map(allNewParams.map(p => [p.name, p]))

  for (const [name, oldParam] of oldMap) {
    const newParam = newMap.get(name)
    if (!newParam || !oldParam.enum || !newParam.enum) continue

    // Check if any enum values were removed
    const oldSet = new Set(oldParam.enum)
    const removedValues = Array.from(oldSet).filter(
      value => !newParam.enum!.includes(value)
    )
    if (removedValues.length > 0) {
      return true
    }
  }

  return false
}

function hasNewFeatures(changes: ChangeSet): boolean {
  // Rule 1: Operations added
  if (changes.added.length > 0) {
    return true
  }

  // Rule 2: Optional parameters added
  for (const { old: oldOp, new: newOp } of changes.modified) {
    const oldQueryParams = new Set(oldOp.parameters.query.map(p => p.name))
    const newQueryParams = newOp.parameters.query

    for (const param of newQueryParams) {
      if (!param.required && !oldQueryParams.has(param.name)) {
        return true
      }
    }

    // Enum values added (type widening) - consider this a minor change
    const allOldParams = [...oldOp.parameters.path, ...oldOp.parameters.query]
    const allNewParams = [...newOp.parameters.path, ...newOp.parameters.query]

    const oldMap = new Map(allOldParams.map(p => [p.name, p]))
    const newMap = new Map(allNewParams.map(p => [p.name, p]))

    for (const [name, newParam] of newMap) {
      const oldParam = oldMap.get(name)
      if (!oldParam || !oldParam.enum || !newParam.enum) continue

      // Check if any enum values were added
      const oldSet = new Set(oldParam.enum)
      const addedValues = newParam.enum.filter(value => !oldSet.has(value))
      if (addedValues.length > 0) {
        return true
      }
    }
  }

  return false
}

function determineVersionBump(changes: ChangeSet): 'major' | 'minor' | 'patch' {
  if (hasBreakingChanges(changes)) {
    return 'major'
  }

  if (hasNewFeatures(changes)) {
    return 'minor'
  }

  return 'patch'
}

// ============================================================================
// CLI Entry Point
// ============================================================================

function main() {
  const args = process.argv.slice(2)

  if (args.length !== 2) {
    console.error('Usage: detect-schema-changes.ts <old-schema> <new-schema>')
    process.exit(1)
  }

  const [oldSchemaPath, newSchemaPath] = args

  // Load schemas
  const oldSchema = loadSchema(oldSchemaPath)
  const newSchema = loadSchema(newSchemaPath)

  // Extract operations
  const oldOps = extractOperations(oldSchema)
  const newOps = extractOperations(newSchema)

  // Compare operations
  const changes = compareOperations(oldOps, newOps)

  // Determine version bump
  const bump = determineVersionBump(changes)

  // Output result
  console.log(bump)
}

main()
