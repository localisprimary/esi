import { execFile } from 'child_process'
import { mkdir, mkdtemp, readdir, rm } from 'fs/promises'
import { tmpdir } from 'os'
import path from 'path'
import { promisify } from 'util'
import { afterEach, describe, expect, it } from 'vitest'
import { EsiClient } from '../client.js'
import type { PostCharactersAffiliationResponse } from '../types.js'

const execFileAsync = promisify(execFile)
const originalFetch = globalThis.fetch

interface CapturedRequest {
  init?: RequestInit
  url: string
}

function captureSuccessfulFetch(
  responseBody = '{}',
  responseInit: ResponseInit = { status: 200 }
): CapturedRequest[] {
  const requests: CapturedRequest[] = []

  globalThis.fetch = async (input, init) => {
    requests.push({ url: String(input), init })
    return new Response(responseBody, responseInit)
  }

  return requests
}

afterEach(() => {
  globalThis.fetch = originalFetch
})

describe('EsiClient request construction', () => {
  it('serializes array query values as repeated parameters', async () => {
    const requests = captureSuccessfulFetch()
    const client = new EsiClient({ userAgent: 'unit-test' })

    await client.getCharacterSearch({
      character_id: 1,
      categories: ['agent', 'alliance'],
      search: 'needle',
      strict: false,
    })
    await client.getRouteOriginDestination({
      origin: 1,
      destination: 2,
      avoid: [3, 4],
      connections: [
        [5, 6],
        [7, 8],
      ],
    })

    const searchUrl = new URL(requests[0].url)
    expect(searchUrl.searchParams.getAll('categories')).toEqual([
      'agent',
      'alliance',
    ])
    expect(searchUrl.searchParams.get('strict')).toBe('false')

    const routeUrl = new URL(requests[1].url)
    expect(routeUrl.searchParams.getAll('avoid')).toEqual(['3', '4'])
    expect(routeUrl.searchParams.getAll('connections')).toEqual(['5,6', '7,8'])
  })

  it('sends the default headers, bearer token, and JSON request body', async () => {
    const requests = captureSuccessfulFetch()
    const client = new EsiClient({
      userAgent: 'unit-test',
      token: 'secret-token',
    })

    await client.postCharacterMail({
      character_id: 1,
      body: 'Hello',
      recipients: [{ recipient_id: 2, recipient_type: 'character' }],
      subject: 'Test mail',
    })

    const request = requests[0]
    const headers = new Headers(request.init?.headers)
    expect(request.url).toBe('https://esi.evetech.net/characters/1/mail')
    expect(request.init?.method).toBe('POST')
    expect(headers.get('authorization')).toBe('Bearer secret-token')
    expect(headers.get('content-type')).toBe('application/json')
    expect(headers.get('x-user-agent')).toBe('localisprimary/esi unit-test')
    expect(headers.get('x-compatibility-date')).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(JSON.parse(String(request.init?.body))).toEqual({
      body: 'Hello',
      recipients: [{ recipient_id: 2, recipient_type: 'character' }],
      subject: 'Test mail',
    })
  })

  it('uses query authentication without sending request headers', async () => {
    const requests = captureSuccessfulFetch()
    const client = new EsiClient({
      userAgent: 'unit-test',
      token: 'secret-token',
      useRequestHeaders: false,
    })

    await client.getCharacter({ character_id: 1 })

    const request = requests[0]
    const url = new URL(request.url)
    expect(request.init?.headers).toBeUndefined()
    expect(url.searchParams.get('user_agent')).toBe(
      'localisprimary/esi unit-test'
    )
    expect(url.searchParams.get('token')).toBe('secret-token')
    expect(url.searchParams.get('compatibility_date')).toMatch(
      /^\d{4}-\d{2}-\d{2}$/
    )
  })
})

describe('EsiClient responses', () => {
  it('preserves structured API errors', async () => {
    globalThis.fetch = async () =>
      new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
      })

    const client = new EsiClient({ userAgent: 'unit-test' })

    await expect(client.getAlliances()).rejects.toEqual({
      error: 'Invalid request',
      status: 400,
    })
  })

  it('uses a stable fallback for non-JSON API errors', async () => {
    globalThis.fetch = async () => new Response('Bad gateway', { status: 502 })

    const client = new EsiClient({ userAgent: 'unit-test' })

    await expect(client.getAlliances()).rejects.toEqual({
      error: 'Request failed',
      status: 502,
    })
  })
})

describe('generated types', () => {
  it('allows optional affiliation fields to be omitted', () => {
    const response: PostCharactersAffiliationResponse = [
      {
        character_id: 1,
        corporation_id: 2,
      },
    ]

    expect(response).toHaveLength(1)
  })
})

describe('published package', () => {
  it('can be packed and imported by Node as ESM after a build', async () => {
    const tempDirectory = await mkdtemp(path.join(tmpdir(), 'esi-package-'))

    try {
      await execFileAsync(
        'pnpm',
        ['pack', '--pack-destination', tempDirectory],
        { cwd: process.cwd() }
      )

      const [tarball] = await readdir(tempDirectory)
      const unpackedDirectory = path.join(tempDirectory, 'unpacked')
      await mkdir(unpackedDirectory)
      await execFileAsync('tar', [
        '-xzf',
        path.join(tempDirectory, tarball),
        '-C',
        unpackedDirectory,
      ])

      await expect(
        execFileAsync(
          process.execPath,
          ['--input-type=module', '--eval', "await import('./dist/index.js')"],
          { cwd: path.join(unpackedDirectory, 'package') }
        )
      ).resolves.toMatchObject({ stderr: '' })
    } finally {
      await rm(tempDirectory, { recursive: true })
    }
  })
})
