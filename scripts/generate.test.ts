import { afterEach, describe, expect, it } from 'vitest'
import {
  assertUniqueOperationNames,
  generateClient,
  generateTypes,
  getSuccessResponse,
  getTypeScriptType,
  loadSchema,
  transformOperationId,
  type OpenAPISchema,
  type Schema,
} from './generate.ts'

const originalFetch = globalThis.fetch

afterEach(() => {
  globalThis.fetch = originalFetch
})

describe('loadSchema', () => {
  it('requests a compatibility date and returns the date ESI resolved', async () => {
    let requestedDate: string | null = null
    globalThis.fetch = async (_input, init) => {
      requestedDate = new Headers(init?.headers).get('x-compatibility-date')
      return new Response('{"paths":{}}', {
        headers: { 'x-compatibility-date': '2026-11-19' },
      })
    }

    const loaded = await loadSchema('2026-11-21')

    expect(requestedDate).toBe('2026-11-21')
    expect(loaded.compatibilityDate).toBe('2026-11-19')
    expect(loaded.schema).toEqual({ paths: {} })
  })

  it('rejects a schema response without a compatibility date', async () => {
    globalThis.fetch = async () => new Response('{"paths":{}}')

    await expect(loadSchema('2026-11-21')).rejects.toThrow(
      /X-Compatibility-Date/
    )
  })
})

describe('generateClient', () => {
  it('stamps the compatibility date of the schema it was generated from', () => {
    const { client } = generateClient({ paths: {} }, '2026-11-19')

    expect(client).toContain("const COMPATIBILITY_DATE = '2026-11-19';")
  })
})

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

  it('maps oneOf variants and nullable type arrays to unions', () => {
    const schema: Schema = {
      oneOf: [
        {
          type: 'object',
          properties: { isk: { type: 'number' } },
          required: ['isk'],
        },
        {
          type: 'object',
          properties: { transit: { type: ['boolean', 'null'] } },
        },
      ],
    }

    expect(getTypeScriptType(schema)).toBe(
      '{ isk: number } | { transit?: boolean | null }'
    )
  })
})

describe('generateTypes', () => {
  it('flattens referenced request bodies and emits their referenced types', () => {
    const schema: OpenAPISchema = {
      components: {
        schemas: {
          SolarSystemID: { type: 'integer' },
          RouteConnection: {
            type: 'object',
            properties: {
              from: { $ref: '#/components/schemas/SolarSystemID' },
            },
            required: ['from'],
          },
          RouteRequestBody: {
            type: 'object',
            properties: {
              connections: {
                type: 'array',
                items: { $ref: '#/components/schemas/RouteConnection' },
              },
            },
          },
        },
      },
      paths: {
        '/route/{origin_system_id}': {
          post: {
            operationId: 'PostRoute',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/RouteRequestBody' },
                },
              },
            },
          },
        },
      },
    }

    const output = generateTypes(schema)

    expect(output).toContain('export type SolarSystemID = number;')
    expect(output).toContain('export interface RouteConnection')
    expect(output).toContain('connections?: (RouteConnection)[];')
    expect(output).not.toContain('body: RouteRequestBody')
  })

  it('emits a record type for objects without properties', () => {
    const schema: OpenAPISchema = {
      components: {
        schemas: { Manual: { type: 'object' } },
      },
      paths: {
        '/manual': {
          get: {
            operationId: 'GetManual',
            responses: {
              '200': {
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        manual: { $ref: '#/components/schemas/Manual' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    }

    expect(generateTypes(schema)).toContain(
      'export type Manual = Record<string, unknown>;'
    )
  })
})

describe('assertUniqueOperationNames', () => {
  it('rejects operations that transform to the same method name', () => {
    const schema: OpenAPISchema = {
      paths: {
        '/freelance-jobs': { get: { operationId: 'GetFreelanceJobsListing' } },
        '/freelance-jobs-legacy': { get: { operationId: 'GetFreelanceJobs' } },
      },
    }

    expect(() => assertUniqueOperationNames(schema)).toThrow(
      /both map to GetFreelanceJobs/
    )
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

  it.each([
    ['GetCharactersDetail', '/characters/{character_id}', 'GetCharacter'],
    [
      'GetCharactersAccessListsListing',
      '/characters/{character_id}/access-lists',
      'GetCharacterAccessLists',
    ],
    [
      'GetCorporationsProjectsDetail',
      '/corporations/{corporation_id}/projects/{project_id}',
      'GetCorporationProject',
    ],
    ['GetFreelanceJobsDetail', '/freelance-jobs/{job_id}', 'GetFreelanceJob'],
    [
      'PostCharactersAffiliation',
      '/characters/affiliation',
      'PostCharactersAffiliation',
    ],
    [
      'GetCorporationCorporationIdMiningExtractions',
      '/corporation/{corporation_id}/mining/extractions',
      'GetCorporationMiningExtractions',
    ],
    [
      'GetCorporationsProjectsContributors',
      '/corporations/{corporation_id}/projects/{project_id}/contributors',
      'GetCorporationProjectContributors',
    ],
    [
      'GetMilitaryCampaignsObjectivesListing',
      '/military-campaigns/{campaign_id}/objectives',
      'GetMilitaryCampaignObjectives',
    ],
    [
      'GetCharactersCharacterIdContractsContractIdBids',
      '/characters/{character_id}/contracts/{contract_id}/bids',
      'GetCharacterContractBids',
    ],
    [
      'GetParagonHubSkinrAlliances',
      '/paragon-hub/skinr/alliances/{alliance_id}',
      'GetParagonHubSkinrAlliances',
    ],
    [
      'GetCharactersCharacterIdMailMailId',
      '/characters/{character_id}/mail/{mail_id}',
      'GetCharacterMailMessage',
    ],
    [
      'GetKillmailsKillmailIdKillmailHash',
      '/killmails/{killmail_id}/{killmail_hash}',
      'GetKillmail',
    ],
  ])('transforms %s at %s to %s', (operationId, pathTemplate, expected) => {
    expect(transformOperationId(operationId, pathTemplate)).toBe(expected)
  })
})
