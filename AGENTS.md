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

## 📝 Maintaining This Document

**IMPORTANT**: If you make changes to this project that affect how agents should work with the codebase, you MUST update this AGENTS.md file accordingly.

### When to Update AGENTS.md

Update this document when you:

1. **Modify generation logic** - Add/change transformations, type generation patterns, or schema handling
2. **Change project structure** - Move files, add new directories, or reorganize the codebase
3. **Add/remove dependencies** - Even dev dependencies that affect workflow
4. **Update workflows** - Modify CI/CD, testing approach, or build process
5. **Introduce new patterns** - Add conventions that future agents should follow
6. **Change configuration** - Update TypeScript, ESLint, Prettier, or other tool configs
7. **Add new scripts** - New package.json scripts that agents might need to use
8. **Fix documentation errors** - Correct outdated information or broken references

### What to Update

- **Code locations**: Update line numbers if you significantly refactor files
- **Examples**: Update code examples if APIs or patterns change
- **Workflow steps**: Revise instructions if development process changes
- **Common tasks**: Add new tasks or update existing ones with new patterns
- **Troubleshooting**: Add new issues you discovered and their solutions

### How to Update

1. **Be specific**: Include file paths, line numbers, and concrete examples
2. **Be actionable**: Provide step-by-step instructions, not just descriptions
3. **Be accurate**: Test your changes and verify documentation matches reality
4. **Be concise**: Keep the document scannable with clear headers and short paragraphs
5. **Cross-reference**: Link related sections together for easy navigation

**Remember**: This document is the primary reference for AI agents. Keeping it accurate and up-to-date ensures smooth collaboration and prevents confusion.

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
│   ├── generate.ts              # Main generator (858 lines) - CORE LOGIC
│   ├── fetch-schema.ts          # Downloads OpenAPI schema from ESI
│   ├── generate-readme.ts       # Generates README method table
│   ├── detect-schema-changes.ts # Detects version bump type (major/minor/patch)
│   ├── test/                    # Tests for generation scripts
│   │   ├── detect-schema-changes.test.ts  # Schema detection tests
│   │   └── fixtures/            # Test schemas for detection testing
│   └── static/
│       ├── openapi.json         # Cached OpenAPI schema (847KB)
│       └── boilerplate.md       # README template
│
├── dist/                         # Compiled output (gitignored)
├── change/                       # Beachball changefiles for versioning
├── .github/workflows/            # CI/CD automation
│   ├── update-esi-schema.yml    # Daily cron to fetch schema updates
│   ├── publish.yml              # Manual npm publish workflow
│   ├── test.yml                 # PR validation (lint, build, test)
│   └── check-changelog.yml      # Changefile check (skipped for dependabot)
│
├── package.json                  # Project config (ES module, Node ^24.13.0)
├── tsconfig.json                 # TypeScript config (strict mode, ES2020)
└── README.md                     # User-facing documentation
```

## Code Generation Architecture

### Pipeline Flow

```
1. FETCH SCHEMA
   $ pnpm fetch-schema
   ├─ Downloads: https://esi.evetech.net/meta/openapi.json
   └─ Saves to: scripts/static/openapi.json

2. GENERATE CODE
   $ pnpm generate
   ├─ loadSchema() - Parse OpenAPI JSON (scripts/generate.ts:94)
   ├─ generateTypes() - Create TypeScript types (scripts/generate.ts:106)
   │  ├─ Extract components/parameters
   │  ├─ For each path + method:
   │  │  ├─ Transform operation ID (simplify name)
   │  │  ├─ Generate response types (*Response)
   │  │  ├─ Generate parameter types (*Params)
   │  │  └─ Generate response header types (*ResponseHeaders)
   │  └─ Handle schema references (dependency-first)
   │
   ├─ generateClient() - Create EsiClient class (scripts/generate.ts:495)
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

3. BUILD
   $ pnpm build
   └─ Compile TypeScript to JavaScript in dist/

4. TEST
   $ pnpm test
   └─ Run Vitest tests against live EVE ESI API
```

### Operation ID Transformations

The generator simplifies verbose OpenAPI operation IDs for better developer experience.

**Location**: `scripts/generate.ts:813` - `transformOperationId()`

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

**Location**: `scripts/generate.ts:378` - `generateParameterType()`

**Example**: `POST /characters/{character_id}/mail`

```typescript
// OpenAPI specification:
// - Path parameter: character_id (required)
// - Query parameters: (none)
// - Request body: { approved_cost, body, recipients, subject }

// Generated interface (flattened):
export interface PostCharacterMailParams {
  character_id: number | string;  // from path
  approved_cost?: number;          // from body
  body: string;                    // from body
  recipients: Array<{              // from body
    recipient_id: number;
    recipient_type: 'alliance' | 'character' | 'corporation' | 'mailing_list';
  }>;
  subject: string;                 // from body
}

// Usage:
await esi.postCharacterMail({
  character_id: 91884358,        // path param
  approved_cost: 0,              // body field
  body: "Hello from ESI!",       // body field
  recipients: [{ recipient_type: 'character', recipient_id: 96135698 }],
  subject: "Test"
})
```

**Conflict Detection**: Generator validates no naming conflicts occur (scripts/generate.ts:394-442)

### Schema Component Generation

**Challenge**: Avoid circular references and duplicate generation.

**Strategy** (scripts/generate.ts:295-341):
1. **Dependency-first**: Referenced schemas generated before consumers
2. **Deduplication**: `generatedSchemaComponents` Set tracks generated types
3. **Recursive collection**: `collectAndGenerateReferencedSchemas()` walks schema tree depth-first
4. **Non-recursive generation**: `generateTypeFromSchemaNoRecursion()` prevents infinite loops

**Example**:
```typescript
// If ResponseType references PersonType:
// 1. Detect reference to PersonType
// 2. Generate PersonType first (if not already generated)
// 3. Then generate ResponseType that uses PersonType
```

### JSDoc Generation

Each method gets JSDoc with description and API explorer link.

**Location**: `scripts/generate.ts:480` - `generateJSDoc()`

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

| OpenAPI Type | TypeScript Type |
|--------------|-----------------|
| `type: string` | `string` |
| `type: string, enum: ['a', 'b']` | `'a' \| 'b'` |
| `type: number` | `number` |
| `type: integer` | `number` |
| `type: boolean` | `boolean` |
| `type: array, items: T` | `T[]` |
| `type: object` | `interface` or `{ key: type }` |
| `$ref: "#/components/schemas/Foo"` | `Foo` |

**Implementation**: `scripts/generate.ts:343` - `getTypeScriptType()`

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
pnpm compile           # fetch-schema + generate + build + test

# Individual steps
pnpm fetch-schema      # Download latest OpenAPI schema from ESI
pnpm generate          # Generate client/types + run linter
pnpm build             # Compile TypeScript to dist/
pnpm test              # Run Vitest tests against live API

# Code quality
pnpm lint              # Run ESLint
pnpm lint:fix          # Fix auto-fixable issues
pnpm format            # Run Prettier

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

Schema updates from the daily workflow are automatically classified by `scripts/detect-schema-changes.ts`:

**Version Bump Types:**
- **Major (Breaking)**: Operations removed, required parameters added/removed/changed, response types changed incompatibly
- **Minor (Features)**: Operations added, optional parameters added, enum values added
- **Patch (Non-breaking)**: Documentation updates, no operational changes

**How It Works:**
1. Workflow backs up current schema before fetching latest
2. If changes detected, runs `detect-schema-changes.ts` to compare schemas
3. Detection script analyzes operations, parameters, and responses
4. Outputs `major`, `minor`, or `patch` based on change severity
5. Changefile created with appropriate version bump type
6. PR title/body shows detected change type

**Testing Detection Locally:**
```bash
# Compare two schema files
node --experimental-strip-types scripts/detect-schema-changes.ts old-schema.json new-schema.json

# Output: "major", "minor", or "patch"
```

**Override Detection:**
If automated detection is incorrect, manually edit the changefile in `/change/` directory before merging the PR.

**Detection Rules:**

Major (Breaking) changes:
- Operation removed entirely
- Required path/query parameter added, removed, or type changed
- Parameter enum narrowed (options removed)
- Request body required flag changed to true
- Response schema `$ref` changed
- Response top-level type changed (array ↔ object)

Minor (New Feature) changes:
- Operation added
- Optional query parameter added
- Parameter enum widened (options added)

Patch (Non-breaking) changes:
- Everything else (descriptions, metadata, etc.)

**Implementation:**
- Detection script: `scripts/detect-schema-changes.ts`
- Workflow integration: `.github/workflows/update-esi-schema.yml`
- Fallback: If detection fails, defaults to `patch`

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
- Tests validate response structure, types, and headers

**Test Coverage**:
- Alliance endpoints (`getAlliance`, `getAlliances`)
- Character endpoints (public info, skills, assets, etc.)
- Corporation endpoints
- Universe endpoints (solar systems, stations, etc.)
- Paginated responses (verify `X-Pages` header)
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

### Schema Change Detection Tests

**Location**: `scripts/test/detect-schema-changes.test.ts`

**Approach**:
- Tests the automated version bump detection script
- Uses subprocess testing (executes the script with `child_process.execSync`)
- Tests with minimal but valid OpenAPI test fixtures
- Fast execution (< 5 seconds for all 23 tests)

**Test Fixtures** (`scripts/test/fixtures/`):
- `base-schema.json` - Reference schema with 3 basic operations
- `major-schema.json` - Breaking changes (operation removed, required param added, enum narrowed, response $ref changed)
- `minor-schema.json` - New features (operation added, optional param added, enum widened)
- `patch-schema.json` - Documentation changes only (identical operations)
- `invalid.json` - Malformed JSON for error testing

**Test Coverage**:
- **Change Detection**: Identical schemas, major/minor/patch scenarios, multiple simultaneous changes
- **Error Handling**: Missing files, invalid JSON, missing arguments, empty schemas
- **Edge Cases**: Parameter type changes, response type changes, required flag changes

**Running Tests**:
```bash
# Run all tests (client + detection)
pnpm test

# Run only detection tests
pnpm test detect-schema-changes

# Manually verify fixtures
node --experimental-strip-types scripts/detect-schema-changes.ts \
  scripts/test/fixtures/base-schema.json \
  scripts/test/fixtures/major-schema.json
# Output: major
```

**Why Schema Detection Tests?**
- Ensures automated version bumping stays correct as code evolves
- Prevents regressions in CI/CD automation
- Documents expected behavior with concrete examples
- Enables confident refactoring of detection logic

## CI/CD Automation

### Daily Schema Updates

**Workflow**: `.github/workflows/update-esi-schema.yml`

**Trigger**: Cron at 12:00 UTC daily + manual dispatch

**Process**:
1. Fetch latest schema from `https://esi.evetech.net/meta/openapi.json`
2. Check if schema changed with `git diff`
3. If changed:
   - Run `pnpm compile` (regenerate + build + test)
   - Create Beachball changefile (patch bump)
   - Open PR: `automated/update-esi-schema-{timestamp}`

**Why Daily?** EVE Online updates their API regularly. This keeps the client in sync automatically.

### PR Validation

**Workflow**: `.github/workflows/test.yml`

**Trigger**: Pull requests to master

**Checks**:
1. `pnpm lint` - ESLint validation
2. `pnpm build` - TypeScript compilation
3. `pnpm test` - Integration tests

### Changelog Validation

**Workflow**: `.github/workflows/check-changelog.yml`

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
   - Publishes to npm (requires `NPM_TOKEN` secret)
3. Commits version bump + changelog

## Common Tasks

### Adding a New Transformation Rule

**Scenario**: Want to transform `GetFooBarsBarId` → `GetFooBar`

**Steps**:
1. Edit `scripts/generate.ts:813` - `transformOperationId()`
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
   - `generateTypes()` - Main entry (line 106)
   - `generateResponseType()` - Response types (line 186)
   - `generateTypeFromSchema()` - Schema components (line 258)
   - `getTypeScriptType()` - Type mapping (line 343)
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
   - Ensure `generateTypeFromSchemaNoRecursion()` is used correctly
   - Check that Set deduplication is working

3. **Parameter name conflicts**
   - Look for error thrown in `generateParameterType()` (lines 394-442)
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

**How it Works** (scripts/generate.ts:453):
1. `generateResponseHeaderType()` extracts headers from response
2. Creates `{OperationName}ResponseHeaders` interface
3. Marks headers as optional (`?`) since not always present
4. Headers passed as second type param to `EsiResponse<TData, THeaders>`

**Example**:
```typescript
// Generated type
export interface GetCharacterAssetsResponseHeaders {
  'X-Pages'?: number;
  'X-Page'?: number;
}

// Method signature
async getCharacterAssets(
  params: GetCharacterAssetsParams
): Promise<EsiResponse<GetCharacterAssetsResponse, GetCharacterAssetsResponseHeaders>>

// Usage
const result = await esi.getCharacterAssets({ character_id: 123 })
console.log(result.headers['X-Pages']) // Typed as number | undefined
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

4. **Follow Prettier rules**:
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

4. **Don't modify** `scripts/static/openapi.json` manually
   - It's fetched from upstream via `pnpm fetch-schema`
   - Changes will be overwritten

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
- **Pagination**: ESI uses `X-Pages` header for pagination
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
  useRequestHeaders: false  // Use query params instead
})
```

### Why Compatibility Date?

**Decision**: Hardcode `COMPATIBILITY_DATE` in generated client

**Rationale**:
- **ESI versioning**: API uses compatibility dates for breaking changes
- **Stable behavior**: Client generated on date X works consistently
- **Auto-update**: Date updated on each generation
- **Transparency**: Users know which API version client targets

**Implementation** (scripts/generate.ts:506):
```typescript
const COMPATIBILITY_DATE = '${new Date().toISOString().slice(0, 10)}';
```

## Code Style Guide

### Prettier Configuration

See @.prettierrc

### ESLint Configuration

- TypeScript ESLint parser
- Prettier integration (no conflicts)
- Strict type checking enforced

### Naming Conventions

- **Files**: `kebab-case.ts` (e.g., `generate-readme.ts`)
- **Types/Interfaces**: `PascalCase` (e.g., `EsiResponse`, `GetAllianceParams`)
- **Functions**: `camelCase` (e.g., `generateTypes`, `transformOperationId`)
- **Constants**: `SCREAMING_SNAKE_CASE` (e.g., `SCHEMA_FILE`, `COMPATIBILITY_DATE`)
- **Methods**: `camelCase` (e.g., `getAlliance`, `postCharacterMail`)

## Useful Code Locations

### Core Generation Logic
- **Main generator**: `scripts/generate.ts:836` - `main()`
- **Schema loading**: `scripts/generate.ts:94` - `loadSchema()`
- **Type generation**: `scripts/generate.ts:106` - `generateTypes()`
- **Client generation**: `scripts/generate.ts:495` - `generateClient()`
- **Method generation**: `scripts/generate.ts:606` - `generateMethod()`

### Transformation Logic
- **Operation ID transform**: `scripts/generate.ts:813` - `transformOperationId()`
- **Type mapping**: `scripts/generate.ts:343` - `getTypeScriptType()`
- **Parameter flattening**: `scripts/generate.ts:378` - `generateParameterType()`

### Schema Handling
- **Schema component generation**: `scripts/generate.ts:258` - `generateTypeFromSchema()`
- **Reference collection**: `scripts/generate.ts:295` - `collectAndGenerateReferencedSchemas()`
- **Response type generation**: `scripts/generate.ts:186` - `generateResponseType()`

### Helper Functions
- **Path param extraction**: `scripts/generate.ts:737` - `extractPathParams()`
- **Query param extraction**: `scripts/generate.ts:757` - `extractQueryParams()`
- **Response header extraction**: `scripts/generate.ts:772` - `extractResponseHeaders()`
- **JSDoc generation**: `scripts/generate.ts:480` - `generateJSDoc()`

### Schema Change Detection
- **Main CLI**: `scripts/detect-schema-changes.ts:562` - `main()`
- **Schema loading**: `scripts/detect-schema-changes.ts:76` - `loadSchema()`
- **Operation extraction**: `scripts/detect-schema-changes.ts:89` - `extractOperations()`
- **Operation comparison**: `scripts/detect-schema-changes.ts:237` - `compareOperations()`
- **Breaking change detection**: `scripts/detect-schema-changes.ts:302` - `hasBreakingChanges()`
- **New feature detection**: `scripts/detect-schema-changes.ts:412` - `hasNewFeatures()`
- **Version bump determination**: `scripts/detect-schema-changes.ts:447` - `determineVersionBump()`

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
