import { describe, it, expect } from 'vitest'
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
        status: 404,
      })
    })

    it('should handle non-existent corporation requests', async () => {
      await expect(
        client.getCorporation({ corporation_id: 1 })
      ).rejects.toMatchObject({
        status: 404,
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
