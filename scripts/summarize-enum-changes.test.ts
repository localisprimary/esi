import { describe, expect, it } from 'vitest'
import {
  diffEnums,
  extractEnums,
  formatEnumChanges,
} from './summarize-enum-changes.ts'

const OLD_TYPES = `export type AcceptLanguage = 'en' | 'de'

export type GetWalletResponse = {
  ref_type:
    | 'bounty'
    | 'brokers_fee'
  location?: {
    location_type?: 'station' | 'structure'
  }
  roles?: (
    | 'Director'
    | 'Trader'
  )[]
}[]

export interface PutEventParams {
  response: 'accepted' | 'declined'
}
`

const NEW_TYPES = `export type AcceptLanguage = 'en' | 'de' | 'fr'

export type GetWalletResponse = {
  ref_type:
    | 'bounty'
    | 'brokers_fee'
    | 'campaign_reward'
  location?: {
    location_type?: 'station'
  }
  roles?: (
    | 'Director'
    | 'Trader'
  )[]
  status: 'open' | 'closed'
}[]

export interface PutEventParams {
  response: 'accepted' | 'declined'
}
`

describe('extractEnums', () => {
  it('collects inline, multi-line, nested, and array unions by path', () => {
    const enums = extractEnums(OLD_TYPES)

    expect([...(enums.get('AcceptLanguage') ?? [])]).toEqual(['en', 'de'])
    expect([...(enums.get('GetWalletResponse.ref_type') ?? [])]).toEqual([
      'bounty',
      'brokers_fee',
    ])
    expect([
      ...(enums.get('GetWalletResponse.location.location_type') ?? []),
    ]).toEqual(['station', 'structure'])
    expect([...(enums.get('GetWalletResponse.roles') ?? [])]).toEqual([
      'Director',
      'Trader',
    ])
    expect([...(enums.get('PutEventParams.response') ?? [])]).toEqual([
      'accepted',
      'declined',
    ])
  })
})

describe('diffEnums', () => {
  it('reports added and removed values for existing unions only', () => {
    expect(diffEnums(OLD_TYPES, NEW_TYPES)).toEqual([
      { path: 'AcceptLanguage', added: ['fr'], removed: [] },
      {
        path: 'GetWalletResponse.location.location_type',
        added: [],
        removed: ['structure'],
      },
      {
        path: 'GetWalletResponse.ref_type',
        added: ['campaign_reward'],
        removed: [],
      },
    ])
  })

  it('reports nothing when unions are unchanged', () => {
    expect(diffEnums(OLD_TYPES, OLD_TYPES)).toEqual([])
  })
})

describe('formatEnumChanges', () => {
  it('renders a Markdown section for the PR body', () => {
    expect(
      formatEnumChanges([{ path: 'A.b', added: ['x'], removed: ['y'] }])
    ).toBe(
      [
        '### Enum value changes (1)',
        '',
        '- `A.b`',
        "  - Added `'x'`",
        "  - Removed `'y'`",
        '',
      ].join('\n')
    )
    expect(formatEnumChanges([])).toBe('### Enum value changes (0)\n\n_None_\n')
  })
})
