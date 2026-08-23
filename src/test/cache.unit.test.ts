import { afterEach, describe, expect, it } from 'vitest'
import { EsiClient } from '../client.js'

describe('EsiClient request caching', () => {
  const originalFetch = globalThis.fetch

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('shares fresh GET responses across client instances', async () => {
    let calls = 0
    globalThis.fetch = async () => {
      calls += 1
      return new Response(JSON.stringify({ name: 'Cached' }), {
        headers: { 'cache-control': 'max-age=60', etag: '"cached"' },
      })
    }

    const first = new EsiClient({ userAgent: 'cache-first' })
    const second = new EsiClient({ userAgent: 'cache-second' })
    const params = { character_id: 987654321 }

    await first.getCharacter(params)
    const response = await second.getCharacter(params)

    expect(calls).toBe(1)
    expect(response.data.name).toBe('Cached')
  })

  it('coalesces simultaneous identical cache misses', async () => {
    let calls = 0
    let resolveResponse: (() => void) | undefined
    const responseReady = new Promise<void>(resolve => {
      resolveResponse = resolve
    })
    globalThis.fetch = async () => {
      calls += 1
      await responseReady
      return new Response(JSON.stringify({ name: 'Coalesced' }), {
        headers: { 'cache-control': 'max-age=60' },
      })
    }

    const client = new EsiClient({ userAgent: 'coalesce' })
    const params = { character_id: 987654326 }
    const first = client.getCharacter(params)
    const second = client.getCharacter(params)
    await new Promise<void>(resolve => {
      const waitForRequest = () => {
        if (calls === 1) resolve()
        else setTimeout(waitForRequest, 0)
      }
      waitForRequest()
    })
    expect(calls).toBe(1)

    resolveResponse?.()
    await expect(Promise.all([first, second])).resolves.toHaveLength(2)
  })

  it('evicts the least-recently-used entry after 1,000 entries', async () => {
    let calls = 0
    globalThis.fetch = async () => {
      calls += 1
      return new Response(JSON.stringify({ name: 'LRU' }), {
        headers: { 'cache-control': 'max-age=60' },
      })
    }

    const client = new EsiClient({ userAgent: 'lru' })
    const firstId = 987655000
    for (let offset = 0; offset <= 1000; offset += 1) {
      await client.getCharacter({ character_id: firstId + offset })
    }
    await client.getCharacter({ character_id: firstId })

    expect(calls).toBe(1002)
  })

  it('honors s-maxage over max-age', async () => {
    let calls = 0
    globalThis.fetch = async () => {
      calls += 1
      return new Response(JSON.stringify({ name: 'Shared cache' }), {
        headers: { 'cache-control': 'max-age=0, s-maxage=60' },
      })
    }

    const client = new EsiClient({ userAgent: 's-maxage' })
    const params = { character_id: 987654322 }
    await client.getCharacter(params)
    await client.getCharacter(params)

    expect(calls).toBe(1)
  })

  it('revalidates no-cache responses with an ETag', async () => {
    let calls = 0
    globalThis.fetch = async (_input, init) => {
      calls += 1
      if (calls === 2) {
        expect(new Headers(init?.headers).get('if-none-match')).toBe('"v1"')
        return new Response(null, {
          status: 304,
          headers: {
            'cache-control': 'no-cache, max-age=60',
            etag: '"v1"',
          },
        })
      }
      return new Response(JSON.stringify({ name: 'Revalidated' }), {
        headers: { 'cache-control': 'no-cache, max-age=60', etag: '"v1"' },
      })
    }

    const client = new EsiClient({ userAgent: 'revalidate' })
    const params = { character_id: 987654323 }
    await client.getCharacter(params)
    const response = await client.getCharacter(params)

    expect(calls).toBe(2)
    expect(response.status).toBe(200)
    expect(response.data.name).toBe('Revalidated')
  })

  it('does not retain no-store responses or cache-disabled requests', async () => {
    let calls = 0
    globalThis.fetch = async () => {
      calls += 1
      return new Response(JSON.stringify({ name: 'Uncached' }), {
        headers: { 'cache-control': 'no-store, max-age=60' },
      })
    }

    const noStoreClient = new EsiClient({ userAgent: 'no-store' })
    const noStoreParams = { character_id: 987654324 }
    await noStoreClient.getCharacter(noStoreParams)
    await noStoreClient.getCharacter(noStoreParams)

    const disabledClient = new EsiClient({
      userAgent: 'cache-disabled',
      cache: false,
    })
    const disabledParams = { character_id: 987654325 }
    await disabledClient.getCharacter(disabledParams)
    await disabledClient.getCharacter(disabledParams)

    expect(calls).toBe(4)
  })
})
