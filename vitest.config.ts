import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'dist/', 'src/test/']
    },
    testTimeout: 30000, // 30 seconds for live API calls
    hookTimeout: 30000
  }
})