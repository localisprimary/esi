import { describe, expect, it } from 'vitest'
import {
  generateTypes,
  getSuccessResponse,
  getTypeScriptType,
  transformOperationId,
  type OpenAPISchema,
  type Schema,
} from './generate.ts'

describe('getTypeScriptType', () => {
  it('preserves optional properties on inline objects', () => {
    const schema: Schema = {
      type: 'object',
      properties: {
        required_value: { type: 'string' },
        optional_value: { type: 'integer' },
      },
      required: ['required_value'],
    }

    expect(getTypeScriptType(schema)).toBe(
      '{ required_value: string; optional_value?: number }'
    )
  })

  it('preserves typed additional properties and their references', () => {
    const schema: OpenAPISchema = {
      components: {
        schemas: {
          Changelog: {
            type: 'object',
            properties: {
              entries: {
                type: 'object',
                additionalProperties: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/ChangelogEntry' },
                },
              },
            },
            required: ['entries'],
          },
          ChangelogEntry: {
            type: 'object',
            properties: {
              description: { type: 'string' },
            },
            required: ['description'],
          },
        },
      },
      paths: {
        '/meta/changelog': {
          get: {
            operationId: 'GetMetaChangelog',
            responses: {
              '200': {
                content: {
                  'application/json': {
                    schema: { $ref: '#/components/schemas/Changelog' },
                  },
                },
              },
            },
          },
        },
      },
    }

    const output = generateTypes(schema)

    expect(output).toContain('export interface ChangelogEntry')
    expect(output).toContain('entries: Record<string, (ChangelogEntry)[]>;')
  })
})

describe('getSuccessResponse', () => {
  it('selects an explicit 2xx response even when an error appears first', () => {
    const accepted = {
      content: {
        'application/json': {
          schema: { type: 'object' as const },
        },
      },
    }

    expect(
      getSuccessResponse({
        default: {},
        '2XX': accepted,
      })
    ).toBe(accepted)
  })
})

describe('transformOperationId', () => {
  it.each([
    ['GetAlliancesAllianceId', 'GetAlliance'],
    ['GetCharactersCharacterIdContacts', 'GetCharacterContacts'],
    ['GetContractsPublicBidsContractId', 'GetContractsPublicBids'],
  ])('transforms %s to %s', (operationId, expected) => {
    expect(transformOperationId(operationId)).toBe(expected)
  })
})
