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
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) expect(id).toMatch(KEBAB_CASE)
  })

  it.each(Object.entries(presetFiles))('%s default-exports a preset whose id is its file name', (path, module) => {
    expect(module.default, `${path} needs \`export default preset\``).toBeDefined()
    expect(module.default.id).toBe(fileId(path))
  })

  it.each(Object.entries(presetFiles))('%s is registered in INDUSTRY_PRESETS', (path, module) => {
    expect(
      INDUSTRY_PRESETS,
      `import ${fileId(path)} in data/industries/index.ts and add it to INDUSTRY_PRESETS`,
    ).toContain(module.default)
  })

  it('has a file for every registered preset', () => {
    const fileIds = Object.keys(presetFiles).map(fileId)
    for (const preset of INDUSTRY_PRESETS) expect(fileIds).toContain(preset.id)
  })

  describe.each(INDUSTRY_PRESETS.map((p) => [p.id, p] as const))('%s', (_id, preset) => {
    it('has a name, a scope, and a description', () => {
      expect(preset.profile.name.trim()).not.toBe('')
      expect(preset.profile.scope.trim()).not.toBe('')
      expect(preset.profile.description.trim()).not.toBe('')
    })

    it('has exactly the five assessments', () => {
      expect(Object.keys(preset.assessments).sort()).toEqual(FORCES.map((f) => f.id).sort())
    })

    it.each(FORCES.map((f) => [f.name, f] as const))('%s is complete and valid', (_name, force) => {
      const a = preset.assessments[force.id]
      expect([1, 2, 3, 4, 5]).toContain(a.rating)
      expect(a.driverIds.length).toBeGreaterThanOrEqual(2)
      expect(a.driverIds.length).toBeLessThanOrEqual(4)
      expect(new Set(a.driverIds).size).toBe(a.driverIds.length)
      const known = force.drivers.map((d) => d.id)
      for (const id of a.driverIds) {
        expect(known, `"${id}" is not a driver of ${force.name} in data/forces.ts`).toContain(id)
      }
      expect(a.rationale.trim()).not.toBe('')
      expect(a.evidence).toBe('illustrative')
      expect(a.source).toBe('')
    })
  })
})
