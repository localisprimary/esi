import fs from 'fs'
import path from 'path'

const SCHEMA_URL = 'https://esi.evetech.net/meta/openapi.json'
const __dirname = path.dirname(new URL(import.meta.url).pathname)
const SCHEMA_FILE = path.join(__dirname, './static/openapi.json')

async function fetchSchema(): Promise<void> {
  console.log('Fetching OpenAPI schema from ESI...')

  try {
    const response = await fetch(SCHEMA_URL)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const text = await response.text()

    // Validate it's valid JSON
    JSON.parse(text)

    fs.writeFileSync(SCHEMA_FILE, text)

    console.log(`Schema saved to: ${SCHEMA_FILE}`)
  } catch (error) {
    console.error('Error fetching schema:', error)
    process.exit(1)
  }
}

fetchSchema()
