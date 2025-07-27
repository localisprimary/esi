import fs from 'fs'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

export interface MethodInfo {
  name: string
  description: string
  apiExplorerUrl: string
}

/**
 * Generate README.md content with method table
 */
export function generateReadmeContent(methods: MethodInfo[]): string {
  const boilerplate = fs.readFileSync(
    path.join(__dirname, './static/boilerplate.md'),
    'utf8'
  )

  // Generate the methods table
  let methodsTable = `| Method | Description
|--------|-------------|
`
  const operationMethodRegex = /(post|get|put|patch|delete)/

  // Add each method to the table
  for (const method of methods.toSorted((a, b) =>
    a.name
      .replace(operationMethodRegex, '')
      .localeCompare(b.name.replace(operationMethodRegex, ''))
  )) {
    // Clean up description to prevent table formatting issues
    const cleanDescription = method.description
      .replace(/\n/g, '. ') // Replace newlines with spaces
      .replace(/\|/g, '\\|') // Escape pipe characters
      .trim()

    methodsTable += `| [\`${method.name}\`](${method.apiExplorerUrl}) | ${cleanDescription} |\n`
  }

  // Replace template placeholders in boilerplate
  const readme = boilerplate.replace(/{methodsTable}/g, methodsTable)

  return readme
}

/**
 * Write README.md file
 */
export function writeReadme(readmeContent: string, outputPath?: string): void {
  const readmePath = outputPath || path.join(__dirname, '../README.md')
  fs.writeFileSync(readmePath, readmeContent)
  console.log('Generated README.md')
}

/**
 * Main function to generate README from method information
 */
export function generateReadme(methods: MethodInfo[], outputPath?: string) {
  // Sort methods alphabetically by name
  const sortedMethods = methods.sort((a, b) => a.name.localeCompare(b.name))
  const readmeContent = generateReadmeContent(sortedMethods)
  writeReadme(readmeContent, outputPath)
}
