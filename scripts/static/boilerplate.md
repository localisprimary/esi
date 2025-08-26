# @localisprimary/esi

A slightly opinionated TypeScript client for the [EVE Online API](https://developers.eveonline.com/api-explorer).


[![NPM Version](https://img.shields.io/npm/v/%40localisprimary%2Fesi)](https://www.npmjs.com/package/@localisprimary/esi)
[![NPM Downloads](https://img.shields.io/npm/dm/%40localisprimary%2Fesi?link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40localisprimary%2Fesi)](https://www.npmjs.com/package/@localisprimary/esi)
[![Discord](https://img.shields.io/discord/928842307879444552?label=discord&color=%237289da&link=https%3A%2F%2Fdiscord.gg%2FCbcBHGMpUa)](https://discord.gg/CbcBHGMpUa)


## Usage

```typescript
import { EsiClient } from '@localisprimary/esi'

// Create client (optionally with auth token)
const esi = new EsiClient({ userAgent: 'foo@example.com', token: 'bearer-token' })

// Get all alliances
const alliances = await esi.getAlliances()
console.log(alliances.data)

// Get specific alliance by ID
const alliance = await esi.getAlliance({ alliance_id: 123 })
console.log(alliance.data)
```

## Options

The `EsiClient` constructor accepts an options object with the following properties:
| Parameter | Description | Type | Default | Required |
|-----------|-------------|------|---------|----------|
| `token` | Optional auth token for requests | `string` | `undefined` | No |
| `userAgent` | User agent string for requests. Resolves to `"localisprimary/esi <userAgent>"` | `string` | `undefined` | No* |
| `useRequestHeaders` | When false, fall back to query parameters for user agent and token | `boolean` | `true` | No |

<small>* Will be required in a future version.</small>

## Methods

This client provides methods for all EVE ESI endpoints. Methods return a `Promise` that resolves to an `EsiResponse<T>` or throws an `EsiError`.

```typescript
interface EsiResponse<TData, THeaders = Record<string, string>> {
  data: TData;
  status: number;
  headers: THeaders;
}

interface EsiError {
  error: string;
  status: number;
}
```

All methods are fully typed: `getAlliance` will take `GetAllianceParams` and return `GetAllianceResponse`.

`Params` types make no distinction between path, query, or body parameters, it's all the same object:
```typescript
const esi = new EsiClient({ userAgent: 'foo@example.com', token: 'bearer-token' })

// POST https://esi.evetech.net/characters/{character_id}/mail
esi.postCharacterMail({
  // character_id path parameter
  character_id: 91884358,

  // request body
  approved_cost: 0,
  body: "Hello from the ESI!",
  recipients: [{ recipient_type: 'character', recipient_id: 96135698 }]
})
```

{methodsTable}


[![BuyMeACoffee](https://raw.githubusercontent.com/pachadotdev/buymeacoffee-badges/main/bmc-green.svg)](https://buymeacoffee.com/nfinished)
