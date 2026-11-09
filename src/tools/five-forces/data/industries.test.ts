// Preset integrity: the safety net for student pull requests that add an
// industry. See this tool's SPEC.md §3.3 and §5. If a test fails, its
// message names the preset and the problem.

import { describe, expect, it } from 'vitest'
import type { IndustryPreset } from '../types'
import { FORCES } from './forces'
import { INDUSTRY_PRESETS } from './industries'

const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

// Every preset file on disk, e.g. './industries/us-airlines.ts'.
const presetFiles = import.meta.glob<{ default: IndustryPreset }>(
  ['./industries/*.ts', '!./industries/index.ts'],
  { eager: true },
)

/** './industries/us-airlines.ts' → 'us-airlines' */
const fileId = (path: string) => path.replace(/^.*\//, '').replace(/\.ts$/, '')

describe('industry presets', () => {
  it('ships at least the five version 1 presets, in order', () => {
    expect(INDUSTRY_PRESETS.slice(0, 5).map((p) => p.id)).toEqual([
      'us-airlines',
      'video-streaming',
      'coffee-shops',
      'soft-drinks',
      'whitewater-rafting',
    ])
  })

  it('has unique, kebab-case preset ids', () => {
    const ids = INDUSTRY_PRESETS.map((p) => p.id)
    const repeated = ids.filter((id, i) => ids.indexOf(id) !== i)
    expect(repeated, `two presets share the id ${repeated.join(', ')}`).toEqual([])
    for (const id of ids) {
      expect(id, `"${id}" must be kebab-case: lowercase words joined by hyphens`).toMatch(KEBAB_CASE)
    }
  })

  it.each(Object.entries(presetFiles))('%s default-exports a preset whose id is its file name', (path, module) => {
    expect(module.default, `${path} needs \`export default preset\``).toBeDefined()
    expect(module.default.id, `${path}: id must be "${fileId(path)}", the file name`).toBe(fileId(path))
  })

  it.each(Object.entries(presetFiles))('%s is registered in INDUSTRY_PRESETS', (path, module) => {
    expect(
      INDUSTRY_PRESETS,
      `import ${fileId(path)} in data/industries/index.ts and add it to INDUSTRY_PRESETS`,
    ).toContain(module.default)
  })

  it('has a file for every registered preset', () => {
    const fileIds = Object.keys(presetFiles).map(fileId)
    for (const preset of INDUSTRY_PRESETS) {
      expect(fileIds, `${preset.id} needs its own file, data/industries/${preset.id}.ts`).toContain(preset.id)
    }
  })

  describe.each(INDUSTRY_PRESETS.map((p) => [p.id, p] as const))('%s', (_id, preset) => {
    it('has a name, a scope, and a description', () => {
      expect(preset.profile.name.trim(), `${preset.id}: profile.name is empty`).not.toBe('')
      expect(preset.profile.scope.trim(), `${preset.id}: profile.scope is empty`).not.toBe('')
      expect(preset.profile.description.trim(), `${preset.id}: profile.description is empty`).not.toBe('')
    })

    it('has exactly the five assessments', () => {
      expect(
        Object.keys(preset.assessments).sort(),
        `${preset.id}: assessments needs exactly ${FORCES.map((f) => f.id).join(', ')}`,
      ).toEqual(FORCES.map((f) => f.id).sort())
    })

    it.each(FORCES.map((f) => [f.name, f] as const))('%s is complete and valid', (_name, force) => {
      const a = preset.assessments[force.id]
      const where = `${preset.id} › ${force.id}`
      expect([1, 2, 3, 4, 5], `${where}: rating must be 1, 2, 3, 4 or 5`).toContain(a.rating)
      const count = `${where}: driverIds needs 2–4 ids (it has ${a.driverIds.length})`
      expect(a.driverIds.length, count).toBeGreaterThanOrEqual(2)
      expect(a.driverIds.length, count).toBeLessThanOrEqual(4)
      expect(new Set(a.driverIds).size, `${where}: driverIds lists the same id twice`).toBe(
        a.driverIds.length,
      )
      const known = force.drivers.map((d) => d.id)
      for (const id of a.driverIds) {
        expect(known, `${where}: "${id}" is not a driver of ${force.name} in data/forces.ts`).toContain(id)
      }
      expect(a.rationale.trim(), `${where}: rationale is empty; write 2–4 sentences`).not.toBe('')
      expect(a.evidence, `${where}: evidence must be 'illustrative'`).toBe('illustrative')
      expect(a.source, `${where}: source must be '' (empty)`).toBe('')
    })
  })
})
