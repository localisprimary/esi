import type { EsiResponse } from './types'

type CacheHeaders = Record<string, string>

interface CacheEntry {
  response: EsiResponse<unknown, CacheHeaders>
  etag?: string
  expiresAt: number
  revalidateEveryTime: boolean
}

function getDirective(cacheControl: string, name: string): string | undefined {
  for (const directive of cacheControl.split(',')) {
    const [key, value] = directive.trim().split('=', 2)
    if (key.toLowerCase() === name) {
      return value?.replace(/^"|"$/g, '') ?? ''
    }
  }
}

function getMaxAge(cacheControl: string): number | undefined {
  const value =
    getDirective(cacheControl, 's-maxage') ??
    getDirective(cacheControl, 'max-age')
  if (!value || !/^\d+$/.test(value)) return undefined
  return Number(value)
}

function getResponseExpiry(
  headers: CacheHeaders,
  now: number
): number | undefined {
  const cacheControl = headers['cache-control']
  if (!cacheControl || getDirective(cacheControl, 'no-store') !== undefined) {
    return undefined
  }

  const maxAge = getMaxAge(cacheControl)
  if (maxAge === undefined) return undefined

  const age = Number(headers.age ?? 0)
  const currentAge = Number.isFinite(age) && age > 0 ? age : 0
  return now + Math.max(0, maxAge - currentAge) * 1000
}

export function createCacheEntry(
  response: EsiResponse<unknown, CacheHeaders>,
  now = Date.now()
): CacheEntry | undefined {
  const expiresAt = getResponseExpiry(response.headers, now)
  if (expiresAt === undefined) return undefined

  return {
    response,
    etag: response.headers.etag,
    expiresAt,
    revalidateEveryTime:
      getDirective(response.headers['cache-control'], 'no-cache') !== undefined,
  }
}

export function isFresh(entry: CacheEntry, now = Date.now()): boolean {
  return !entry.revalidateEveryTime && entry.expiresAt > now
}

export function refreshCacheEntry(
  entry: CacheEntry,
  headers: CacheHeaders,
  now = Date.now()
): CacheEntry | undefined {
  return createCacheEntry(
    {
      ...entry.response,
      headers: { ...entry.response.headers, ...headers },
    },
    now
  )
}

export async function createCacheKey(
  url: string,
  compatibilityDate: string,
  token?: string
): Promise<string> {
  const input = `${url}\n${compatibilityDate}\n${token ?? ''}`
  const bytes = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest), byte =>
    byte.toString(16).padStart(2, '0')
  ).join('')
}

class EsiMemoryCache {
  private readonly entries = new Map<string, CacheEntry>()
  private readonly inFlight = new Map<
    string,
    Promise<EsiResponse<unknown, CacheHeaders>>
  >()

  get(key: string): CacheEntry | undefined {
    const entry = this.entries.get(key)
    if (!entry) return undefined

    this.entries.delete(key)
    this.entries.set(key, entry)
    return entry
  }

  set(key: string, entry: CacheEntry): void {
    this.entries.delete(key)
    this.entries.set(key, entry)

    if (this.entries.size > 1000) {
      const oldestKey = this.entries.keys().next().value
      if (oldestKey) this.entries.delete(oldestKey)
    }
  }

  delete(key: string): void {
    this.entries.delete(key)
  }

  getOrCreate(
    key: string,
    create: () => Promise<EsiResponse<unknown, CacheHeaders>>
  ): Promise<EsiResponse<unknown, CacheHeaders>> {
    const inFlight = this.inFlight.get(key)
    if (inFlight) return inFlight

    const request = create().finally(() => this.inFlight.delete(key))
    this.inFlight.set(key, request)
    return request
  }
}

// Shared per JavaScript runtime: browser tab, Node process, or warm serverless instance.
export const esiMemoryCache = new EsiMemoryCache()
