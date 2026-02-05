import fs from 'fs'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

const HTTP_METHOD_PREFIX = /(post|get|put|patch|delete)/

export interface MethodInfo {
  name: string
  description: string
  apiExplorerUrl: string
}

function sortByResourceName(a: MethodInfo, b: MethodInfo): number {
  return a.name
    .replace(HTTP_METHOD_PREFIX, '')
    .localeCompare(b.name.replace(HTTP_METHOD_PREFIX, ''))
}

function escapeForMarkdownTable(description: string): string {
  return description
    .replace(/\.?\n\n/g, '. ')
    .replace(/\|/g, '\\|')
    .trim()
}

function buildMethodsTable(methods: MethodInfo[]): string {
  const sorted = methods.toSorted(sortByResourceName)

  const rows = sorted.map(method => {
    const description = escapeForMarkdownTable(method.description)
    return `| [\`${method.name}\`](${method.apiExplorerUrl}) | ${description} |`
  })

  return [
    '| Method | Description |',
    '|--------|-------------|',
    ...rows,
  ].join('\n') + '\n'
}

/**
 * Generate README.md content with method table.
 */
export function generateReadmeContent(methods: MethodInfo[]): string {
  const boilerplate = fs.readFileSync(
    path.join(__dirname, './static/boilerplate.md'),
    'utf8'
  )

  return boilerplate.replace(/{methodsTable}/g, buildMethodsTable(methods))
}

/**
 * Write README.md file.
 */
export function writeReadme(
  readmeContent: string,
  outputPath?: string
): void {
  const readmePath = outputPath || path.join(__dirname, '../README.md')
  fs.writeFileSync(readmePath, readmeContent)
  console.log('Generated README.md')
}

/**
 * Generate and write README from method information.
 */
export function generateReadme(
  methods: MethodInfo[],
  outputPath?: string
): void {
  const readmeContent = generateReadmeContent(methods)
  writeReadme(readmeContent, outputPath)
}
