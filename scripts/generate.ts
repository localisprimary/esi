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
  headers?: Record<string, HeaderDefinition>
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

const SUPPORTED_HTTP_METHODS = ['get', 'post', 'put', 'delete']

function extractRefName(ref: string): string {
  const name = ref.split('/').pop()
  assert(name, `Invalid $ref: ${ref}`)
  return name
}

function getSuccessResponse(
  responses: Record<string, Response> | undefined
): Response | undefined {
  if (!responses) return undefined
  return responses['200'] || responses['201'] || Object.values(responses)[0]
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

  // Track which schema components have been generated to avoid duplicates
  const generatedSchemaComponents = new Set<string>()

  if (schema.components?.parameters) {
    for (const [parameterName, parameterDef] of Object.entries(
      schema.components.parameters
    )) {
      const headerType = getTypeScriptType(
        parameterDef.schema || { type: 'string' }
      )
      types += `export type ${parameterName} = ${headerType};\n`
      // Add parameter names to the set to avoid generating them again as schema components
      generatedSchemaComponents.add(parameterName)
    }
    types += '\n'
  }

  // Skip generating schema component types - only generate transformed response types

  // Generate response types and parameter types for each operation with transformed names
  if (schema.paths) {
    for (const [pathTemplate, pathObj] of Object.entries(schema.paths)) {
      for (const [method, methodObj] of Object.entries(pathObj)) {
        if (!SUPPORTED_HTTP_METHODS.includes(method.toLowerCase())) continue

        const operationId =
          methodObj.operationId ||
          `${method}${pathTemplate.replace(/[^a-zA-Z0-9]/g, '_')}`
        const transformedOperationId = transformOperationId(operationId)

        // Generate response type
        const successResponse = getSuccessResponse(methodObj.responses)
        const responseSchema =
          successResponse?.content?.['application/json']?.schema
        if (responseSchema) {
          types += generateResponseType(
            transformedOperationId,
            responseSchema,
            schema,
            generatedSchemaComponents
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

  return types
}

function generateSchemaComponentIfNeeded(
  refName: string,
  fullSchema: OpenAPISchema,
  generatedSchemaComponents: Set<string>
): string {
  if (generatedSchemaComponents.has(refName)) return ''

  const referencedSchema = fullSchema.components?.schemas?.[refName]
  if (!referencedSchema) return ''

  generatedSchemaComponents.add(refName)
  return generateTypeFromSchema(
    refName,
    referencedSchema,
    fullSchema,
    generatedSchemaComponents
  )
}

function generateResponseType(
  operationName: string,
  responseSchema: Schema,
  fullSchema: OpenAPISchema,
  generatedSchemaComponents: Set<string>
): string {
  let result = ''

  if (responseSchema.$ref) {
    const refName = extractRefName(responseSchema.$ref)
    const originalSchema = fullSchema.components?.schemas?.[refName]
    if (originalSchema) {
      return generateTypeFromSchema(
        `${operationName}Response`,
        originalSchema,
        fullSchema,
        generatedSchemaComponents
      )
    }
  } else if (responseSchema.type === 'array' && responseSchema.items?.$ref) {
    const refName = extractRefName(responseSchema.items.$ref)
    result += generateSchemaComponentIfNeeded(
      refName,
      fullSchema,
      generatedSchemaComponents
    )
    result += `export type ${operationName}Response = ${refName}[];\n\n`
    return result
  } else if (responseSchema.type === 'object' && responseSchema.properties) {
    for (const propSchema of Object.values(responseSchema.properties)) {
      const ref = propSchema.$ref || propSchema.items?.$ref
      if (ref) {
        result += generateSchemaComponentIfNeeded(
          extractRefName(ref),
          fullSchema,
          generatedSchemaComponents
        )
      }
    }
  }

  result += `export type ${operationName}Response = ${getTypeScriptType(responseSchema)};\n\n`
  return result
}

function buildTypeDefinition(name: string, schema: Schema): string {
  if (schema.type === 'object') {
    let type = `export interface ${name} {\n`
    if (schema.properties) {
      for (const [propName, propSchema] of Object.entries(schema.properties)) {
        const optional = schema.required?.includes(propName) ? '' : '?'
        type += `  ${propName}${optional}: ${getTypeScriptType(propSchema)};\n`
      }
    }
    type += '}\n\n'
    return type
  }

  if (schema.type === 'array') {
    assert(schema.items)
    return `export type ${name} = ${getTypeScriptType(schema.items)}[];\n\n`
  }

  return `export type ${name} = ${getTypeScriptType(schema)};\n\n`
}

function generateTypeFromSchema(
  name: string,
  schema: Schema,
  fullSchema?: OpenAPISchema,
  generatedSchemaComponents?: Set<string>
): string {
  let result = ''

  // First, recursively generate any referenced schema components
  if (fullSchema && generatedSchemaComponents) {
    collectAndGenerateReferencedSchemas(
      schema,
      fullSchema,
      generatedSchemaComponents,
      schemaType => {
        result += schemaType
      }
    )
  }

  result += buildTypeDefinition(name, schema)
  return result
}

function collectAndGenerateReferencedSchemas(
  schema: Schema,
  fullSchema: OpenAPISchema,
  generatedSchemaComponents: Set<string>,
  onGenerate: (schemaType: string) => void
): void {
  if (schema.$ref) {
    const refName = extractRefName(schema.$ref)
    if (!generatedSchemaComponents.has(refName)) {
      const referencedSchema = fullSchema.components?.schemas?.[refName]
      if (referencedSchema) {
        generatedSchemaComponents.add(refName)
        collectAndGenerateReferencedSchemas(
          referencedSchema,
          fullSchema,
          generatedSchemaComponents,
          onGenerate
        )
        onGenerate(buildTypeDefinition(refName, referencedSchema))
      }
    }
  } else if (schema.type === 'object' && schema.properties) {
    for (const propSchema of Object.values(schema.properties)) {
      collectAndGenerateReferencedSchemas(
        propSchema,
        fullSchema,
        generatedSchemaComponents,
        onGenerate
      )
    }
  } else if (schema.type === 'array' && schema.items) {
    collectAndGenerateReferencedSchemas(
      schema.items,
      fullSchema,
      generatedSchemaComponents,
      onGenerate
    )
  }
}

function getTypeScriptType(schema: Schema): string {
  if (!schema) return 'unknown'

  if (schema.$ref) {
    return extractRefName(schema.$ref)
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
      return `(${getTypeScriptType(schema.items)})[]`
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

function assertNoConflict(
  usedNames: Set<string>,
  name: string,
  operationName: string,
  source: string
): void {
  if (usedNames.has(name)) {
    throw new Error(
      `Parameter name conflict in ${operationName}: ${source} '${name}' would be overwritten`
    )
  }
  usedNames.add(name)
}

function generateParameterType(
  operationName: string,
  pathTemplate: string,
  methodObj: Operation,
  schema: OpenAPISchema
): string {
  const pathParams = extractPathParams(pathTemplate)
  const queryParams = extractQueryParams(methodObj.parameters || [], schema)
  const requestBodySchema =
    methodObj.requestBody?.content?.['application/json']?.schema

  const allParamTypes: string[] = []
  const usedParamNames = new Set<string>()

  for (const param of pathParams) {
    assertNoConflict(usedParamNames, param, operationName, 'path parameter')
    allParamTypes.push(`${param}: number | string`)
  }

  for (const param of queryParams) {
    assertNoConflict(
      usedParamNames,
      param.name,
      operationName,
      'query parameter'
    )
    allParamTypes.push(`${param.name}?: ${param.type}`)
  }

  if (requestBodySchema) {
    if (requestBodySchema.type === 'object' && requestBodySchema.properties) {
      for (const [propName, propSchema] of Object.entries(
        requestBodySchema.properties
      )) {
        assertNoConflict(
          usedParamNames,
          propName,
          operationName,
          'body property'
        )
        const optional = requestBodySchema.required?.includes(propName)
          ? ''
          : '?'
        allParamTypes.push(
          `${propName}${optional}: ${getTypeScriptType(propSchema)}`
        )
      }
    } else {
      assertNoConflict(usedParamNames, 'body', operationName, 'body parameter')
      allParamTypes.push(`body: ${getTypeScriptType(requestBodySchema)}`)
    }
  }

  if (allParamTypes.length === 0) {
    return ''
  }

  return `export interface ${operationName}Params {\n  ${allParamTypes.join(';\n  ')};\n}\n\n`
}

function generateResponseHeaderType(
  operationName: string,
  methodObj: Operation,
  schema: OpenAPISchema
): string {
  const successResponse = getSuccessResponse(methodObj.responses)
  if (!successResponse) return ''

  const responseHeaders = extractResponseHeaders(successResponse, schema)
  if (responseHeaders.length === 0) return ''

  const headerTypes = responseHeaders.map(
    header => `'${header.name}'?: ${header.type}`
  )

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

const COMPATIBILITY_DATE = '${new Date().toISOString().slice(0, 10)}';

export class EsiClient {
  private readonly baseUrl: string = 'https://esi.evetech.net';
  private readonly userAgent: string = 'localisprimary/esi';
  private readonly token?: string;
  private readonly useRequestHeaders: boolean;

  constructor(options: { userAgent: string; token?: string; useRequestHeaders?: boolean }) {
    this.token = options.token
    this.useRequestHeaders = options.useRequestHeaders ?? true;

    if (options.userAgent?.length) {
      this.userAgent += \` \${options.userAgent}\`
    } else {
      throw new Error('@localisprimary/esi: No user agent provided to constructor')
    }
  }

  private async request<TData, THeaders>(
    method: string,
    path: string,
    params?: Record<string, any>,
    body?: any
  ): Promise<Types.EsiResponse<TData, THeaders>> {
    const url = new URL(path, this.baseUrl);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    if (!this.useRequestHeaders) {
      url.searchParams.append('user_agent', this.userAgent);
      url.searchParams.append('compatibility_date', COMPATIBILITY_DATE);

      if (this.token) {
        url.searchParams.append('token', this.token);
      }
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Compatibility-Date': COMPATIBILITY_DATE,
      'X-User-Agent': this.userAgent,
    };

    if (this.token) {
      headers['Authorization'] = \`Bearer \${this.token}\`;
    }

    const response = await fetch(url.toString(), {
      method,
      headers: this.useRequestHeaders ? headers : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      let error = 'Request failed';
      try {
        const errorData = await response.json();
        error = errorData.error || error;
      } catch {}
      throw {
        error,
        status: response.status,
      } as Types.EsiError;
    }

    const data = await response.json();

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
        if (!SUPPORTED_HTTP_METHODS.includes(method.toLowerCase())) continue

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
  const requestBodySchema =
    methodObj.requestBody?.content?.['application/json']?.schema

  const hasParams =
    pathParams.length > 0 || queryParams.length > 0 || requestBodySchema
  const hasRequiredParams = pathParams.length > 0 || requestBodySchema

  // Build method signature
  let paramsArg = ''
  if (hasParams) {
    const optionalMarker = hasRequiredParams ? '' : '?'
    paramsArg = `params${optionalMarker}: Types.${transformedOperationId}Params`
  }

  const responseType = getResponseType(
    methodObj.responses,
    transformedOperationId
  )

  const successResponse = getSuccessResponse(methodObj.responses)
  const hasResponseHeaders =
    successResponse &&
    extractResponseHeaders(successResponse, schema).length > 0

  const jsdoc = generateJSDoc(methodObj, pathTemplate)
  const methodSignature = `async ${methodName}(${paramsArg}) {\n`

  // Build path with parameter substitution
  let interpolatedPath = pathTemplate
  for (const param of pathParams) {
    interpolatedPath = interpolatedPath.replace(
      `{${param}}`,
      `\${params.${param}}`
    )
  }

  let methodBody = `    const path = \`${interpolatedPath}\`;\n`

  // Build query params object
  if (queryParams.length > 0) {
    const queryParamsObj = queryParams
      .map(p => `${p.name}: params.${p.name}`)
      .join(', ')
    if (hasRequiredParams) {
      methodBody += `    const queryParams = { ${queryParamsObj} };\n`
    } else {
      methodBody += `    const queryParams = params ? { ${queryParamsObj} } : undefined;\n`
    }
  }

  // Build body object
  if (requestBodySchema) {
    if (requestBodySchema.type === 'object' && requestBodySchema.properties) {
      const bodyProps = Object.keys(requestBodySchema.properties)
        .map(propName => `${propName}: params.${propName}`)
        .join(', ')
      methodBody += `    const body = { ${bodyProps} };\n`
    } else {
      methodBody += `    const body = params.body;\n`
    }
  }

  // Build return statement
  const responseTypeArg = responseType ? `Types.${responseType}` : 'undefined'
  const headerTypeArg = hasResponseHeaders
    ? `, Types.${transformedOperationId}ResponseHeaders`
    : ''
  const queryArg = queryParams.length > 0 ? 'queryParams' : 'undefined'
  const bodyArg = requestBodySchema ? 'body' : 'undefined'

  methodBody += `    return this.request<${responseTypeArg}${headerTypeArg}>('${method.toUpperCase()}', path, ${queryArg}, ${bodyArg});\n`
  methodBody += '  }\n\n'

  const code = jsdoc + '  ' + methodSignature + methodBody

  const description = methodObj.description || methodObj.summary || ''
  const apiExplorerUrl = `https://developers.eveonline.com/api-explorer#/operations/${operationId}`

  return {
    code,
    methodInfo: { name: methodName, description, apiExplorerUrl },
  }
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
    let headerSchema: Schema | undefined
    let description: string | undefined

    if (headerRef.$ref) {
      const refName = headerRef.$ref.replace('#/components/headers/', '')
      const headerDef = schema.components?.headers?.[refName]
      if (!headerDef) {
        throw new Error(`Could not resolve header reference: ${headerRef.$ref}`)
      }
      headerSchema = headerDef.schema
      description = headerDef.description
    } else {
      headerSchema = headerRef.schema
      description = headerRef.description
    }

    return {
      name: headerName,
      type: getTypeScriptType(headerSchema || { type: 'string' }),
      description,
    }
  })
}

function getResponseType(
  responses: Record<string, Response> | undefined,
  transformedOperationId: string
): string | undefined {
  const successResponse = getSuccessResponse(responses)
  if (successResponse?.content?.['application/json']?.schema) {
    return `${transformedOperationId}Response`
  }
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
