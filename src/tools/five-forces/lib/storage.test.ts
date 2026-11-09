import { describe, expect, it } from 'vitest'
import { INDUSTRY_PRESETS } from '../data/industries'
import { createPresetAnalysis, editAssessment } from './analysis'
import {
  STORAGE_KEY,
  freshState,
  loadState,
  parseState,
  saveState,
  type StorageLike,
} from './storage'

const airlines = INDUSTRY_PRESETS.find((p) => p.id === 'us-airlines')!

function memoryStorage(initial: Record<string, string> = {}): StorageLike & {
  data: Record<string, string>
} {
  const data = { ...initial }
  return {
    data,
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => {
      data[key] = value
    },
  }
}

const throwingStorage: StorageLike = {
  getItem: () => {
    throw new Error('SecurityError')
  },
  setItem: () => {
    throw new Error('QuotaExceededError')
  },
}

describe('storage (SPEC §2.6)', () => {
  it('uses the namespaced key', () => {
    expect(STORAGE_KEY).toBe('agentic-marketing-toolkit:five-forces:v1')
  })

  it('round-trips the analysis and the current step', () => {
    const storage = memoryStorage()
    const state = { analysis: editAssessment(createPresetAnalysis(airlines), 'rivalry', { rating: 2 }), step: 4 }
    expect(saveState(state, storage)).toBe(true)
    expect(loadState(storage)).toEqual(state)
  })

  it('falls back to a fresh state when nothing is stored', () => {
    expect(loadState(memoryStorage())).toEqual(freshState())
  })

  it('falls back when storage is unavailable', () => {
    expect(loadState(null)).toEqual(freshState())
    expect(saveState(freshState(), null)).toBe(false)
  })

  it('falls back, without throwing, when storage throws', () => {
    expect(loadState(throwingStorage)).toEqual(freshState())
    expect(saveState(freshState(), throwingStorage)).toBe(false)
  })

  it.each([
    ['invalid JSON', '{not json'],
    ['a wrong version', JSON.stringify({ version: 2, analysis: {}, step: 0 })],
    ['a missing analysis', JSON.stringify({ version: 1, step: 0 })],
    ['a bad rating', JSON.stringify({ version: 1, step: 0, analysis: { ...createPresetAnalysis(airlines), assessments: { ...createPresetAnalysis(airlines).assessments, rivalry: { ...airlines.assessments.rivalry, rating: 9 } } } })],
    ['a missing force', JSON.stringify({ version: 1, step: 0, analysis: { ...createPresetAnalysis(airlines), assessments: {} } })],
    ['null', 'null'],
  ])('falls back to a fresh state on %s', (_label, raw) => {
    expect(loadState(memoryStorage({ [STORAGE_KEY]: raw }))).toEqual(freshState())
  })

  it('repairs small problems instead of discarding the analysis', () => {
    const analysis = createPresetAnalysis(airlines)
    const stored = {
      version: 1,
      step: 99,
      analysis: {
        ...analysis,
        presetId: 'a-preset-that-was-removed',
        assessments: {
          ...analysis.assessments,
          rivalry: { ...analysis.assessments.rivalry, driverIds: ['slow-industry-growth', 'not-a-driver'] },
        },
      },
    }
    const state = parseState(stored)
    expect(state?.step).toBe(0)
    expect(state?.analysis.presetId).toBeNull()
    expect(state?.analysis.assessments.rivalry.driverIds).toEqual(['slow-industry-growth'])
  })
})
