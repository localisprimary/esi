import { describe, expect, it } from 'vitest'
import { generateReadmeContent } from './generate-readme.ts'

describe('generateReadmeContent', () => {
  it('sorts methods and escapes descriptions for Markdown tables', () => {
    const readme = generateReadmeContent([
      {
        name: 'getZebra',
        description: 'Zebra | endpoint',
        apiExplorerUrl: 'https://example.test/zebra',
      },
      {
        name: 'getAlpha',
        description: 'First paragraph\n\nSecond paragraph',
        apiExplorerUrl: 'https://example.test/alpha',
      },
    ])

    expect(readme.indexOf('getAlpha')).toBeLessThan(readme.indexOf('getZebra'))
    expect(readme).toContain('Zebra \\| endpoint')
    expect(readme).toContain('First paragraph. Second paragraph')
  })

  it('keeps the mail example assignable to its generated params type', () => {
    expect(generateReadmeContent([])).toContain("subject: 'Test mail'")
  })
})
