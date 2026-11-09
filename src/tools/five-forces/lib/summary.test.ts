import { describe, expect, it } from 'vitest'
import { INDUSTRY_PRESETS } from '../data/industries'
import { createBlankAnalysis, createPresetAnalysis, editAssessment } from './analysis'
import { chartDescription, comparisonRows, formatDifference, ratingsInOrder } from './summary'

const airlines = INDUSTRY_PRESETS.find((p) => p.id === 'us-airlines')!
const streaming = INDUSTRY_PRESETS.find((p) => p.id === 'video-streaming')!

describe('summary helpers', () => {
  it('lists ratings in the standard order', () => {
    expect(ratingsInOrder(airlines.assessments)).toEqual([5, 3, 4, 4, 3])
    expect(ratingsInOrder(createBlankAnalysis().assessments)).toEqual([null, null, null, null, null])
  })

  it('builds comparison rows with differences', () => {
    const rows = comparisonRows(createPresetAnalysis(airlines), streaming)
    expect(rows.map((r) => [r.rating, r.comparison, r.difference])).toEqual([
      [5, 4, 1],
      [3, 3, 0],
      [4, 4, 0],
      [4, 3, 1],
      [3, 4, -1],
    ])
  })

  it('has no comparison or difference without a comparison preset or rating', () => {
    const rows = comparisonRows(editAssessment(createBlankAnalysis(), 'rivalry', { rating: 2 }), null)
    expect(rows[0]).toMatchObject({ rating: 2, comparison: null, difference: null })
  })

  it('formats differences with a sign', () => {
    expect(formatDifference(2)).toBe('+2')
    expect(formatDifference(0)).toBe('0')
    expect(formatDifference(-1)).toBe('−1')
    expect(formatDifference(null)).toBe('—')
  })

  it('describes the chart in words, including unrated forces and the comparison', () => {
    const analysis = editAssessment(createBlankAnalysis(), 'rivalry', { rating: 4 })
    expect(chartDescription('Craft beer', analysis, null)).toBe(
      'Radar chart of force ratings from 0 to 5 for Craft beer: Competitive rivalry 4, Threat of new entrants not rated, Supplier power not rated, Buyer power not rated, Threat of substitutes not rated.',
    )
    expect(chartDescription('Craft beer', analysis, streaming)).toContain(
      'Compared with Subscription video streaming (illustrative example): Competitive rivalry 4, Threat of new entrants 3',
    )
  })
})
