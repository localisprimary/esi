# AGENTS.md - ESI TypeScript Client Guide

This is the primary reference for agents and contributors working on this
repository. It describes the checked-in project as of 2026-08-23.

## Project Overview

This project generates a strict, fully typed TypeScript client for the EVE
Online ESI API from the authoritative OpenAPI schema at
`https://esi.evetech.net/meta/openapi.json`.

Core constraints:

- The published client has zero runtime dependencies and uses native `fetch()`.
- Source and generator code use strict TypeScript.
- Path, query, and request-body inputs are flattened into one `Params` object.
- Operation IDs are simplified into shorter public method names.
- Generated source and documentation are committed to the repository.

Current generated snapshot:

- `src/client.ts`: 197 client methods, 3,084 lines, about 105 KB.
- `src/types.ts`: 556 exported interfaces/type aliases, 6,495 lines, about
  146 KB.
- `README.md`: 197 generated method-table rows.
- The current official schema is OpenAPI 3.1 with 182 paths and 197
  operations using GET, POST, PUT, and DELETE.

These counts change when ESI changes. Update this section after regeneration.

## Critical Rules

### Never Manually Edit Generated Files

Do not edit these files directly:

- `src/client.ts`
- `src/types.ts`
- `README.md`

`README.md` is generated in full, not only its method table. Edit
`scripts/static/boilerplate.md` for prose changes and `scripts/generate-readme.ts`
for table-generation changes. Edit `scripts/generate.ts` for client or type
generation changes, then run `pnpm generate`.

### Never Add Runtime Dependencies

The published package must remain dependency-free. Runtime code may use native
`fetch()` and standard TypeScript/JavaScript APIs only. Development dependencies
are allowed when justified.

### Never Change the Project Version Manually

If you are an automated agent, do not edit the version in `package.json`.
Beachball owns release versioning. Add a changefile for a package-facing change;
release CI applies the version bump.

### Always Keep This File Current

**Future agents must always keep `AGENTS.md` up to date with the actual project
before finishing any task that changes code, tests, scripts, configuration,
commands, workflows, generated output, or repository structure.** Verify all
line references and current-state claims instead of copying stale values.

At minimum, update the relevant sections when any of these change:

| Change                              | Required documentation update                   |
| ----------------------------------- | ----------------------------------------------- |
| Generator functions or layout       | Architecture, schema handling, useful locations |
| Generated output or schema size     | Current generated snapshot                      |
| Files/directories                   | Repository structure                            |
| `package.json` scripts              | Local commands and workflow                     |
| Tests or Vitest config              | Testing strategy and coverage gaps              |
| CI/CD                               | CI/CD automation                                |
| TypeScript, oxlint, or oxfmt config | Code style and validation                       |
| Known issue fixed or discovered     | Current known issues                            |

## Repository Structure

```text
/
├── src/
│   ├── client.ts                 # Generated EsiClient (do not edit)
│   ├── types.ts                  # Generated public types (do not edit)
│   ├── cache.ts                  # Hand-written shared HTTP cache runtime
│   ├── index.ts                  # Hand-written package entry point
│   └── test/
│       ├── cache.unit.test.ts     # Deterministic cache behavior tests
│       ├── client.test.ts        # Live integration + two deterministic tests
│       └── client.unit.test.ts   # Deterministic request/package/type tests
├── scripts/
│   ├── generate.ts               # Main schema-to-client generator
│   ├── generate.test.ts          # Generator schema-fixture tests
│   ├── generate-readme.ts        # README renderer
│   ├── generate-readme.test.ts   # README renderer tests
│   ├── tsconfig.json
│   └── static/
│       └── boilerplate.md        # Source template for all of README.md
├── .github/workflows/
│   ├── check-changefile.yml
│   ├── publish.yml
│   ├── test.yml
│   └── update-esi-schema.yml
├── dist/                         # Build output; gitignored
├── change/                       # Beachball changefiles when present
├── AGENTS.md
├── CHANGELOG.json
├── CHANGELOG.md
├── README.md                     # Generated in full (do not edit)
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.json
├── tsconfig.test.json
├── vitest.config.ts
└── mise.toml                     # Pins Node 24
```

## Generation Architecture

### Pipeline

```text
pnpm generate
  scripts/generate.ts
    loadSchema()       fetch current OpenAPI JSON directly from ESI
    generateTypes()    produce src/types.ts
    generateClient()   produce src/client.ts and collect method metadata
    generateReadme()   render all of README.md from boilerplate + metadata
  pnpm lint:fix
  pnpm format

pnpm build
  type-check scripts with scripts/tsconfig.json
  delete and rebuild dist/ from src/
  type-check src/test against the generated dist declarations

pnpm test:unit
  run deterministic generator, request, type, README, and package tests

pnpm test:coverage
  run deterministic tests with V8 coverage and enforced baseline thresholds

pnpm test:live
  run the 19-test client suite, including 17 live ESI checks

pnpm test
  run all deterministic and live ESI tests

pnpm compile
  generate + build + test
```

Running `pnpm generate` is intentionally mutating: it rewrites the generated
files and stamps `COMPATIBILITY_DATE` with the current UTC date. Do not run it
during a read-only audit unless regenerated output is part of the task.

### Operation Naming

`transformOperationId()` applies these rules before `camelcase` creates the
method name:

1. Remove a trailing `ContractId` for the public contract bid/item operations.
2. Collapse `[PluralNoun][SingularNoun]Id`, for example
   `CharactersCharacterId` to `Character`.
3. Remove `Id` before a following word.

Examples:

- `GetAlliancesAllianceId` -> `GetAlliance` -> `getAlliance()`
- `GetCharactersCharacterIdContacts` -> `GetCharacterContacts` ->
  `getCharacterContacts()`

The API Explorer link retains the original operation ID.

### Type Generation

For a transformed operation ID such as `GetAlliance`, the generator can emit:

- `GetAllianceResponse`
- `GetAllianceParams`
- `GetAllianceResponseHeaders`

Basic mappings are:

| OpenAPI schema               | TypeScript                 |
| ---------------------------- | -------------------------- |
| `string`                     | `string`                   |
| string `enum`                | string-literal union       |
| `number` / `integer`         | `number`                   |
| `boolean`                    | `boolean`                  |
| `array`                      | `T[]`                      |
| object with properties       | interface or inline object |
| typed `additionalProperties` | `Record<string, T>`        |
| `$ref`                       | referenced component name  |
| unrecognized/missing type    | `unknown`                  |

Referenced schemas are collected depth-first and tracked in a `Set` to avoid
duplicate declarations. The generator currently supports only the subset of
OpenAPI used by ESI; new schema keywords must be added deliberately and covered
by fixture tests.

### Parameter Flattening

Path parameters are extracted from `{name}` placeholders. Query parameters and
JSON request-body properties are merged into the same generated `Params`
interface. `assertNoConflict()` rejects duplicate names across those sources.

Object request bodies are flattened by property. Root array/scalar bodies are
exposed as a `body` property.

### Generated Request Runtime

The generated private `request()` method:

- creates a URL relative to `https://esi.evetech.net`;
- appends defined scalar query values and repeats keys for array values;
- sends user-agent, compatibility-date, and optional bearer-token headers by
  default;
- can send those values as query parameters with `useRequestHeaders: false`;
- JSON-stringifies a defined body;
- caches eligible GET responses in a shared 1,000-entry in-memory LRU;
- revalidates stale ETag entries with `If-None-Match` when headers are enabled;
- reads the response as text and parses non-empty successful JSON;
- throws a plain `EsiError`-shaped object for non-2xx responses;
- lowercases response header names through `Headers.entries()`.

## Resolved Audit Findings (2026-08-23)

The 2026-08-23 audit fixes are now expected behavior with regression coverage:

- Node ESM imports use explicit `.js` specifiers, and a Node subprocess imports
  the packed artifact in `client.unit.test.ts`.
- Nested inline object properties preserve OpenAPI `required` metadata.
- Typed `additionalProperties` preserve their value type and referenced schemas.
- Array query parameters serialize as repeated keys, including nested route
  connection arrays.
- Success response selection prefers explicit 2xx responses, then `2XX`, before
  falling back.
- The README mail example includes its required `subject` property.
- The unused `scripts/fetch-schema.ts` snapshot helper has been removed.
- Generator modules use `fileURLToPath()` and a direct-execution guard, allowing
  their pure functions to be imported safely in tests.
- The cache runtime is preserved with explicit Node ESM imports and deterministic
  cache-policy, coalescing, revalidation, opt-out, and LRU tests.

### Shared In-Memory Caching

Successful GET responses are cached only when ESI returns a usable
`Cache-Control` policy. The cache is shared across clients in one JavaScript
runtime, keys include a SHA-256 credential scope, stale ETag entries are
revalidated, and `cache: false` disables caching for a client. It is deliberately
in-memory only and does not survive reloads, cold starts, or separate processes.

## Testing Strategy and Coverage Gaps

### Current Suite

The suite contains 40 tests:

- 17 depend on live `esi.evetech.net` behavior.
- 23 are deterministic generator, README, cache, request, response, type,
  constructor, empty-body, and packed-package tests. `pnpm test:unit` runs 21 of
  these; the constructor and empty-body checks remain in `client.test.ts`.
- 17 of 197 generated methods are invoked directly (about 9% method sampling,
  not statement/branch coverage).

The live tests cover a small set of alliance, character, corporation, market,
and universe GET operations; two 422 responses; one pagination header; and the
query-auth mode at status-code level. Most successful endpoint checks assert
only HTTP 200.

`pnpm test:coverage` uses `@vitest/coverage-v8`, writes text/HTML/LCOV reports,
and enforces the current overall baseline: 20% statements, 35% branches, 12%
functions, and 20% lines. Coverage output is gitignored. The low function/line
percentages reflect the 197 generated endpoint wrappers; raise thresholds as
fixture and request coverage grows.

### Missing High-Value Tests

Remaining high-value additions:

1. Generator fixtures for reference cycles, conflict failures, response headers,
   unsupported future OpenAPI keywords, and operation-name collisions.
2. Mocked request tests for every HTTP verb and path substitution, plus malformed
   success JSON and network failures.
3. Type-level negative tests proving required fields cannot be omitted.
4. More meaningful payload assertions in live tests; most currently check only
   status codes.

## Local Development Commands

```bash
pnpm generate          # Fetch schema, regenerate source/README, lint-fix, format
pnpm build             # Type-check scripts, rebuild dist, type-check tests
pnpm test:unit          # Run 21 fast deterministic regression tests
pnpm test:coverage      # Run deterministic tests with V8 coverage thresholds
pnpm test:live          # Run the 19-test client suite (network required)
pnpm test              # Run all 40 tests (live network required)
pnpm compile           # generate + build + test
pnpm lint              # oxlint src, scripts, and vitest.config.ts
pnpm lint:fix          # apply oxlint fixes
pnpm format            # run oxfmt
pnpm change            # create a Beachball changefile
```

The repository expects Node `^24.13.0` and pnpm 10.34.5. `mise.toml` selects
Node 24; `packageManager` in `package.json` pins the pnpm release/integrity.

## Change Workflow

For generator or runtime changes:

1. Edit hand-written sources (`scripts/generate.ts`, `src/index.ts`, tests, or
   configuration). Never patch generated files as the source of truth.
2. Add a deterministic regression test that fails for the defect.
3. Run `pnpm generate` when generation output is affected.
4. Inspect generated diffs in `src/client.ts`, `src/types.ts`, and `README.md`.
5. Run `pnpm lint`, `pnpm build`, and the relevant deterministic tests.
6. Run `pnpm test:coverage`, then `pnpm test:live` with network access.
7. Update this file, including line references and known-issue status.
8. Add a Beachball changefile for a package-facing change. Do not edit the
   package version.

Preserve unrelated user changes in a dirty worktree.

## CI/CD Automation

### Pull Requests

`.github/workflows/test.yml` runs on pull requests to `master` and performs:

1. `pnpm lint`
2. `pnpm build`
3. `pnpm test:coverage`
4. `pnpm test:live`

`.github/workflows/check-changefile.yml` runs `pnpm beachball check` for pull
requests except Dependabot PRs.

### Daily Schema Update

`.github/workflows/update-esi-schema.yml` runs daily at 12:00 UTC and on manual
dispatch. It runs `pnpm compile`, ignores a diff containing only
`COMPATIBILITY_DATE`, commits meaningful generated changes, creates a patch
changefile, and opens a timestamp-suffixed update PR.

Schema automation assumes updates are patch-level. Handle an actual breaking
schema change manually with the appropriate Beachball change type.

### Publishing

`.github/workflows/publish.yml` is manually dispatched. It builds, runs the live
tests, uses Beachball to prepare release files without publishing, syncs with
`master`, publishes to npm with OIDC provenance, and creates a GitHub release
from `CHANGELOG.json`.

## Code Style

- Oxfmt: no semicolons, single quotes, 80 columns, 2 spaces, avoid arrow
  parentheses when possible.
- Oxlint covers `src/`, `scripts/`, and `vitest.config.ts`; tests are excluded
  from the stricter TypeScript override.
- TypeScript strict mode and NodeNext module resolution are enabled.
- Files use `kebab-case`; types/interfaces use `PascalCase`; functions and
  methods use `camelCase`; constants use `SCREAMING_SNAKE_CASE`.
- Use no `any` in hand-written runtime code unless there is a concrete reason.
  Generated request code currently contains `any` and suppresses that lint rule.

## Useful Code Locations

Line references below match the 938-line `scripts/generate.ts` checked in on
2026-08-23:

### Generator Entry and Output

- Schema URL/constants: `scripts/generate.ts:8-11`
- Schema loading: `scripts/generate.ts:122`
- Type generation: `scripts/generate.ts:133`
- Client generation/runtime template: `scripts/generate.ts:523`
- Method generation: `scripts/generate.ts:714`
- Main/write orchestration/direct-execution guard: `scripts/generate.ts:912`

### Schema and Type Handling

- Reference-name extraction: `scripts/generate.ts:98`
- Success-response selection: `scripts/generate.ts:104`
- Response type generation: `scripts/generate.ts:233`
- Type definition builder: `scripts/generate.ts:278`
- Component generation: `scripts/generate.ts:299`
- Recursive reference collection: `scripts/generate.ts:323`
- OpenAPI-to-TypeScript mapping: `scripts/generate.ts:380`
- Conflict assertion: `scripts/generate.ts:417`
- Parameter type generation/flattening: `scripts/generate.ts:431`
- Response header type generation: `scripts/generate.ts:492`

### Client Method Helpers

- JSDoc/API Explorer link: `scripts/generate.ts:508`
- Query serialization in generated runtime template:
  `scripts/generate.ts:559-566`
- Cache-aware request runtime template: `scripts/generate.ts:573-685`
- Path parameter extraction: `scripts/generate.ts:817`
- Parameter `$ref` resolution: `scripts/generate.ts:822`
- Query parameter extraction: `scripts/generate.ts:837`
- Response header extraction: `scripts/generate.ts:852`
- Response type lookup: `scripts/generate.ts:879`
- Operation ID transformation: `scripts/generate.ts:889`

### Other Sources

- README content generation: `scripts/generate-readme.ts:47`
- README writing: `scripts/generate-readme.ts:59`
- Shared cache runtime: `src/cache.ts:1`
- Public package exports: `src/index.ts:1`
- Live tests: `src/test/client.test.ts:13`
- Deterministic cache tests: `src/test/cache.unit.test.ts:3`
- Deterministic client/package tests: `src/test/client.unit.test.ts:36`
- Generator tests: `scripts/generate.test.ts:10`
- README tests: `scripts/generate-readme.test.ts:4`
- Vitest coverage/retry/timeouts: `vitest.config.ts:3`

## Troubleshooting

### Live Tests Fail Immediately

If most tests fail with `fetch failed`, `EAI_AGAIN`, timeouts, or connection
errors, first check network/DNS and ESI status. Run `pnpm test:unit` to verify the
deterministic suite independently. Retry live tests only after distinguishing an
environment failure from a client failure.

### Generated Types Do Not Compile

Inspect the first invalid declaration and reduce the corresponding OpenAPI shape
to a fixture. Check reference traversal, `getTypeScriptType()`, operation-name
collisions, and parameter conflicts. Fix the generator, never the generated
declaration.

### Generated Method Is Missing

Confirm the schema has a GET/POST/PUT/DELETE operation and an operation ID (or a
usable fallback). Then inspect operation filtering and transformed-name
collisions.

### README Change Disappears

All README content comes from `scripts/static/boilerplate.md` plus the generated
method table. Move the edit to the template and regenerate.

## External References

- ESI API Explorer: https://developers.eveonline.com/api-explorer
- ESI OpenAPI schema: https://esi.evetech.net/meta/openapi.json
- ESI status: https://esi.evetech.net/status/
- Beachball: https://microsoft.github.io/beachball/
- TypeScript: https://www.typescriptlang.org/docs/
