import { describe, it, expect } from 'vitest'
import { execSync } from 'child_process'
import { join } from 'path'
import { writeFileSync, unlinkSync } from 'fs'

/**
 * Test suite for detect-schema-changes.ts
 *
 * Tests the schema change detection logic that determines whether changes
 * should trigger a major, minor, or patch version bump.
 *
 * Test fixtures are located in scripts/test/fixtures/:
 * - base-schema.json: Reference schema with 3 operations
 * - major-schema.json: Breaking changes (operation removed, required param added, enum narrowed, response $ref changed)
 * - minor-schema.json: New features (operation added, optional param added, enum widened)
 * - patch-schema.json: Documentation changes only
 * - invalid.json: Malformed JSON for error testing
 */

const SCRIPT_PATH = join(__dirname, '../detect-schema-changes.ts')
const FIXTURES_DIR = join(__dirname, 'fixtures')

/**
 * Helper function to execute the detection script with two schema files
 */
function detectChanges(oldSchema: string, newSchema: string): string {
  try {
    const result = execSync(
      `node --experimental-strip-types "${SCRIPT_PATH}" "${oldSchema}" "${newSchema}"`,
      {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe'],
      }
    )
    return result.trim()
  } catch (error: any) {
    // Script exits with non-zero code on errors
    throw new Error(
      `Script failed: ${error.message}\nStdout: ${error.stdout}\nStderr: ${error.stderr}`
    )
  }
}

describe('detect-schema-changes', () => {
  describe('Change Detection', () => {
    it('detects identical schemas as patch', () => {
      const baseSchema = join(FIXTURES_DIR, 'base-schema.json')
      const result = detectChanges(baseSchema, baseSchema)
      expect(result).toBe('patch')
    })

    it('detects documentation-only changes as patch', () => {
      const baseSchema = join(FIXTURES_DIR, 'base-schema.json')
      const patchSchema = join(FIXTURES_DIR, 'patch-schema.json')
      const result = detectChanges(baseSchema, patchSchema)
      expect(result).toBe('patch')
    })

    it('detects operation removed as major', () => {
      const baseSchema = join(FIXTURES_DIR, 'base-schema.json')
      const majorSchema = join(FIXTURES_DIR, 'major-schema.json')
      const result = detectChanges(baseSchema, majorSchema)
      expect(result).toBe('major')
    })

    it('detects required parameter added as major', () => {
      // major-schema.json adds a required query parameter to alliances endpoint
      const baseSchema = join(FIXTURES_DIR, 'base-schema.json')
      const majorSchema = join(FIXTURES_DIR, 'major-schema.json')
      const result = detectChanges(baseSchema, majorSchema)
      expect(result).toBe('major')
    })

    it('detects enum narrowing as major', () => {
      // major-schema.json narrows datasource enum from ['tranquility', 'singularity'] to ['tranquility']
      const baseSchema = join(FIXTURES_DIR, 'base-schema.json')
      const majorSchema = join(FIXTURES_DIR, 'major-schema.json')
      const result = detectChanges(baseSchema, majorSchema)
      expect(result).toBe('major')
    })

    it('detects response schema change as major', () => {
      // major-schema.json changes Alliance response $ref to AllianceV2
      const baseSchema = join(FIXTURES_DIR, 'base-schema.json')
      const majorSchema = join(FIXTURES_DIR, 'major-schema.json')
      const result = detectChanges(baseSchema, majorSchema)
      expect(result).toBe('major')
    })

    it('detects operation added as minor', () => {
      // minor-schema.json adds corporations endpoint
      const baseSchema = join(FIXTURES_DIR, 'base-schema.json')
      const minorSchema = join(FIXTURES_DIR, 'minor-schema.json')
      const result = detectChanges(baseSchema, minorSchema)
      expect(result).toBe('minor')
    })

    it('detects optional parameter added as minor', () => {
      // minor-schema.json adds new_optional_param to characters endpoint
      const baseSchema = join(FIXTURES_DIR, 'base-schema.json')
      const minorSchema = join(FIXTURES_DIR, 'minor-schema.json')
      const result = detectChanges(baseSchema, minorSchema)
      expect(result).toBe('minor')
    })

    it('detects enum widening as minor', () => {
      // minor-schema.json widens datasource enum to include 'serenity'
      const baseSchema = join(FIXTURES_DIR, 'base-schema.json')
      const minorSchema = join(FIXTURES_DIR, 'minor-schema.json')
      const result = detectChanges(baseSchema, minorSchema)
      expect(result).toBe('minor')
    })

    it('prioritizes major over minor when both exist', () => {
      // Test schema with both breaking and new features - breaking should win
      const majorSchema = join(FIXTURES_DIR, 'major-schema.json')
      const minorSchema = join(FIXTURES_DIR, 'minor-schema.json')
      const result = detectChanges(majorSchema, minorSchema)
      // Since minor has more operations than major, this is actually a breaking change
      // (major removed operations) so it should be major
      expect(result).toBe('major')
    })
  })

  describe('Error Handling', () => {
    it('exits with error on missing old schema file', () => {
      const nonexistent = join(FIXTURES_DIR, 'nonexistent.json')
      const baseSchema = join(FIXTURES_DIR, 'base-schema.json')

      expect(() => detectChanges(nonexistent, baseSchema)).toThrow()
    })

    it('exits with error on missing new schema file', () => {
      const baseSchema = join(FIXTURES_DIR, 'base-schema.json')
      const nonexistent = join(FIXTURES_DIR, 'nonexistent.json')

      expect(() => detectChanges(baseSchema, nonexistent)).toThrow()
    })

    it('exits with error on invalid JSON in old schema', () => {
      const invalidSchema = join(FIXTURES_DIR, 'invalid.json')
      const baseSchema = join(FIXTURES_DIR, 'base-schema.json')

      expect(() => detectChanges(invalidSchema, baseSchema)).toThrow()
    })

    it('exits with error on invalid JSON in new schema', () => {
      const baseSchema = join(FIXTURES_DIR, 'base-schema.json')
      const invalidSchema = join(FIXTURES_DIR, 'invalid.json')

      expect(() => detectChanges(baseSchema, invalidSchema)).toThrow()
    })

    it('exits with error on missing arguments', () => {
      expect(() => {
        execSync(`node --experimental-strip-types "${SCRIPT_PATH}"`, {
          encoding: 'utf-8',
          stdio: ['pipe', 'pipe', 'pipe'],
        })
      }).toThrow()
    })

    it('exits with error on single argument', () => {
      const baseSchema = join(FIXTURES_DIR, 'base-schema.json')
      expect(() => {
        execSync(
          `node --experimental-strip-types "${SCRIPT_PATH}" "${baseSchema}"`,
          {
            encoding: 'utf-8',
            stdio: ['pipe', 'pipe', 'pipe'],
          }
        )
      }).toThrow()
    })

    it('handles empty schema files gracefully', () => {
      const emptyFile = join(FIXTURES_DIR, 'empty.json')

      try {
        writeFileSync(emptyFile, '')
        const baseSchema = join(FIXTURES_DIR, 'base-schema.json')

        expect(() => detectChanges(emptyFile, baseSchema)).toThrow()
      } finally {
        unlinkSync(emptyFile)
      }
    })

    it('handles schema with no paths gracefully', () => {
      const noPaths = join(FIXTURES_DIR, 'no-paths.json')

      try {
        writeFileSync(
          noPaths,
          JSON.stringify({
            openapi: '3.0.0',
            info: { title: 'Test', version: '1.0.0' },
            paths: {},
          })
        )
        const baseSchema = join(FIXTURES_DIR, 'base-schema.json')

        // Should detect all operations removed = major
        const result = detectChanges(baseSchema, noPaths)
        expect(result).toBe('major')
      } finally {
        unlinkSync(noPaths)
      }
    })
  })

  describe('Edge Cases', () => {
    it('handles parameter type changes as major', () => {
      const oldSchema = join(FIXTURES_DIR, 'type-change-old.json')
      const newSchema = join(FIXTURES_DIR, 'type-change-new.json')

      try {
        // Create schema where parameter type changes from integer to string
        writeFileSync(
          oldSchema,
          JSON.stringify({
            openapi: '3.0.0',
            info: { title: 'Test', version: '1.0.0' },
            paths: {
              '/test/{id}/': {
                get: {
                  operationId: 'get_test',
                  parameters: [
                    {
                      name: 'id',
                      in: 'path',
                      required: true,
                      schema: { type: 'integer' },
                    },
                  ],
                  responses: {
                    '200': {
                      description: 'OK',
                      content: {
                        'application/json': { schema: { type: 'object' } },
                      },
                    },
                  },
                },
              },
            },
          })
        )

        writeFileSync(
          newSchema,
          JSON.stringify({
            openapi: '3.0.0',
            info: { title: 'Test', version: '2.0.0' },
            paths: {
              '/test/{id}/': {
                get: {
                  operationId: 'get_test',
                  parameters: [
                    {
                      name: 'id',
                      in: 'path',
                      required: true,
                      schema: { type: 'string' },
                    },
                  ],
                  responses: {
                    '200': {
                      description: 'OK',
                      content: {
                        'application/json': { schema: { type: 'object' } },
                      },
                    },
                  },
                },
              },
            },
          })
        )

        const result = detectChanges(oldSchema, newSchema)
        expect(result).toBe('major')
      } finally {
        unlinkSync(oldSchema)
        unlinkSync(newSchema)
      }
    })

    it('handles response type changes as major', () => {
      const oldSchema = join(FIXTURES_DIR, 'response-type-old.json')
      const newSchema = join(FIXTURES_DIR, 'response-type-new.json')

      try {
        // Create schema where response changes from object to array
        writeFileSync(
          oldSchema,
          JSON.stringify({
            openapi: '3.0.0',
            info: { title: 'Test', version: '1.0.0' },
            paths: {
              '/test/': {
                get: {
                  operationId: 'get_test',
                  responses: {
                    '200': {
                      description: 'OK',
                      content: {
                        'application/json': { schema: { type: 'object' } },
                      },
                    },
                  },
                },
              },
            },
          })
        )

        writeFileSync(
          newSchema,
          JSON.stringify({
            openapi: '3.0.0',
            info: { title: 'Test', version: '2.0.0' },
            paths: {
              '/test/': {
                get: {
                  operationId: 'get_test',
                  responses: {
                    '200': {
                      description: 'OK',
                      content: {
                        'application/json': { schema: { type: 'array' } },
                      },
                    },
                  },
                },
              },
            },
          })
        )

        const result = detectChanges(oldSchema, newSchema)
        expect(result).toBe('major')
      } finally {
        unlinkSync(oldSchema)
        unlinkSync(newSchema)
      }
    })

    it('handles parameter required flag changes as major', () => {
      const oldSchema = join(FIXTURES_DIR, 'required-old.json')
      const newSchema = join(FIXTURES_DIR, 'required-new.json')

      try {
        // Create schema where optional parameter becomes required
        writeFileSync(
          oldSchema,
          JSON.stringify({
            openapi: '3.0.0',
            info: { title: 'Test', version: '1.0.0' },
            paths: {
              '/test/': {
                get: {
                  operationId: 'get_test',
                  parameters: [
                    {
                      name: 'filter',
                      in: 'query',
                      required: false,
                      schema: { type: 'string' },
                    },
                  ],
                  responses: {
                    '200': {
                      description: 'OK',
                      content: {
                        'application/json': { schema: { type: 'object' } },
                      },
                    },
                  },
                },
              },
            },
          })
        )

        writeFileSync(
          newSchema,
          JSON.stringify({
            openapi: '3.0.0',
            info: { title: 'Test', version: '2.0.0' },
            paths: {
              '/test/': {
                get: {
                  operationId: 'get_test',
                  parameters: [
                    {
                      name: 'filter',
                      in: 'query',
                      required: true,
                      schema: { type: 'string' },
                    },
                  ],
                  responses: {
                    '200': {
                      description: 'OK',
                      content: {
                        'application/json': { schema: { type: 'object' } },
                      },
                    },
                  },
                },
              },
            },
          })
        )

        const result = detectChanges(oldSchema, newSchema)
        expect(result).toBe('major')
      } finally {
        unlinkSync(oldSchema)
        unlinkSync(newSchema)
      }
    })
  })

  describe('Real-world Scenarios', () => {
    it('handles multiple simultaneous minor changes as minor', () => {
      // minor-schema.json has:
      // - New operation added (corporations)
      // - Optional parameter added (new_optional_param)
      // - Enum widened (serenity added)
      const baseSchema = join(FIXTURES_DIR, 'base-schema.json')
      const minorSchema = join(FIXTURES_DIR, 'minor-schema.json')
      const result = detectChanges(baseSchema, minorSchema)
      expect(result).toBe('minor')
    })

    it('handles multiple simultaneous major changes as major', () => {
      // major-schema.json has:
      // - Operation removed (universe/systems)
      // - Required parameter added (required_param)
      // - Enum narrowed (singularity removed)
      // - Response $ref changed (Alliance -> AllianceV2)
      const baseSchema = join(FIXTURES_DIR, 'base-schema.json')
      const majorSchema = join(FIXTURES_DIR, 'major-schema.json')
      const result = detectChanges(baseSchema, majorSchema)
      expect(result).toBe('major')
    })
  })
})
