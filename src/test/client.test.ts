import { afterEach, describe, expect, it } from 'vitest'
import { EsiClient } from '../../dist'

const TEST_IDS = {
  character: 91884358, // Tujiko Noriko
  corporation: 98224639, // Dirt n Glitter
  alliance: 99005678, // Local Is Primary
  solarSystem: 30002693, // Egghelende
  region: 10000002, // The Forge
  item: 34, // Tritanium
}

describe('EsiClient - Live API Tests', () => {
  const client = new EsiClient({ userAgent: 'testClient' })

  describe('Alliance Endpoints', () => {
    it('should get all alliances', async () => {
      const response = await client.getAlliances()

      expect(response.status).toBe(200)
    })

    it('should get specific alliance info', async () => {
      const response = await client.getAlliance({
        alliance_id: TEST_IDS.alliance,
      })

      expect(response.status).toBe(200)
    })

    it('should get alliance corporations', async () => {
      const response = await client.getAllianceCorporations({
        alliance_id: TEST_IDS.alliance,
      })

      expect(response.status).toBe(200)
    })
  })

  describe('Character Endpoints', () => {
    it('should get character public info', async () => {
      const response = await client.getCharacter({
        character_id: TEST_IDS.character,
      })

      expect(response.status).toBe(200)
    })

    it('should get character corporation history', async () => {
      const response = await client.getCharacterCorporationhistory({
        character_id: TEST_IDS.character,
      })

      expect(response.status).toBe(200)
    })

    it('should get character portrait', async () => {
      const response = await client.getCharacterPortrait({
        character_id: TEST_IDS.character,
      })

      expect(response.status).toBe(200)
    })
  })

  describe('Corporation Endpoints', () => {
    it('should get corporation info', async () => {
      const response = await client.getCorporation({
        corporation_id: TEST_IDS.corporation,
      })

      expect(response.status).toBe(200)
    })

    it('should get corporation alliance history', async () => {
      const response = await client.getCorporationAlliancehistory({
        corporation_id: TEST_IDS.corporation,
      })

      expect(response.status).toBe(200)
    })
  })

  describe('Paginated Endpoints', () => {
    it('should get paginated market orders and return pagination headers', async () => {
      const page1 = await client.getRegionOrders({
        order_type: 'all',
        region_id: TEST_IDS.region,
        page: 1,
        type_id: TEST_IDS.item,
      })

      expect(page1.status).toBe(200)
      expect(page1.headers).toHaveProperty('x-pages')
    })
  })

  describe('Solar System Endpoints', () => {
    it('should get all solar systems', async () => {
      const response = await client.getUniverseSystems()

      expect(response.status).toBe(200)
    })

    it('should get specific solar system info', async () => {
      const response = await client.getUniverseSystem({
        system_id: TEST_IDS.solarSystem,
      })

      expect(response.status).toBe(200)
    })

    it('should get system jumps data', async () => {
      const response = await client.getUniverseSystemJumps()

      expect(response.status).toBe(200)
    })

    it('should get system kills data', async () => {
      const response = await client.getUniverseSystemKills()

      expect(response.status).toBe(200)
    })
  })

  describe('General API Functionality', () => {
    it('should handle non-existent character requests', async () => {
      await expect(
        client.getCharacter({ character_id: 1 })
      ).rejects.toMatchObject({
        status: 422,
      })
    })

    it('should handle non-existent corporation requests', async () => {
      await expect(
        client.getCorporation({ corporation_id: 1 })
      ).rejects.toMatchObject({
        status: 422,
      })
    })

    it('should include proper headers in responses', async () => {
      const response = await client.getAlliances()

      expect(response).toHaveProperty('headers')
    })
  })
})

describe('EsiClient - No Request Headers', () => {
  it('should use query parameters when useRequestHeaders is false', async () => {
    const client = new EsiClient({
      useRequestHeaders: false,
      userAgent: 'testClient',
    })
    const response = await client.getCharacter({
      character_id: TEST_IDS.character,
    })

    expect(response.status).toBe(200)
  })
})

describe('EsiClient - Missing user agent', () => {
  it('should throw when userAgent is not provided', () => {
    // @ts-expect-error Testing missing userAgent
    expect(() => new EsiClient({})).toThrow()
  })
})

describe('EsiClient - Empty response bodies', () => {
  const originalFetch = globalThis.fetch

  afterEach(() => {
    globalThis.fetch = originalFetch
  })

  it('should return undefined data for successful empty responses', async () => {
    globalThis.fetch = async () =>
      new Response(null, {
        status: 204,
        headers: {
          'cache-control': 'no-cache',
        },
      })

    const client = new EsiClient({ userAgent: 'testClient' })
    const response = await client.deleteFleetWing({
      fleet_id: 1,
      wing_id: 2,
    })

    expect(response.status).toBe(204)
    expect(response.data).toBeUndefined()
    expect(response.headers['cache-control']).toBe('no-cache')
  })
})

describe('EsiClient - Request caching', () => {
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
          headers: { 'cache-control': 'no-cache, max-age=60', etag: '"v1"' },
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
