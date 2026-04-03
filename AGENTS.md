# AGENTS.md - AI Agent Reference Guide

This document provides comprehensive guidance for AI agents (and humans) working on the EVE ESI TypeScript client generator codebase.

## Project Overview

**Purpose**: Automatically generate a fully-typed TypeScript client for the EVE Online ESI API from OpenAPI schemas.

**Key Principles**:

- Zero runtime dependencies (uses native `fetch()`)
- 100% TypeScript with strict type checking
- Auto-generated from authoritative OpenAPI schema
- Developer-friendly API (simplified naming, flat parameters)

**What This Generates**:

- `src/types.ts` - TypeScript type definitions (~145KB, ~270 types)
- `src/client.ts` - EsiClient class with ~270 methods (~102KB)
- `README.md` - Updated method documentation table

## 🚨 Critical Rules

### Never Manually Edit Generated Files

**DO NOT** edit these files directly - they are auto-generated:

- `src/client.ts`
- `src/types.ts`
- `README.md` (method table section)

Instead, modify `scripts/generate.ts` and run `pnpm generate`.

### Never Add Runtime Dependencies

The client must remain zero-dependency. Use only:

- Native `fetch()` for HTTP requests
- Standard TypeScript/JavaScript features

Development dependencies (for generation/testing) are fine.

### Always Update AGENTS.md After Code Changes

**Before finishing any task that modifies `scripts/generate.ts` or project structure**, update this document:

- Changed line numbers? Update the "Useful Code Locations" section
- Added/removed/renamed functions? Update relevant sections
- Changed workflows or commands? Update the workflow documentation

This is not optional. Outdated documentation causes repeated mistakes.

## 📝 AGENTS.md Update Reference

### What Triggers an Update

| Change Type                     | Sections to Update                                             |
| ------------------------------- | -------------------------------------------------------------- |
| Refactor `scripts/generate.ts`  | "Useful Code Locations", any section referencing line numbers  |
| Add/remove/rename functions     | "Useful Code Locations", "Schema Handling", "Helper Functions" |
| Change project structure        | "Repository Structure"                                         |
| Modify CI/CD workflows          | "CI/CD Automation"                                             |
| Add package.json scripts        | "Local Development Commands"                                   |
| Change TypeScript/oxlint config | "Code Style Guide"                                             |

### How to Update

1. **Be specific**: Include file paths, line numbers, and concrete examples
2. **Be accurate**: Verify line numbers match actual code before committing
3. **Be concise**: Keep the document scannable

## Repository Structure

```
/
├── src/                          # Generated client code (DO NOT EDIT MANUALLY)
│   ├── client.ts                 # Generated EsiClient class
│   ├── types.ts                  # Generated TypeScript types
│   ├── index.ts                  # Main export (can be edited)
│   └── test/                     # Vitest integration tests
│       └── client.test.ts
│
├── scripts/                      # Code generation (EDIT THESE)
│   ├── generate.ts              # Main generator (824 lines) - CORE LOGIC
│   ├── generate-readme.ts       # Generates README method table
│   └── static/
│       └── boilerplate.md       # README template
│
├── dist/                         # Compiled output (gitignored)
├── change/                       # Beachball changefiles for versioning
├── .github/workflows/            # CI/CD automation
│   ├── update-esi-schema.yml    # Daily cron to fetch schema updates
│   ├── publish.yml              # Manual npm publish workflow
│   ├── test.yml                 # PR validation (lint, build, test)
│   └── check-changefile.yml     # Changefile check (skipped for dependabot)
│
├── package.json                  # Project config (ES module, Node ^24.13.0)
├── tsconfig.json                 # TypeScript config (strict mode, ES2020)
├── tsconfig.test.json            # Type-checks src/test against generated dist/
└── README.md                     # User-facing documentation
```

## Code Generation Architecture

### Pipeline Flow

```
1. GENERATE CODE
   $ pnpm generate
   ├─ loadSchema() - Fetch OpenAPI JSON from https://esi.evetech.net/meta/openapi.json (scripts/generate.ts:109)
   ├─ generateTypes() - Create TypeScript types (scripts/generate.ts:120)
   │  ├─ Extract components/parameters
   │  ├─ For each path + method:
   │  │  ├─ Transform operation ID (simplify name)
   │  │  ├─ Generate response types (*Response)
   │  │  ├─ Generate parameter types (*Params)
   │  │  └─ Generate response header types (*ResponseHeaders)
   │  └─ Handle schema references (dependency-first)
   │
   ├─ generateClient() - Create EsiClient class (scripts/generate.ts:487)
   │  ├─ EsiClient constructor with options
   │  ├─ Private request() helper method
   │  └─ For each endpoint:
   │     ├─ Transform operation ID to method name
   │     ├─ Generate JSDoc with description + API explorer link
   │     ├─ Flatten path/query/body params into single interface
   │     ├─ Build method body (path replacement, param extraction)
   │     └─ Type return value as EsiResponse<TData, THeaders>
   │
   └─ generateReadme() - Update README method table (scripts/generate-readme.ts)
      ├─ Read boilerplate.md template
      ├─ Build markdown table of methods
      └─ Replace {methodsTable} placeholder

2. BUILD
   $ pnpm build
   ├─ Type-check scripts/ with scripts/tsconfig.json
   ├─ Compile src/ TypeScript to JavaScript in dist/
   └─ Type-check src/test against generated dist/ with tsconfig.test.json

3. TEST
   $ pnpm test
   └─ Run Vitest tests against live EVE ESI API
```

### Operation ID Transformations

The generator simplifies verbose OpenAPI operation IDs for better developer experience.

**Location**: `scripts/generate.ts:782` - `transformOperationId()`

**Transformations Applied**:

```typescript
// 1. Remove trailing ContractId
"GetContractsPublicBidsContractId" → "GetContractsPublicBids"
"GetContractsPublicItemsContractId" → "GetContractsPublicItems"

// 2. Remove plural/singular redundancy: [Plural][Singular]Id pattern
"GetAlliancesAllianceIdContacts" → "GetAllianceContacts"
"GetCharactersCharacterIdSkills" → "GetCharacterSkills"
"GetCorporationsCorporationIdMembers" → "GetCorporationMembers"

// Regex: /([A-Z][a-z]+)s([A-Z][a-z]+)Id/g → '$2'

// 3. Remove Id before next word
"GetAllianceContactsLabels" → "GetAllianceContactsLabels" (no change)

// Regex: /Id([A-Z][a-z]+)/g → '$1'
```

**Result**: Operation ID → Transformed ID → camelCase method name

- `GetAlliancesAllianceId` → `GetAlliance` → `getAlliance()`
- `GetCharactersCharacterIdContacts` → `GetCharacterContacts` → `getCharacterContacts()`

### Type Generation Strategy

**Naming Convention**:

- Response types: `{TransformedOperationId}Response`
- Parameter types: `{TransformedOperationId}Params`
- Response headers: `{TransformedOperationId}ResponseHeaders`

**Example**: For operation `get_alliances_alliance_id`:

```typescript
// OpenAPI operationId: "GetAlliancesAllianceId"
// Transformed: "GetAlliance"
// Method name: "getAlliance"

export interface GetAllianceParams {
  alliance_id: number | string;
}

export interface GetAllianceResponse {
  name: string;
  ticker: string;
  creator_id: number;
  creator_corporation_id: number;
  executor_corporation_id?: number;
  date_founded: string;
  faction_id?: number;
}

// Method signature:
async getAlliance(params: GetAllianceParams): Promise<EsiResponse<GetAllianceResponse>>
```

### Parameter Flattening

All parameters (path, query, body) are merged into a single `Params` interface for simplicity.

**Location**: `scripts/generate.ts:395` - `generateParameterType()`

**Example**: `POST /characters/{character_id}/mail`

```typescript
// OpenAPI specification:
// - Path parameter: character_id (required)
// - Query parameters: (none)
// - Request body: { approved_cost, body, recipients, subject }

// Generated interface (flattened):
export interface PostCharacterMailParams {
  character_id: number | string // from path
  approved_cost?: number // from body
  body: string // from body
  recipients: Array<{
    // from body
    recipient_id: number
    recipient_type: 'alliance' | 'character' | 'corporation' | 'mailing_list'
  }>
  subject: string // from body
}

// Usage:
await esi.postCharacterMail({
  character_id: 91884358, // path param
  approved_cost: 0, // body field
  body: 'Hello from ESI!', // body field
  recipients: [{ recipient_type: 'character', recipient_id: 96135698 }],
  subject: 'Test',
})
```

**Conflict Detection**: Generator validates no naming conflicts occur via `assertNoConflict()` (scripts/generate.ts:381-393)

### Schema Component Generation

**Challenge**: Avoid circular references and duplicate generation.

**Strategy** (scripts/generate.ts:310-348):

1. **Dependency-first**: Referenced schemas generated before consumers
2. **Deduplication**: `generatedSchemaComponents` Set tracks generated types
3. **Recursive collection**: `collectAndGenerateReferencedSchemas()` walks schema tree depth-first
4. **Type building**: `buildTypeDefinition()` generates the actual TypeScript type definition

**Example**:

```typescript
// If ResponseType references PersonType:
// 1. Detect reference to PersonType
// 2. Generate PersonType first (if not already generated)
// 3. Then generate ResponseType that uses PersonType
```

### JSDoc Generation

Each method gets JSDoc with description and API explorer link.

**Location**: `scripts/generate.ts:472` - `generateJSDoc()`

**Format**:

```typescript
/**
 * {description from OpenAPI spec}
 *
 * @see https://developers.eveonline.com/api-explorer#/operations/{originalOperationId}
 */
```

Note: The `@see` link uses the **original** operation ID (not transformed) to link to correct API docs.

## Type Mapping Reference

### OpenAPI → TypeScript

| OpenAPI Type                       | TypeScript Type                |
| ---------------------------------- | ------------------------------ |
| `type: string`                     | `string`                       |
| `type: string, enum: ['a', 'b']`   | `'a' \| 'b'`                   |
| `type: number`                     | `number`                       |
| `type: integer`                    | `number`                       |
| `type: boolean`                    | `boolean`                      |
| `type: array, items: T`            | `T[]`                          |
| `type: object`                     | `interface` or `{ key: type }` |
| `$ref: "#/components/schemas/Foo"` | `Foo`                          |

**Implementation**: `scripts/generate.ts:350` - `getTypeScriptType()`

### Special Cases

**Inline enum**:

```typescript
// OpenAPI
schema: {
  type: "string",
  enum: ["alliance", "character", "corporation"]
}

// Generated
type: 'alliance' | 'character' | 'corporation'
```

**Inline object**:

```typescript
// OpenAPI
schema: {
  type: "object",
  properties: {
    foo: { type: "string" },
    bar: { type: "number" }
  }
}

// Generated
{ foo: string; bar: number }
```

**Array with reference**:

```typescript
// OpenAPI
schema: {
  type: "array",
  items: { $ref: "#/components/schemas/Alliance" }
}

// Generated
Alliance[]
```

## Development Workflow

### Local Development Commands

```bash
# Full pipeline (recommended)
pnpm compile           # generate + build + test

# Individual steps
pnpm generate          # Fetch latest OpenAPI schema, generate client/types, and run linter
pnpm build             # Type-check scripts/, compile src/ to dist/, and type-check src/test
pnpm test              # Run Vitest tests against live API

# Code quality
pnpm lint              # Run oxlint on src/, scripts/, and vitest.config.ts
pnpm lint:fix          # Fix auto-fixable issues in src/, scripts/, and vitest.config.ts
pnpm format            # Run oxfmt

# Version management
pnpm change            # Create Beachball changefile (for releases)
```

### Making Changes to Generation Logic

1. **Edit** `scripts/generate.ts` (or related generator files)
2. **Regenerate**: `pnpm generate`
3. **Build**: `pnpm build`
4. **Test**: `pnpm test`
5. **Commit**: Include both generator changes AND regenerated files
6. **Changefile**: `pnpm change` if this affects published package

### Automated Version Management

Schema updates from the daily workflow are automatically treated as **patch** bumps:

**How It Works:**

1. Workflow fetches latest schema from ESI
2. Run `pnpm compile` (fetch schema, regenerate, build, test)
3. If generated output changed beyond `COMPATIBILITY_DATE`:
   - Commit generated changes
   - Create Beachball changefile with type `patch`
   - Open PR: `automated/update-esi-schema-{timestamp}`

**Why Always Patch?**

Schema updates are typically additive or documentation changes. Breaking changes in the EVE ESI API are rare and can be handled manually if they occur.

**Manual Override:**

If a schema update requires a different version bump (minor/major), manually edit the changefile in `/change/` directory before merging the PR.

### Version Management (Beachball)

This project uses [Beachball](https://microsoft.github.io/beachball/) for automated versioning.
IF YOU ARE A ROBOT DO NOT MAKE ANY CHANGES TO THE PROJECT VERSION.

**Workflow**:

```bash
# After making changes that affect the published package:
$ pnpm change

# Prompts:
# - Change type? (patch/minor/major)
# - Describe changes for changelog

# Creates: change/{branch}-{timestamp}.json

# On publish (CI only):
# - Reads changefiles
# - Updates package.json version
# - Generates CHANGELOG.md entry
# - Creates git tag
# - Publishes to npm
```

**Changefile locations**: `/change/` directory

## Testing Strategy

### Integration Tests Against Live API

**Location**: `src/test/client.test.ts`

**Approach**:

- Tests call the **real** EVE ESI API (not mocks)
- Uses hardcoded real game entity IDs (characters, corporations, systems, etc.)
- 30-second timeout per test (live API can be slow)
- `pnpm build` type-checks tests against generated `dist/`
- Tests validate response structure, types, and headers

**Test Coverage**:

- Alliance endpoints (`getAlliance`, `getAlliances`)
- Character endpoints (public info, skills, assets, etc.)
- Corporation endpoints
- Universe endpoints (solar systems, stations, etc.)
- Paginated responses (verify `x-pages` header)
- Error handling (404s, invalid IDs)
- Query parameter mode (`useRequestHeaders: false`)

**Example Test**:

```typescript
test('getAlliance returns alliance data', async () => {
  const result = await esi.getAlliance({ alliance_id: 434243723 })

  expect(result.data.name).toBe('C C P Alliance')
  expect(result.data.ticker).toBe('C C P')
  expect(result.status).toBe(200)
  expect(result.headers).toBeDefined()
})
```

**Why Integration Tests?**

- Validates against actual API behavior (not assumptions)
- Catches breaking changes in ESI API
- Ensures generated client works in real-world scenarios
- Tests network/auth handling

## CI/CD Automation

### Daily Schema Updates

**Workflow**: `.github/workflows/update-esi-schema.yml`

**Trigger**: Cron at 12:00 UTC daily + manual dispatch

**Process**:

1. Fetch latest schema from `https://esi.evetech.net/meta/openapi.json`
2. Run `pnpm compile` (regenerate + build + test)
3. If generated output changed beyond `COMPATIBILITY_DATE`:
   - Commit generated changes
   - Create Beachball changefile (always `patch` type)
   - Open PR: `chore: Update EVE ESI schema`

**Why Daily?** EVE Online updates their API regularly. This keeps the client in sync automatically.

**Why Patch Only?** Schema updates are typically additive or non-breaking. Breaking changes are rare and can be handled manually.

### PR Validation

**Workflow**: `.github/workflows/test.yml`

**Trigger**: Pull requests to master

**Checks**:

1. `pnpm lint` - oxlint validation
2. `pnpm build` - TypeScript compilation
3. `pnpm test` - Integration tests

### Changelog Validation

**Workflow**: `.github/workflows/check-changefile.yml`

**Trigger**: Pull requests to master (skipped for dependabot)

**Checks**:

1. `pnpm beachball check` - Verify changefile exists

**Note**: This check is skipped when `github.actor` is `dependabot[bot]` since dependency updates don't require changefiles.

### Publishing

**Workflow**: `.github/workflows/publish.yml`

**Trigger**: Manual workflow dispatch only

**Process**:

1. Run build and tests
2. `pnpm beachball publish`:
   - Reads changefiles from `/change/`
   - Bumps version in `package.json`
   - Generates `CHANGELOG.md` entry
   - Creates git tag
   - Publishes to npm with OIDC provenance
3. Commits version bump + changelog

## Common Tasks

### Adding a New Transformation Rule

**Scenario**: Want to transform `GetFooBarsBarId` → `GetFooBar`

**Steps**:

1. Edit `scripts/generate.ts:782` - `transformOperationId()`
2. Add transformation logic (regex or string replace)
3. Regenerate: `pnpm generate`
4. Verify: Check `src/client.ts` for expected method names
5. Test: `pnpm test`
6. Commit: Include both generator + generated files

**Example**:

```typescript
function transformOperationId(operationId: string): string {
  let transformed = operationId

  // Existing transformations...

  // Add new transformation
  transformed = transformed.replace(/BarsBarId/g, 'Bar')

  return transformed
}
```

### Modifying Type Generation

**Scenario**: Want to change how arrays are generated

**Steps**:

1. Locate relevant function:
   - `generateTypes()` - Main entry (line 120)
   - `generateResponseType()` - Response types (line 220)
   - `generateTypeFromSchema()` - Schema components (line 286)
   - `buildTypeDefinition()` - Type definition builder (line 265)
   - `getTypeScriptType()` - Type mapping (line 350)
2. Modify generation logic
3. Regenerate: `pnpm generate`
4. Verify: Check `src/types.ts` for expected output
5. Test: `pnpm test` (ensure no type errors)

### Debugging Generation Issues

**Common Issues**:

1. **Missing type reference**
   - Check `generatedSchemaComponents` Set tracking
   - Verify `collectAndGenerateReferencedSchemas()` logic
   - Look for typos in `$ref` path parsing

2. **Circular reference / infinite loop**
   - Review dependency generation order
   - Ensure `buildTypeDefinition()` is used correctly for final type generation
   - Check that Set deduplication is working

3. **Parameter name conflicts**
   - Look for error thrown via `assertNoConflict()` (lines 381-393)
   - Check if path/query/body params have overlapping names
   - Consider renaming in transformation logic

4. **Method not generated**
   - Verify operation has supported HTTP method (get/post/put/delete)
   - Check if `operationId` exists or can be inferred
   - Look for errors during `generateMethod()` execution

**Debugging Tips**:

- Add `console.log()` statements in generator
- Check generated file output line-by-line
- Compare OpenAPI schema with expected TypeScript output
- Run `pnpm generate` with verbose output

### Adding Response Header Types

**Scenario**: Want to type pagination headers (`X-Pages`, `X-Page`)

**Current Behavior**: Already implemented!

**How it Works** (scripts/generate.ts:456):

1. `generateResponseHeaderType()` extracts headers from response
2. Creates `{OperationName}ResponseHeaders` interface
3. Lowercases header names to match `fetch()` and marks them optional (`?`)
4. Headers passed as second type param to `EsiResponse<TData, THeaders>`

**Example**:

```typescript
// Generated type
export interface GetCharacterAssetsResponseHeaders {
  'x-pages'?: string;
  'x-page'?: string;
}

// Method signature
async getCharacterAssets(
  params: GetCharacterAssetsParams
): Promise<EsiResponse<GetCharacterAssetsResponse, GetCharacterAssetsResponseHeaders>>

// Usage
const result = await esi.getCharacterAssets({ character_id: 123 })
console.log(result.headers['x-pages']) // Typed as string | undefined
```

## Critical Conventions

### DO's ✅

1. **Always regenerate** after modifying `scripts/generate.ts`

   ```bash
   pnpm generate
   ```

2. **Run tests** to validate against live API

   ```bash
   pnpm test
   ```

3. **Create changefiles** for any package changes

   ```bash
   pnpm change
   ```

4. **Follow formatting rules** (`.oxfmtrc.json`):
   - No semicolons
   - Single quotes
   - 80-char line width
   - 2-space indentation
   - Arrow parens: avoid

5. **Preserve operation ID transformations** - They exist for better DX

6. **Maintain strict type safety** - Use TypeScript strict mode

7. **Test against live API** - Don't mock ESI responses

8. **Document breaking changes** - Use major version bump in changefile

### DON'Ts ❌

1. **Don't manually edit** `src/client.ts` or `src/types.ts`
   - These are auto-generated
   - Edit `scripts/generate.ts` instead

2. **Don't add runtime dependencies**
   - Client must remain zero-dependency
   - Use native `fetch()` and standard library only

3. **Don't skip tests**
   - Integration tests validate against real API
   - They catch regressions and API changes

4. **Don't reintroduce** a checked-in OpenAPI schema snapshot
   - `pnpm generate` fetches the schema directly from ESI
   - Generated `src/*` and README updates are the committed source of truth

5. **Don't break parameter flattening**
   - Users expect single params object
   - Maintaining this convention is critical for DX

6. **Don't remove type safety**
   - Keep strict TypeScript checks
   - Don't use `any` unless absolutely necessary

7. **Don't skip changefile creation**
   - CI requires changefiles for non-automated PRs
   - Use `pnpm change` for every user-facing change

## Design Decisions & Rationale

### Why Zero Runtime Dependencies?

**Decision**: No production dependencies in `package.json`

**Rationale**:

- **Security**: Smaller attack surface, no supply chain risks
- **Bundle size**: Keep client tiny for browser/edge environments
- **Compatibility**: Works anywhere `fetch()` is available (Node 18+, browsers, Deno, Bun)
- **Maintenance**: No dependency updates or breaking changes to track

### Why Flatten Parameters?

**Decision**: Merge path/query/body into single `Params` interface

**Rationale**:

- **Developer experience**: Single object is simpler than multiple arguments
- **Named parameters**: Avoids positional argument confusion
- **Optional params**: Easy to omit optional query params
- **Consistency**: Same pattern for all methods

**Alternative considered**: Separate arguments `(pathParams, queryParams?, body?)`

- Rejected: Too verbose, positional arguments error-prone

### Why Typed Response Headers?

**Decision**: Generate `{Operation}ResponseHeaders` interfaces

**Rationale**:

- **Pagination**: ESI uses `X-Pages`, surfaced as `x-pages` because Fetch lowercases response headers
- **Type safety**: Catch typos in header names at compile time
- **Autocomplete**: IDE suggests available headers
- **Optional by design**: Headers may not be present, marked `?`

### Why Dual Auth Modes?

**Decision**: Support both header-based and query-param auth

**Rationale**:

- **ESI requirement**: API supports both methods
- **Backward compatibility**: Legacy systems may use query params
- **Flexibility**: Let users choose based on their needs
- **Default to headers**: More secure (not logged in URLs)

**Constructor option**:

```typescript
new EsiClient({
  userAgent: 'foo@example.com',
  token: 'bearer-token',
  useRequestHeaders: false, // Use query params instead
})
```

### Why Compatibility Date?

**Decision**: Hardcode `COMPATIBILITY_DATE` in generated client

**Rationale**:

- **ESI versioning**: API uses compatibility dates for breaking changes
- **Stable behavior**: Client generated on date X works consistently
- **Auto-update**: Date updated on each generation
- **Transparency**: Users know which API version client targets

**Implementation** (scripts/generate.ts:498):

```typescript
const COMPATIBILITY_DATE = '${new Date().toISOString().slice(0, 10)}'
```

## Code Style Guide

### Formatter Configuration

See `.oxfmtrc.json`

### oxlint Configuration

- TypeScript linting via `@typescript-eslint` rules (native support)
- oxfmt handles formatting separately (no conflicts)
- Strict type checking enforced
- Lint coverage includes `src/`, `scripts/`, and `vitest.config.ts`
- Config: `.oxlintrc.json`

### Naming Conventions

- **Files**: `kebab-case.ts` (e.g., `generate-readme.ts`)
- **Types/Interfaces**: `PascalCase` (e.g., `EsiResponse`, `GetAllianceParams`)
- **Functions**: `camelCase` (e.g., `generateTypes`, `transformOperationId`)
- **Constants**: `SCREAMING_SNAKE_CASE` (e.g., `SCHEMA_URL`, `COMPATIBILITY_DATE`)
- **Methods**: `camelCase` (e.g., `getAlliance`, `postCharacterMail`)

## Useful Code Locations

### Core Generation Logic

- **Main generator**: `scripts/generate.ts:805` - `main()`
- **Schema loading**: `scripts/generate.ts:109` - `loadSchema()`
- **Type generation**: `scripts/generate.ts:120` - `generateTypes()`
- **Client generation**: `scripts/generate.ts:487` - `generateClient()`
- **Method generation**: `scripts/generate.ts:607` - `generateMethod()`

### Transformation Logic

- **Operation ID transform**: `scripts/generate.ts:782` - `transformOperationId()`
- **Type mapping**: `scripts/generate.ts:350` - `getTypeScriptType()`
- **Parameter flattening**: `scripts/generate.ts:395` - `generateParameterType()`

### Schema Handling

- **Schema component generation**: `scripts/generate.ts:286` - `generateTypeFromSchema()`
- **Type definition builder**: `scripts/generate.ts:265` - `buildTypeDefinition()`
- **Reference collection**: `scripts/generate.ts:310` - `collectAndGenerateReferencedSchemas()`
- **Response type generation**: `scripts/generate.ts:220` - `generateResponseType()`

### Helper Functions

- **Ref name extraction**: `scripts/generate.ts:96` - `extractRefName()`
- **Success response getter**: `scripts/generate.ts:102` - `getSuccessResponse()`
- **Conflict assertion**: `scripts/generate.ts:381` - `assertNoConflict()`
- **Path param extraction**: `scripts/generate.ts:710` - `extractPathParams()`
- **Query param extraction**: `scripts/generate.ts:730` - `extractQueryParams()`
- **Response header extraction**: `scripts/generate.ts:745` - `extractResponseHeaders()`
- **JSDoc generation**: `scripts/generate.ts:472` - `generateJSDoc()`

## Troubleshooting

### Tests Failing Against Live API

**Symptoms**: Tests timing out or returning unexpected data

**Causes**:

- EVE Online API may be down or slow
- Test entity IDs may have been deleted/changed in-game
- Rate limiting from too many requests

**Solutions**:

- Check https://esi.evetech.net/status/ for API status
- Update test IDs to known-good entities
- Add delays between tests if rate-limited
- Increase timeout in `src/test/client.test.ts`

### Generated Code Has TypeScript Errors

**Symptoms**: `pnpm build` fails with type errors in generated files

**Causes**:

- Generator produced invalid TypeScript syntax
- Missing type reference
- Circular type dependency

**Solutions**:

- Check `src/types.ts` and `src/client.ts` for syntax errors
- Review generator logic for recent changes
- Validate OpenAPI schema is well-formed
- Look for circular `$ref` in schema

### CI Workflow Not Creating PR for Schema Updates

**Symptoms**: Daily workflow runs but no PR created

**Causes**:

- Schema hasn't changed
- Tests failing (PR not created on failure)
- Git permissions issue

**Solutions**:

- Check workflow logs in GitHub Actions
- Verify schema actually changed
- Ensure tests pass locally: `pnpm compile`
- Check repository permissions for GitHub Actions bot

## Additional Resources

- **EVE ESI Documentation**: https://developers.eveonline.com/
- **EVE ESI OpenAPI Spec**: https://esi.evetech.net/meta/openapi.json
- **EVE ESI Status**: https://esi.evetech.net/status/
- **EVE API Explorer**: https://developers.eveonline.com/api-explorer
- **Beachball Docs**: https://microsoft.github.io/beachball/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/

## Questions or Issues?

When contributing or making changes:

1. Read this entire document
2. Review the approved plan (if in plan mode)
3. Examine existing code patterns in `scripts/generate.ts`
4. Test changes locally with `pnpm compile`
5. Create changefile with `pnpm change`
6. Submit PR with clear description

For questions about EVE Online API behavior, consult:

- ESI API documentation
- ESI community forums
- EVE Online developer Discord

---

**For AI Agents**: This document is your primary reference. Follow the conventions strictly, especially around generated files and zero dependencies. When in doubt, ask for clarification rather than making assumptions.
