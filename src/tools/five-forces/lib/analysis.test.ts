import { describe, expect, it } from 'vitest'
import { INDUSTRY_PRESETS } from '../data/industries'
import type { Analysis, ForceId, Rating } from '../types'
import {
  IMPLICATIONS_STEP,
  STEP_COUNT,
  canBeIllustrative,
  createBlankAnalysis,
  createPresetAnalysis,
  editAssessment,
  evidenceLabel,
  evidenceSummary,
  evidenceSummaryParts,
  hasUserInput,
  isStepComplete,
  meanRating,
  overallStructure,
  ratedCount,
  ratingLabel,
  setEvidence,
  setSource,
  strongestForces,
  structureLabel,
  toggleDriver,
  updateImplications,
  updateProfile,
} from './analysis'

const airlines = INDUSTRY_PRESETS.find((p) => p.id === 'us-airlines')!

/** A blank analysis with the given ratings, in the standard force order. */
function withRatings(...ratings: (Rating | null)[]): Analysis {
  const ids: ForceId[] = ['rivalry', 'newEntrants', 'supplierPower', 'buyerPower', 'substitutes']
  return ids.reduce(
    (analysis, id, i) => editAssessment(analysis, id, { rating: ratings[i] ?? null }),
    createBlankAnalysis(),
  )
}

describe('creating analyses', () => {
  it('starts blank: custom industry, nothing rated', () => {
    const blank = createBlankAnalysis()
    expect(blank.presetId).toBeNull()
    expect(ratedCount(blank)).toBe(0)
    expect(blank.assessments.rivalry.evidence).toBe('assumption')
  })

  it('loads a preset as an independent copy with illustrative evidence', () => {
    const analysis = createPresetAnalysis(airlines)
    expect(analysis.presetId).toBe('us-airlines')
    expect(analysis.profile).toEqual(airlines.profile)
    expect(ratedCount(analysis)).toBe(5)
    for (const a of Object.values(analysis.assessments)) expect(a.evidence).toBe('illustrative')
    analysis.assessments.rivalry.driverIds.push('slow-industry-growth')
    expect(airlines.assessments.rivalry.driverIds).not.toContain('slow-industry-growth')
  })
})

describe('evidence auto-switch (SPEC §2.3)', () => {
  it('turns an illustrative assessment into an assumption when the rating changes', () => {
    const next = editAssessment(createPresetAnalysis(airlines), 'buyerPower', { rating: 2 })
    expect(next.assessments.buyerPower.rating).toBe(2)
    expect(next.assessments.buyerPower.evidence).toBe('assumption')
    expect(next.assessments.rivalry.evidence).toBe('illustrative')
  })

  it('switches on rationale edits and on driver changes', () => {
    const start = createPresetAnalysis(airlines)
    expect(
      editAssessment(start, 'rivalry', { rationale: 'Mine.' }).assessments.rivalry.evidence,
    ).toBe('assumption')
    expect(toggleDriver(start, 'rivalry', 'slow-industry-growth').assessments.rivalry.evidence).toBe(
      'assumption',
    )
  })

  it('does not switch when an edit leaves the values unchanged', () => {
    const start = createPresetAnalysis(airlines)
    const same = editAssessment(start, 'rivalry', { rating: airlines.assessments.rivalry.rating })
    expect(same.assessments.rivalry.evidence).toBe('illustrative')
  })

  it('leaves sourced and assumption evidence alone', () => {
    const sourced = setEvidence(createBlankAnalysis(), 'rivalry', 'sourced')
    expect(editAssessment(sourced, 'rivalry', { rating: 4 }).assessments.rivalry.evidence).toBe(
      'sourced',
    )
  })

  it('offers "illustrative" only while a force still holds its preset values', () => {
    const start = createPresetAnalysis(airlines)
    expect(canBeIllustrative(start, 'rivalry')).toBe(true)
    const edited = editAssessment(start, 'rivalry', { rating: 1 })
    expect(canBeIllustrative(edited, 'rivalry')).toBe(false)
    const reverted = editAssessment(edited, 'rivalry', { rating: airlines.assessments.rivalry.rating })
    expect(canBeIllustrative(reverted, 'rivalry')).toBe(true)
    expect(canBeIllustrative(createBlankAnalysis(), 'rivalry')).toBe(false)
  })

  it('reports "sourced" without a source as a missing source', () => {
    const sourced = setEvidence(withRatings(3), 'rivalry', 'sourced')
    expect(evidenceLabel(sourced.assessments.rivalry)).toBe('Assumption (source missing)')
    const cited = setSource(sourced, 'rivalry', 'Industry report, 2026')
    expect(evidenceLabel(cited.assessments.rivalry)).toBe('Supported by a source')
  })
})

describe('drivers', () => {
  it('keeps ticked drivers in the force’s own order', () => {
    let analysis = createBlankAnalysis()
    analysis = toggleDriver(analysis, 'rivalry', 'perishable-product')
    analysis = toggleDriver(analysis, 'rivalry', 'slow-industry-growth')
    expect(analysis.assessments.rivalry.driverIds).toEqual([
      'slow-industry-growth',
      'perishable-product',
    ])
    analysis = toggleDriver(analysis, 'rivalry', 'perishable-product')
    expect(analysis.assessments.rivalry.driverIds).toEqual(['slow-industry-growth'])
  })
})

describe('strongest forces', () => {
  it('is empty until something is rated', () => {
    expect(strongestForces(createBlankAnalysis())).toEqual([])
  })

  it('returns the single highest-rated force', () => {
    expect(strongestForces(withRatings(2, 5, 3, null, 1))).toEqual(['newEntrants'])
  })

  it('returns every force tied for the highest rating, in standard order', () => {
    expect(strongestForces(withRatings(4, 2, 4, 1, 4))).toEqual([
      'rivalry',
      'supplierPower',
      'substitutes',
    ])
  })
})

describe('overall structure (SPEC §2.4)', () => {
  it.each([
    [1, 'Favorable structure'],
    [2.0, 'Favorable structure'],
    [2.2, 'Mixed structure'],
    [3.4, 'Mixed structure'],
    [3.6, 'Challenging structure'],
    [5, 'Challenging structure'],
  ] as const)('mean %d → %s', (mean, label) => {
    expect(structureLabel(mean)).toBe(label)
  })

  it('handles the boundaries exactly with real five-force means', () => {
    // 10 / 5 = 2.0 and 17 / 5 = 3.4 (which is 3.4000000000000004 in floating point).
    expect(overallStructure(withRatings(2, 2, 2, 2, 2))?.label).toBe('Favorable structure')
    expect(overallStructure(withRatings(3, 3, 4, 4, 3))?.label).toBe('Mixed structure')
    expect(overallStructure(withRatings(3, 4, 4, 4, 3))?.label).toBe('Challenging structure')
  })

  it('is hidden until all five forces are rated', () => {
    expect(overallStructure(withRatings(5, 5, 5, 5, null))).toBeNull()
    expect(meanRating(withRatings(5, 3, null, null, null))).toBe(4)
    expect(meanRating(createBlankAnalysis())).toBeNull()
  })
})

describe('completion', () => {
  it('counts rated forces', () => {
    expect(ratedCount(withRatings(1, null, 3, null, null))).toBe(2)
  })

  it('tracks step completion for the industry, force, and implications steps', () => {
    let analysis = createBlankAnalysis()
    expect(STEP_COUNT).toBe(7)
    expect(isStepComplete(analysis, 0)).toBe(false)
    analysis = updateProfile(analysis, { name: 'Craft beer', scope: 'U.S. craft breweries' })
    expect(isStepComplete(analysis, 0)).toBe(true)
    expect(isStepComplete(analysis, 1)).toBe(false)
    analysis = editAssessment(analysis, 'rivalry', { rating: 4 })
    expect(isStepComplete(analysis, 1)).toBe(true)
    expect(isStepComplete(analysis, IMPLICATIONS_STEP)).toBe(false)
    analysis = updateImplications(analysis, { keyForces: 'Rivalry.', response: 'Differentiate.' })
    expect(isStepComplete(analysis, IMPLICATIONS_STEP)).toBe(true)
  })
})

describe('user input detection (switching industry)', () => {
  it('is false for a fresh blank or a freshly loaded preset', () => {
    expect(hasUserInput(createBlankAnalysis())).toBe(false)
    expect(hasUserInput(createPresetAnalysis(airlines))).toBe(false)
  })

  it.each([
    ['a rating', (a: Analysis) => editAssessment(a, 'rivalry', { rating: 1 })],
    ['a rationale', (a: Analysis) => editAssessment(a, 'rivalry', { rationale: 'x' })],
    ['a ticked driver', (a: Analysis) => toggleDriver(a, 'rivalry', 'slow-industry-growth')],
    ['implications text', (a: Analysis) => updateImplications(a, { keyForces: 'x' })],
    ['a profile edit', (a: Analysis) => updateProfile(a, { name: 'Mine' })],
  ])('is true after %s', (_label, change) => {
    expect(hasUserInput(change(createBlankAnalysis()))).toBe(true)
    expect(hasUserInput(change(createPresetAnalysis(airlines)))).toBe(true)
  })
})

describe('labels and evidence summary', () => {
  it('formats ratings', () => {
    expect(ratingLabel(4)).toBe('4 – High')
    expect(ratingLabel(null)).toBe('Not rated')
  })

  it('summarizes evidence like "3 illustrative · 1 assumption · 1 sourced"', () => {
    let analysis = createPresetAnalysis(airlines)
    analysis = editAssessment(analysis, 'rivalry', { rating: 4 })
    analysis = setSource(setEvidence(analysis, 'buyerPower', 'sourced'), 'buyerPower', 'A study')
    expect(evidenceSummaryParts(evidenceSummary(analysis))).toEqual([
      '3 illustrative',
      '1 assumption',
      '1 sourced',
    ])
  })

  it('counts missing sources and unrated forces', () => {
    const analysis = setEvidence(withRatings(3, 2), 'rivalry', 'sourced')
    expect(evidenceSummaryParts(evidenceSummary(analysis))).toEqual([
      '1 assumption',
      '1 source missing',
      '3 not rated',
    ])
  })
})
