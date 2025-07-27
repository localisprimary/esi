import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // environment: 'happy-dom',
    testTimeout: 30000, // 30 seconds for live API calls
    hookTimeout: 30000
  }
})
