# @localisprimary/esi

A slightly opinionated TypeScript client for the [EVE Online API](https://developers.eveonline.com/api-explorer).


[![NPM Version](https://img.shields.io/npm/v/%40localisprimary%2Fesi)](https://www.npmjs.com/package/@localisprimary/esi)


## Usage

```typescript
import { EsiClient } from '@localisprimary/esi'

// Create client (optionally with auth token)
const esi = new EsiClient({ token: 'bearer-token' })

// Get all alliances
const alliances = await esi.getAlliances()
console.log(alliances.data)

// Get specific alliance by ID
const alliance = await esi.getAlliance({ alliance_id: 123 })
console.log(alliance.data)
```

## Methods

This client provides methods for all EVE ESI endpoints. Methods return a Promise that resolves to an `EsiResponse<T>` object or throws an `EsiError`.

```typescript
interface EsiResponse<T> {
  data: T;
  status: number;
  headers: Partial<Record<string, string>>;
}

interface EsiError {
  error: string;
  status: number;
}
```

All methods are fully typed: `getAlliance` will take `GetAllianceParams` and return `GetAllianceResponse`.

`Params` types make no distinction between path, query, or body parameters, it's all the same object:
```typescript
const esi = new EsiClient({ token: 'bearer-token' })

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
