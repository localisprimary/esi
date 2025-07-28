import fs from 'fs'
import path from 'path'
import camelcase from 'camelcase'
import assert from 'assert'
import { generateReadme, type MethodInfo } from './generate-readme.ts'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const SCHEMA_FILE = path.join(__dirname, './static/openapi.json')
const TYPES_FILE = path.join(__dirname, '../src/types.ts')
const CLIENT_FILE = path.join(__dirname, '../src/client.ts')

interface OpenAPISchema {
  paths?: Record<string, PathItem>
  components?: {
    schemas?: Record<string, Schema>
    headers?: Record<string, HeaderDefinition>
    parameters?: Record<string, Parameter>
  }
}

interface HeaderDefinition {
  description?: string
  schema?: Schema
}

interface PathItem {
  [method: string]: Operation
}

interface Operation {
  operationId?: string
  summary?: string
  description?: string
  parameters?: Parameter[]
  responses?: Record<string, Response>
  requestBody?: RequestBody
}

interface Parameter {
  name: string
  in: 'query' | 'path' | 'header' | 'cookie'
  required?: boolean
  description?: string
  schema?: Schema
}

interface Response {
  content?: {
    'application/json'?: {
      schema?: Schema
    }
  }
  headers?: Record<string, HeaderRef>
}

interface HeaderRef {
  $ref?: string
  description?: string
  schema?: Schema
}

interface RequestBody {
  content?: {
    'application/json'?: {
      schema?: Schema
    }
  }
}

interface Schema {
  type?: 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object'
  properties?: Record<string, Schema>
  required?: string[]
  items?: Schema
  enum?: string[]
  $ref?: string
  description?: string
}

interface QueryParam {
  name: string
  type: string
  required: boolean
  description?: string
}

interface ResponseHeader {
  name: string
  type: string
  description?: string
}

function loadSchema(): OpenAPISchema {
  console.log('Loading OpenAPI schema from local file...')

  if (!fs.existsSync(SCHEMA_FILE)) {
    console.error('Schema file not found. Run "yarn fetch-schema" first.')
    process.exit(1)
  }

  const schemaData = fs.readFileSync(SCHEMA_FILE, 'utf8')
  return JSON.parse(schemaData) as OpenAPISchema
}

function generateTypes(schema: OpenAPISchema): string {
  console.log('Generating TypeScript types...')

  let types = `// Auto-generated TypeScript types for EVE ESI API
export interface EsiResponse<TData, THeaders = Record<string, string>> {
  data: TData;
  status: number;
  headers: THeaders;
}

export interface EsiError {
  error: string;
  status: number;
}

`

  // Skip generating schema component types - only generate transformed response types

  // Generate response types and parameter types for each operation with transformed names
  if (schema.paths) {
    for (const [pathTemplate, pathObj] of Object.entries(schema.paths)) {
      for (const [method, methodObj] of Object.entries(pathObj)) {
        if (['get', 'post', 'put', 'delete'].includes(method.toLowerCase())) {
          const operationId =
            methodObj.operationId ||
            `${method}${pathTemplate.replace(/[^a-zA-Z0-9]/g, '_')}`
          const transformedOperationId = transformOperationId(operationId)

          // Generate response type
          const successResponse =
            methodObj.responses?.['200'] ||
            methodObj.responses?.['201'] ||
            Object.values(methodObj.responses || {})[0]
          if (successResponse?.content?.['application/json']?.schema) {
            const responseSchema =
              successResponse.content['application/json'].schema
            types += generateResponseType(
              transformedOperationId,
              responseSchema,
              schema
            )
          }

          // Generate parameter type
          types += generateParameterType(
            transformedOperationId,
            pathTemplate,
            methodObj,
            schema
          )

          // Generate response header type
          types += generateResponseHeaderType(
            transformedOperationId,
            methodObj,
            schema
          )
        }
      }
    }
  }

  return types
}

function generateResponseType(
  operationName: string,
  responseSchema: Schema,
  fullSchema: OpenAPISchema
): string {
  if (responseSchema.$ref) {
    // Extract the original schema from components
    const refName = responseSchema.$ref.split('/').pop()

    assert(refName)

    const originalSchema = fullSchema.components?.schemas?.[refName]
    if (originalSchema) {
      // Generate the type directly with the transformed name
      return generateTypeFromSchema(`${operationName}Response`, originalSchema)
    }
  }
  // For non-ref schemas, generate inline
  return `export type ${operationName}Response = ${getTypeScriptType(responseSchema)};\n\n`
}

function generateTypeFromSchema(name: string, schema: Schema): string {
  if (schema.type === 'object') {
    let type = `export interface ${name} {\n`
    if (schema.properties) {
      for (const [propName, propSchema] of Object.entries(schema.properties)) {
        const required = schema.required?.includes(propName) ? '' : '?'
        type += `  ${propName}${required}: ${getTypeScriptType(propSchema)};\n`
      }
    }
    type += '}\n\n'
    return type
  } else if (schema.type === 'array') {
    assert(schema.items)

    return `export type ${name} = ${getTypeScriptType(schema.items)}[];\n\n`
  } else {
    return `export type ${name} = ${getTypeScriptType(schema)};\n\n`
  }
}

function getTypeScriptType(schema: Schema): string {
  if (!schema) return 'unknown'

  if (schema.$ref) {
    const type = schema.$ref.split('/').pop()

    assert(type)

    return type
  }

  switch (schema.type) {
    case 'string':
      return schema.enum ? schema.enum.map(v => `'${v}'`).join(' | ') : 'string'
    case 'number':
    case 'integer':
      return 'number'
    case 'boolean':
      return 'boolean'
    case 'array':
      assert(schema.items)
      return `${getTypeScriptType(schema.items)}[]`
    case 'object':
      if (schema.properties) {
        const props = Object.entries(schema.properties)
          .map(([key, value]) => `${key}: ${getTypeScriptType(value)}`)
          .join('; ')
        return `{ ${props} }`
      }
      return 'Record<string, unknown>'
    default:
      return 'unknown'
  }
}

function generateParameterType(
  operationName: string,
  pathTemplate: string,
  methodObj: Operation,
  schema: OpenAPISchema
): string {
  const pathParams = extractPathParams(pathTemplate)
  const queryParams = extractQueryParams(methodObj.parameters || [], schema)
  const hasRequestBody =
    methodObj.requestBody?.content?.['application/json']?.schema

  let allParamTypes: string[] = []
  const usedParamNames = new Set<string>()

  if (pathParams.length > 0) {
    for (const param of pathParams) {
      if (usedParamNames.has(param)) {
        throw new Error(
          `Parameter name conflict in ${operationName}: path parameter '${param}' would be overwritten`
        )
      }
      usedParamNames.add(param)
      allParamTypes.push(`${param}: number | string`)
    }
  }

  if (queryParams.length > 0) {
    for (const param of queryParams) {
      if (usedParamNames.has(param.name)) {
        throw new Error(
          `Parameter name conflict in ${operationName}: query parameter '${param.name}' would be overwritten`
        )
      }
      usedParamNames.add(param.name)
      allParamTypes.push(`${param.name}?: ${param.type}`)
    }
  }

  if (hasRequestBody) {
    const bodyType = getTypeScriptType(hasRequestBody)
    if (hasRequestBody.type === 'object' && hasRequestBody.properties) {
      for (const [propName, propSchema] of Object.entries(
        hasRequestBody.properties
      )) {
        if (usedParamNames.has(propName)) {
          throw new Error(
            `Parameter name conflict in ${operationName}: body property '${propName}' would be overwritten`
          )
        }
        usedParamNames.add(propName)
        const required = hasRequestBody.required?.includes(propName) ? '' : '?'
        allParamTypes.push(
          `${propName}${required}: ${getTypeScriptType(propSchema)}`
        )
      }
    } else {
      // For non-object types (arrays, primitives), use a 'body' property
      if (usedParamNames.has('body')) {
        throw new Error(
          `Parameter name conflict in ${operationName}: 'body' parameter would be overwritten`
        )
      }
      usedParamNames.add('body')
      allParamTypes.push(`body: ${bodyType}`)
    }
  }

  // Only generate parameter type if there are actual parameters
  if (allParamTypes.length === 0) {
    return '' // Don't generate empty interfaces
  }

  return `export interface ${operationName}Params {\n  ${allParamTypes.join(';\n  ')};\n}\n\n`
}

function generateResponseHeaderType(
  operationName: string,
  methodObj: Operation,
  schema: OpenAPISchema
): string {
  const successResponse =
    methodObj.responses?.['200'] ||
    methodObj.responses?.['201'] ||
    Object.values(methodObj.responses || {})[0]

  if (!successResponse) return ''

  const responseHeaders = extractResponseHeaders(successResponse, schema)

  if (responseHeaders.length === 0) {
    return '' // Don't generate empty interfaces
  }

  const headerTypes: string[] = []
  for (const header of responseHeaders) {
    // Response headers are generally optional since they might not always be present
    headerTypes.push(`'${header.name}'?: ${header.type}`)
  }

  return `export interface ${operationName}ResponseHeaders {\n  ${headerTypes.join(';\n  ')};\n}\n\n`
}

function generateJSDoc(methodObj: Operation, pathTemplate: string): string {
  const description = methodObj.description || methodObj.summary

  if (!description) {
    return '' // Don't generate JSDoc if there's no description
  }

  // Generate API Explorer link using the original operation ID
  const operationId =
    methodObj.operationId || `${pathTemplate.replace(/[^a-zA-Z0-9]/g, '_')}`
  const apiExplorerUrl = `https://developers.eveonline.com/api-explorer#/operations/${operationId}`

  return `  /**\n   * ${description.replaceAll(/\n\n/g, '\n\n   * ')}\n\n   * @see ${apiExplorerUrl}\n   */\n`
}

function generateClient(schema: OpenAPISchema): {
  client: string
  methods: MethodInfo[]
} {
  console.log('Generating API client...')
  const methods: MethodInfo[] = []

  let client = `// Auto-generated API client for EVE ESI API
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Types from './types';

export class EsiClient {
  private readonly baseUrl: string = 'https://esi.evetech.net';
  private readonly token?: string;

  constructor(options: { token?: string } = {}) {
    this.token = options.token;
  }

  private async request<TData, THeaders>(
    method: string,
    path: string,
    params?: Record<string, any>,
    body?: any
  ): Promise<Types.EsiResponse<TData, THeaders>> {
    const url = new URL(path, this.baseUrl);

    if (params && method === 'GET') {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = \`Bearer \${this.token}\`;
    }

    const response = await fetch(url.toString(), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      throw {
        error: data.error || 'Request failed',
        status: response.status,
      } as Types.EsiError;
    }

    return {
      data,
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()) as THeaders,
    };
  }

`

  // Generate methods for each endpoint
  if (schema.paths) {
    for (const [pathTemplate, pathObj] of Object.entries(schema.paths)) {
      for (const [method, methodObj] of Object.entries(pathObj)) {
        if (['get', 'post', 'put', 'delete'].includes(method.toLowerCase())) {
          const methodResult = generateMethod(
            pathTemplate,
            method,
            methodObj,
            schema
          )
          client += methodResult.code
          methods.push(methodResult.methodInfo)
        }
      }
    }
  }

  client += '}\n\nexport default EsiClient;\n'
  return { client, methods }
}

function generateMethod(
  pathTemplate: string,
  method: string,
  methodObj: Operation,
  schema: OpenAPISchema
): { code: string; methodInfo: MethodInfo } {
  const operationId =
    methodObj.operationId ||
    `${method}${pathTemplate.replace(/[^a-zA-Z0-9]/g, '_')}`

  const transformedOperationId = transformOperationId(operationId)
  const methodName = camelcase(transformedOperationId, {
    preserveConsecutiveUppercase: true,
  })
  const pathParams = extractPathParams(pathTemplate)
  const queryParams = extractQueryParams(methodObj.parameters || [], schema)

  const paramTypes: string[] = []
  const hasRequestBody =
    methodObj.requestBody?.content?.['application/json']?.schema

  // Check if this method has any parameters
  const hasParams =
    pathParams.length > 0 || queryParams.length > 0 || hasRequestBody

  // Only include params argument if there are actual parameters
  if (hasParams) {
    const hasRequiredParams = pathParams.length > 0 || hasRequestBody
    const optionalMarker = hasRequiredParams ? '' : '?'
    paramTypes.push(
      `params${optionalMarker}: Types.${transformedOperationId}Params`
    )
  }

  const responseType = getResponseType(
    methodObj.responses,
    transformedOperationId
  )

  // Check if this method has response headers
  const successResponse =
    methodObj.responses?.['200'] ||
    methodObj.responses?.['201'] ||
    Object.values(methodObj.responses || {})[0]
  const hasResponseHeaders =
    successResponse &&
    extractResponseHeaders(successResponse, schema).length > 0

  // Generate JSDoc
  const jsdoc = generateJSDoc(methodObj, pathTemplate)

  let methodSignature = `async ${methodName}(${paramTypes.join(', ')}) {\n`
  // if (hasResponseHeaders) {
  //   methodSignature += `: Promise<Types.${transformedOperationId}CompleteResponse> {\n`
  // } else {
  //   methodSignature += `: Promise<Types.EsiResponse<Types.${responseType}>> {\n`
  // }

  let pathReplacement = pathTemplate
  pathParams.forEach(param => {
    pathReplacement = pathReplacement.replace(
      `{${param}}`,
      `\${params.${param}}`
    )
  })

  let methodBody = `    const path = \`${pathReplacement}\`;\n`

  // Extract query parameters if any exist
  if (queryParams.length > 0) {
    const hasRequiredParams = pathParams.length > 0 || hasRequestBody
    if (hasRequiredParams) {
      // params is always defined, no need for ternary
      methodBody += `    const queryParams = { ${queryParams.map(p => `${p.name}: params.${p.name}`).join(', ')} };\n`
    } else {
      // params might be undefined (optional), need ternary check
      methodBody += `    const queryParams = params ? { ${queryParams.map(p => `${p.name}: params.${p.name}`).join(', ')} } : undefined;\n`
    }
  }

  // Extract body if it exists
  if (hasRequestBody) {
    if (hasRequestBody.type === 'object' && hasRequestBody.properties) {
      // Build body object from individual properties
      const bodyProps = Object.keys(hasRequestBody.properties)
        .map(propName => {
          return `${propName}: params.${propName}`
        })
        .join(', ')
      methodBody += `    const body = { ${bodyProps} };\n`
    } else {
      // Body is a simple type, use the body property directly
      methodBody += `    const body = params.body;\n`
    }
  }

  if (hasResponseHeaders) {
    methodBody += `    return this.request<Types.${responseType}, Types.${transformedOperationId}ResponseHeaders>('${method.toUpperCase()}', path`
  } else {
    methodBody += `    return this.request<Types.${responseType}>('${method.toUpperCase()}', path`
  }

  if (queryParams.length > 0) {
    methodBody += ', queryParams'
  } else {
    methodBody += ', undefined'
  }

  if (hasRequestBody) {
    methodBody += ', body'
  } else {
    methodBody += ', undefined'
  }

  methodBody += ');\n  }\n\n'

  const code = jsdoc + '  ' + methodSignature + methodBody

  // Create method info for README generation
  const description = methodObj.description || methodObj.summary || ''
  const apiExplorerUrl = `https://developers.eveonline.com/api-explorer#/operations/${operationId}`

  const methodInfo: MethodInfo = {
    name: methodName,
    description,
    apiExplorerUrl,
  }

  return { code, methodInfo }
}

function extractPathParams(path: string): string[] {
  const matches = path.match(/{([^}]+)}/g)
  return matches ? matches.map(match => match.slice(1, -1)) : []
}

function resolveParameter(
  param: Parameter | { $ref: string },
  schema: OpenAPISchema
): Parameter {
  if ('$ref' in param) {
    const refPath = param.$ref.replace('#/components/parameters/', '')
    const resolvedParam = schema.components?.parameters?.[refPath]
    if (!resolvedParam) {
      throw new Error(`Could not resolve parameter reference: ${param.$ref}`)
    }
    return resolvedParam as Parameter
  }
  return param as Parameter
}

function extractQueryParams(
  parameters: Parameter[],
  schema: OpenAPISchema
): QueryParam[] {
  return parameters
    .map(param => resolveParameter(param, schema))
    .filter(param => param.in === 'query')
    .map(param => ({
      name: param.name,
      type: getTypeScriptType(param.schema || { type: 'string' }),
      required: param.required || false,
      description: param.description || param.schema?.description,
    }))
}

function extractResponseHeaders(
  response: Response,
  schema: OpenAPISchema
): ResponseHeader[] {
  if (!response.headers) return []

  return Object.entries(response.headers).map(([headerName, headerRef]) => {
    if (headerRef.$ref) {
      const refName = headerRef.$ref.replace('#/components/headers/', '')
      const headerDef = schema.components?.headers?.[refName]
      if (!headerDef) {
        throw new Error(`Could not resolve header reference: ${headerRef.$ref}`)
      }
      return {
        name: headerName,
        type: getTypeScriptType(headerDef.schema || { type: 'string' }),
        description: headerDef.description,
      }
    } else {
      return {
        name: headerName,
        type: getTypeScriptType(headerRef.schema || { type: 'string' }),
        description: headerRef.description,
      }
    }
  })
}

function getResponseType(
  responses: Record<string, Response> | undefined,
  transformedOperationId: string
): string {
  const successResponse =
    responses?.['200'] ||
    responses?.['201'] ||
    Object.values(responses || {})[0]
  if (successResponse?.content?.['application/json']?.schema) {
    return `${transformedOperationId}Response`
  }
  return 'unknown'
}

function transformOperationId(operationId: string): string {
  // Remove redundant plurals and Id suffixes to make method names more human-friendly
  // GetAlliancesAllianceIdContactsLabels -> GetAllianceContactsLabels
  // GetCharactersCharacterIdAgentsResearch -> GetCharacterAgentsResearch
  // GetCharactersCharacterIdContractsContractIdBids -> GetCharacterContractBids

  let transformed = operationId

  // Handle specific pattern for contracts ending with ContractId that have distinguishing suffixes
  // GetContractsPublicBidsContractId -> GetContractsPublicBids
  // GetContractsPublicItemsContractId -> GetContractsPublicItems
  transformed = transformed.replace(/ContractId$/g, '')

  // Handle specific patterns where we have [PluralNoun][SingularNoun]Id
  // Match patterns like "AlliancesAllianceId", "CharactersCharacterId", etc.
  transformed = transformed.replace(/([A-Z][a-z]+)s([A-Z][a-z]+)Id/g, '$2')

  // Remove trailing Id when it doesn't add meaning and there's a following word
  transformed = transformed.replace(/Id([A-Z][a-z]+)/g, '$1')

  return transformed
}

async function main(): Promise<void> {
  try {
    const schema = loadSchema()

    const types = generateTypes(schema)
    fs.writeFileSync(TYPES_FILE, types)
    console.log('Generated types.ts')

    const { client, methods } = generateClient(schema)
    fs.writeFileSync(CLIENT_FILE, client)
    console.log('Generated client.ts')

    generateReadme(methods)

    console.log('Generation complete!')
  } catch (error) {
    console.error('Error generating client:', error)
    process.exit(1)
  }
}

main()
