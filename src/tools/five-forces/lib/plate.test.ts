import { describe, expect, it } from 'vitest'
import { FORCE_ORDER } from '../data/forces'
import { createBlankAnalysis, createPresetAnalysis, findPreset } from './analysis'
import type { Rating } from '../types'
import {
  IMPLICATIONS_PANEL_STEP,
  arrowWeight,
  figureNumber,
  hatchGap,
  panelToStep,
  plateLabel,
  plateViewFromSubpath,
  stepToPanel,
} from './plate'

const RATINGS: Rating[] = [1, 2, 3, 4, 5]

describe('plateViewFromSubpath (SPEC §2.1)', () => {
  it('opens the Summary only for "summary"', () => {
    expect(plateViewFromSubpath('summary')).toBe('summary')
    expect(plateViewFromSubpath('/Summary/')).toBe('summary')
  })

  it('opens the Plate for the default, the old view names, and anything unknown', () => {
    for (const subpath of ['', 'learn', 'analyze', 'nope', 'summary/extra']) {
      expect(plateViewFromSubpath(subpath)).toBe('plate')
    }
  })
})

describe('panel ⇄ step (SPEC §2.6)', () => {
  it('round-trips every force and implications', () => {
    FORCE_ORDER.forEach((forceId, i) => {
      expect(panelToStep({ kind: 'force', forceId })).toBe(i + 1)
      expect(stepToPanel(i + 1)).toEqual({ kind: 'force', forceId })
    })
    expect(panelToStep({ kind: 'implications' })).toBe(IMPLICATIONS_PANEL_STEP)
    expect(stepToPanel(IMPLICATIONS_PANEL_STEP)).toEqual({ kind: 'implications' })
  })

  it('stores the key and the profile as 0, and opens the key for anything out of range', () => {
    expect(panelToStep({ kind: 'key' })).toBe(0)
    expect(panelToStep({ kind: 'profile' })).toBe(0)
    for (const step of [0, -1, 7, 2.5, Number.NaN]) {
      expect(stepToPanel(step)).toEqual({ kind: 'key' })
    }
  })
})

describe('drawing scales (SPEC §2.2)', () => {
  it('arrow weight strictly increases with the rating', () => {
    const weights = RATINGS.map(arrowWeight)
    expect(weights[0]).toBe(0.8)
    expect(weights[4]).toBe(7.4)
    weights.slice(1).forEach((w, i) => expect(w).toBeGreaterThan(weights[i]))
  })

  it('hatching gets denser as the rating rises', () => {
    const gaps = RATINGS.map(hatchGap)
    gaps.slice(1).forEach((g, i) => expect(g).toBeLessThan(gaps[i]))
  })

  it('numbers the figures in the standard force order', () => {
    expect(figureNumber('rivalry')).toBe('1.1')
    expect(figureNumber('substitutes')).toBe('1.5')
  })
})

describe('plateLabel', () => {
  it('names every force with its rating, or "not rated"', () => {
    const airlines = createPresetAnalysis(findPreset('us-airlines')!)
    const label = plateLabel('U.S. passenger airlines', airlines)
    expect(label).toContain('Competitive rivalry 5 of 5')
    expect(plateLabel('Untitled industry', createBlankAnalysis())).toContain('Threat of substitutes not rated')
  })
})
