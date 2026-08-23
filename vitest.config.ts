import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      exclude: ['scripts/*.test.ts', 'src/test/**', 'src/types.ts'],
      include: [
        'scripts/generate.ts',
        'scripts/generate-readme.ts',
        'src/cache.ts',
        'src/client.ts',
      ],
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      thresholds: {
        branches: 35,
        functions: 12,
        lines: 20,
        statements: 20,
      },
    },
    testTimeout: 30000, // 30 seconds for live API calls
    hookTimeout: 30000,
    retry: 3,
  },
})
