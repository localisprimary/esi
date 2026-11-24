import fs from 'fs'
import { pathToFileURL } from 'url'

export interface EnumChange {
  path: string
  added: string[]
  removed: string[]
}

const DECLARATION = /^export (?:type|interface) (\w+)/
const PROPERTY = /^(\s*)(\w+)\??:(.*)$/
const UNION_MEMBER = /^\s*\|(.*)$/
const STRING_LITERAL = /'((?:[^'\\]|\\.)*)'/g

function literals(text: string): string[] {
  return [...text.matchAll(STRING_LITERAL)].map(match => match[1] ?? '')
}

/**
 * Collect the string-literal union members of every type and property in a
 * generated `types.ts`, keyed by `TypeName.property.nested` path.
 */
export function extractEnums(source: string): Map<string, Set<string>> {
  const enums = new Map<string, Set<string>>()
  let typeName = ''
  let stack: { indent: number; key: string }[] = []

  const currentPath = (): string =>
    [typeName, ...stack.map(entry => entry.key)].join('.')

  const add = (values: string[]): void => {
    if (!typeName || values.length === 0) return
    const key = currentPath()
    const set = enums.get(key) ?? new Set<string>()
    for (const value of values) set.add(value)
    enums.set(key, set)
  }

  for (const line of source.split('\n')) {
    const declaration = DECLARATION.exec(line)
    if (declaration) {
      typeName = declaration[1] ?? ''
      stack = []
      add(literals(line.slice(line.indexOf('=') + 1)))
      continue
    }

    const property = PROPERTY.exec(line)
    if (property) {
      const indent = property[1]?.length ?? 0
      stack = stack.filter(entry => entry.indent < indent)
      stack.push({ indent, key: property[2] ?? '' })
      add(literals(property[3] ?? ''))
      continue
    }

    const member = UNION_MEMBER.exec(line)
    if (member) add(literals(member[1] ?? ''))
  }

  return enums
}

/**
 * Report value changes for string-literal unions present in both sources.
 * Unions that only exist on one side belong to added or removed types and
 * properties, so they are not reported here.
 */
export function diffEnums(oldSource: string, newSource: string): EnumChange[] {
  const oldEnums = extractEnums(oldSource)
  const newEnums = extractEnums(newSource)
  const changes: EnumChange[] = []

  for (const [path, newValues] of newEnums) {
    const oldValues = oldEnums.get(path)
    if (!oldValues) continue
    const added = [...newValues].filter(value => !oldValues.has(value))
    const removed = [...oldValues].filter(value => !newValues.has(value))
    if (added.length > 0 || removed.length > 0) {
      changes.push({ path, added: added.sort(), removed: removed.sort() })
    }
  }

  return changes.sort((a, b) => a.path.localeCompare(b.path))
}

export function formatEnumChanges(changes: EnumChange[]): string {
  const lines = [`### Enum value changes (${changes.length})`, '']
  if (changes.length === 0) {
    lines.push('_None_')
  }
  for (const change of changes) {
    lines.push(`- \`${change.path}\``)
    for (const value of change.added) lines.push(`  - Added \`'${value}'\``)
    for (const value of change.removed) lines.push(`  - Removed \`'${value}'\``)
  }
  return lines.join('\n') + '\n'
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const [oldFile, newFile] = process.argv.slice(2)
  if (!oldFile || !newFile) {
    console.error(
      'Usage: node scripts/summarize-enum-changes.ts <old-types.ts> <new-types.ts>'
    )
    process.exit(1)
  }
  process.stdout.write(
    formatEnumChanges(
      diffEnums(
        fs.readFileSync(oldFile, 'utf8'),
        fs.readFileSync(newFile, 'utf8')
      )
    )
  )
}
