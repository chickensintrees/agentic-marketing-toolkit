// Registry integrity: the safety net for pull requests that add tools.
// See SPEC.md §6. If this fails, the message says which tool or folder is
// out of line with the tool contract (SPEC.md §3).

import { describe, expect, it } from 'vitest'
import { TOOLS } from './index'
import type { ToolDefinition } from './types'
import { WANTED_TOOLS } from './wanted'

const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

// What exists on disk, found at test time. Keys look like './five-forces/index.ts'.
const toolModules = import.meta.glob<{ tool?: ToolDefinition }>('./*/index.ts', { eager: true })
const specFiles = Object.keys(import.meta.glob('./*/SPEC.md', { query: '?raw' }))
const testFiles = Object.keys(import.meta.glob('./*/**/*.test.{ts,tsx}'))

/** './five-forces/index.ts' → 'five-forces' */
function folderOf(path: string): string {
  return path.split('/')[1] ?? ''
}

const toolFolders = Object.keys(toolModules).map(folderOf)
const registeredIds = TOOLS.map((tool) => tool.id)

describe('tool registry (SPEC §3.3, §6)', () => {
  it('registers at least one tool', () => {
    expect(TOOLS.length).toBeGreaterThan(0)
  })

  it('has unique tool ids', () => {
    expect(new Set(registeredIds).size).toBe(registeredIds.length)
  })

  it.each(registeredIds)('tool id "%s" is kebab-case', (id) => {
    expect(id).toMatch(KEBAB_CASE)
  })

  it.each(TOOLS.map((tool) => [tool.id, tool] as const))(
    'tool "%s" has a name, a tagline, and a component',
    (_id, tool) => {
      expect(tool.name.trim()).not.toBe('')
      expect(tool.tagline.trim()).not.toBe('')
      expect(tool.Component).toBeTypeOf('function')
    },
  )

  it.each(Object.entries(toolModules))(
    '%s exports `tool` with an id equal to its folder name',
    (path, module) => {
      expect(module.tool, `${path} must export \`tool\``).toBeDefined()
      expect(module.tool?.id).toBe(folderOf(path))
    },
  )

  it.each(toolFolders)('folder "%s" is registered in TOOLS', (folder) => {
    expect(registeredIds, `add src/tools/${folder} to TOOLS in src/tools/index.ts`).toContain(
      folder,
    )
  })

  it.each(registeredIds)('registered tool "%s" has a folder with index.ts', (id) => {
    expect(toolFolders).toContain(id)
  })

  it.each(registeredIds)('tool "%s" has a SPEC.md', (id) => {
    expect(specFiles, `add src/tools/${id}/SPEC.md`).toContain(`./${id}/SPEC.md`)
  })

  it.each(registeredIds)('tool "%s" has at least one test file', (id) => {
    const own = testFiles.filter((path) => folderOf(path) === id)
    expect(own.length, `add a *.test.ts(x) file under src/tools/${id}/`).toBeGreaterThan(0)
  })
})

describe('wanted tools (SPEC §3.3)', () => {
  const wantedIds = WANTED_TOOLS.map((tool) => tool.id)

  it('lists the wanted tools with names and one-line pitches', () => {
    expect(WANTED_TOOLS.length).toBeGreaterThan(0)
    for (const tool of WANTED_TOOLS) {
      expect(tool.name.trim()).not.toBe('')
      expect(tool.pitch.trim()).not.toBe('')
      expect(tool.pitch).not.toMatch(/\n/)
    }
  })

  it('has unique, kebab-case ids', () => {
    expect(new Set(wantedIds).size).toBe(wantedIds.length)
    for (const id of wantedIds) expect(id).toMatch(KEBAB_CASE)
  })

  it('does not list a tool that is already registered', () => {
    for (const id of wantedIds) {
      expect(registeredIds, `"${id}" is built: remove it from WANTED_TOOLS`).not.toContain(id)
    }
  })
})
