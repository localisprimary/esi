# AGENTS.md - ESI TypeScript Client Guide

This is the primary reference for agents and contributors working on this
repository. It describes the checked-in project as of 2026-11-21.

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

- `src/client.ts`: 208 client methods, 3,282 lines, about 114 KB.
- `src/types.ts`: 717 exported interfaces/type aliases, 7,414 lines, about
  173 KB.
- `README.md`: 208 generated method-table rows.
- `COMPATIBILITY_DATE` is `2026-11-19`.
- The schema for that compatibility date is OpenAPI 3.1 with 193 paths and 208
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
    loadSchema()       fetch OpenAPI JSON from ESI for today's date and read
                       the resolved X-Compatibility-Date response header
    assertUniqueOperationNames()  fail on transformed method-name collisions
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
files. Do not run it during a read-only audit unless regenerated output is part
of the task.

### Compatibility Date

ESI serves a different schema per compatibility date, and routes can be
removed in a new version. `loadSchema()` requests the schema with
`X-Compatibility-Date` set to the current UTC date and stamps the date from
ESI's `x-compatibility-date` response header (the newest published version) as
`COMPATIBILITY_DATE`. Generated types and request dates therefore always
describe the same API version, and `COMPATIBILITY_DATE` only changes when ESI
publishes a new version. Never fetch the schema without the header: ESI then
returns its legacy `2020-01-01` schema, which lists routes that 404 for newer
dates. That mismatch broke the scheduled runs on 2026-11-19 through 2026-11-21.

### Operation Naming

`transformOperationId()` applies these rules before `camelcase` creates the
method name:

0. Return an explicit `OPERATION_NAME_OVERRIDES` entry when one exists. It
   covers operations whose path parameters don't match their collection name,
   e.g. `GetCharactersCharacterIdMailMailId` -> `GetCharacterMailMessage`
   (because `getCharacterMail()` is the list) and
   `GetKillmailsKillmailIdKillmailHash` -> `GetKillmail`.
1. Remove a trailing `ContractId` for the public contract bid/item operations.
2. Collapse `[PluralNoun][SingularNoun]Id`, for example
   `CharactersCharacterId` to `Character`.
3. Collapse a doubled `[SingularNoun][SingularNoun]Id`, for example
   `CorporationCorporationId` (from `/corporation/{corporation_id}`) to
   `Corporation`.
4. Remove `Id` before a following word.
5. Remove a trailing `Listing`, or replace a trailing `sDetail` with the
   singular, for newer ESI operation IDs.
6. When the path starts with `/characters/{`, `/corporations/{`, or
   `/alliances/{`, singularize a leading `Characters`, `Corporations`, or
   `Alliances` owner.
7. Singularize a plural path segment followed by a `{param}` when the name
   continues after it, e.g. `GetCorporationProjectsContributors` ->
   `GetCorporationProjectContributors`.

Examples:

- `GetAlliancesAllianceId` -> `GetAlliance` -> `getAlliance()`
- `GetCharactersCharacterIdContacts` -> `GetCharacterContacts` ->
  `getCharacterContacts()`
- `GetCharactersDetail` -> `GetCharacter` -> `getCharacter()`
- `GetCharactersAccessListsListing` -> `GetCharacterAccessLists`
- `GetFreelanceJobsDetail` -> `GetFreelanceJob`
- `GetMilitaryCampaignsObjectivesListing` -> `GetMilitaryCampaignObjectives`

Prefer a general rule over an override. Keep overrides for names that can't be
derived from the operation ID and path. `assertUniqueOperationNames()` fails
generation if two operations transform to the same name. The API Explorer link
retains the original operation ID.

### Naming Review

ESI keeps adding endpoints and changing its operation-ID style (for example,
the `…Listing`/`…Detail` IDs introduced with compatibility date 2026-11-19).
The rules above only cover patterns seen so far, so **review every added or
renamed method name whenever generated output changes**. That includes
schema-update PRs from automation. List the name changes with:

```bash
git diff -U0 src/client.ts | grep -E '^[-+]  async '
```

Flag a new name when it:

- keeps an ID or path-parameter token (`…EventId`, `…MailMailId`,
  `…KillmailHash`, `…Division…`);
- repeats a word (`getCorporationCorporation…`);
- keeps a plural parent where existing names use the singular
  (`getCorporationProjectsContributors` vs `getCharacterContractBids`);
- keeps a raw ESI suffix (`…Listing`, `…Detail`) or a new suffix style;
- keeps a plural owner (`getCharactersX`) for a `/characters/{character_id}/…`
  route;
- differs in style from sibling methods on the same route family.

For each finding, add a general rule to `transformOperationId()` if it
generalizes, otherwise an `OPERATION_NAME_OVERRIDES` entry. Add a
`transformOperationId` test case, and check that no unrelated names changed.
Renaming an existing published method is breaking, so it needs a `major`
changefile. Prefer fixing names when an endpoint is first added, before users
depend on them. Run-together words from ESI paths (`Corporationhistory`,
`Skillqueue`, `Openwindow`) are currently left as-is by decision. Don't split
them without a deliberate major release.

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
| `null`                       | `null`                     |
| type array (`["a", "null"]`) | union of each type         |
| `oneOf`                      | union of variants          |
| `array`                      | `T[]`                      |
| object with properties       | interface or inline object |
| object without properties    | `Record<string, unknown>`  |
| typed `additionalProperties` | `Record<string, T>`        |
| `$ref`                       | referenced component name  |
| unrecognized/missing type    | `unknown`                  |

Referenced schemas are collected depth-first, including through `oneOf`
variants, query parameters, and request bodies, and are tracked in a `Set` to
avoid duplicate declarations. The generator currently supports only the subset of
OpenAPI used by ESI; new schema keywords must be added deliberately and covered
by fixture tests.

### Parameter Flattening

Path parameters are extracted from `{name}` placeholders. Query parameters and
JSON request-body properties are merged into the same generated `Params`
interface. `assertNoConflict()` rejects duplicate names across those sources.

Object request bodies are flattened by property, including `$ref` bodies that
resolve to an object component (for example `postRoute()`). Root array/scalar
bodies are exposed as a `body` property.

### Generated Request Runtime

The generated private `request()` method:

- creates a URL relative to `https://esi.evetech.net`;
- appends defined scalar query values and repeats keys for array values;
- sends user-agent, the generated `COMPATIBILITY_DATE`, and optional
  bearer-token headers by default;
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

The suite contains 60 tests:

- 17 depend on live `esi.evetech.net` behavior.
- 43 are deterministic generator, README, cache, request, response, type,
  constructor, empty-body, and packed-package tests. `pnpm test:unit` runs 41 of
  these; the constructor and empty-body checks remain in `client.test.ts`.
  Generator tests cover compatibility-date schema loading and stamping,
  `oneOf`/nullable unions, `$ref` body flattening, property-less objects, and
  operation-name collisions.
- 17 of 208 generated methods are invoked directly (about 8% method sampling,
  not statement/branch coverage).

The live tests cover a small set of alliance, character, corporation, market,
sovereignty, route (`postRoute()` with route endpoint assertions), and universe
operations; two 422 responses; one pagination header; and the query-auth mode
at status-code level. Most successful endpoint checks assert only HTTP 200.

`pnpm test:coverage` uses `@vitest/coverage-v8`, writes text/HTML/LCOV reports,
and enforces the current overall baseline: 20% statements, 35% branches, 12%
functions, and 20% lines (currently about 33%, 62%, 21%, and 33%). Coverage
output is gitignored. The low function/line percentages reflect the 208
generated endpoint wrappers; raise thresholds as fixture and request coverage
grows.

### Missing High-Value Tests

Remaining high-value additions:

1. Generator fixtures for reference cycles, conflict failures, response headers,
   and unsupported future OpenAPI keywords (`allOf`, `anyOf`, discriminators).
2. Mocked request tests for every HTTP verb and path substitution, plus malformed
   success JSON and network failures.
3. Type-level negative tests proving required fields cannot be omitted.
4. More meaningful payload assertions in live tests; most currently check only
   status codes.

## Local Development Commands

```bash
pnpm generate          # Fetch schema, regenerate source/README, lint-fix, format
pnpm build             # Type-check scripts, rebuild dist, type-check tests
pnpm test:unit          # Run 41 fast deterministic regression tests
pnpm test:coverage      # Run deterministic tests with V8 coverage thresholds
pnpm test:live          # Run the 19-test client suite (network required)
pnpm test              # Run all 60 tests (live network required)
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
4. Inspect generated diffs in `src/client.ts`, `src/types.ts`, and `README.md`,
   and do the [Naming Review](#naming-review) for any added or changed method
   names.
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
dispatch. It runs `pnpm compile`, skips the PR when generated files are
unchanged, commits generated changes, creates a changefile, and opens a
timestamp-suffixed update PR.

The changefile is `major` when `COMPATIBILITY_DATE` changed, since ESI publishes
new compatibility dates for breaking changes, and `patch` otherwise. When the
date changes, review removed routes and update live tests before merging. If a
new version removes a route the live tests call, `pnpm compile` fails until the
tests are updated.

The workflow regenerates names mechanically and doesn't judge them. Its
"Summarize method changes" step compares the `async` method lists in
`src/client.ts` before and after regeneration. It writes the PR body (and the
job summary) with any compatibility-date change warning, the added methods,
the removed or renamed methods, and a pre-merge checklist. Before merging any
schema-update PR, do the [Naming Review](#naming-review) on the added methods
and push naming fixes to the PR branch. A renamed method shows up as one
removal plus one addition.

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

Line references below match the 1,131-line `scripts/generate.ts` checked in on
2026-11-21:

### Generator Entry and Output

- Schema URL/constants: `scripts/generate.ts:8-11`
- Compatibility-date schema loading: `scripts/generate.ts:140`
- Type generation: `scripts/generate.ts:167`
- Client generation/runtime template: `scripts/generate.ts:619`
- `COMPATIBILITY_DATE` stamp in template: `scripts/generate.ts:640`
- Method generation: `scripts/generate.ts:813`
- Main/write orchestration/direct-execution guard: `scripts/generate.ts:1103`

### Schema and Type Handling

- Reference-name extraction: `scripts/generate.ts:113`
- Success-response selection: `scripts/generate.ts:119`
- Response type generation: `scripts/generate.ts:268`
- Type definition builder: `scripts/generate.ts:311`
- Component generation: `scripts/generate.ts:339`
- Recursive reference collection: `scripts/generate.ts:363`
- OpenAPI-to-TypeScript mapping: `scripts/generate.ts:429`
- Conflict assertion: `scripts/generate.ts:478`
- Request body `$ref` resolution: `scripts/generate.ts:492`
- Parameter type generation/flattening: `scripts/generate.ts:508`
- Response header type generation: `scripts/generate.ts:588`

### Client Method Helpers

- JSDoc/API Explorer link: `scripts/generate.ts:604`
- Query serialization in generated runtime template:
  `scripts/generate.ts:674-681`
- Cache-aware request runtime template: `scripts/generate.ts:671-787`
- Path parameter extraction: `scripts/generate.ts:912`
- Parameter `$ref` resolution: `scripts/generate.ts:917`
- Query parameter extraction: `scripts/generate.ts:932`
- Response header extraction: `scripts/generate.ts:947`
- Response type lookup: `scripts/generate.ts:974`
- Operation ID transformation: `scripts/generate.ts:984`
- Operation name overrides: `scripts/generate.ts:1055`
- Operation ID fallback: `scripts/generate.ts:1071`
- Operation-name collision check: `scripts/generate.ts:1082`

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
