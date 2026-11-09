import { describe, expect, it } from 'vitest'
import { INDUSTRY_PRESETS } from '../data/industries'
import type { Rating } from '../types'
import {
  EXTENT,
  OUTER_FORCES,
  diagramDescription,
  lineWeight,
  outerCenter,
  outerDistance,
  outerHalfSize,
  presetRatings,
  ringRadius,
  rivalryRadius,
} from './diagram'

const RATINGS: Rating[] = [1, 2, 3, 4, 5]

describe('force diagram geometry', () => {
  it('a stronger force sits closer, is larger, and has a heavier line', () => {
    for (let i = 1; i < RATINGS.length; i++) {
      const weaker = RATINGS[i - 1]
      const stronger = RATINGS[i]
      expect(outerDistance(stronger)).toBeLessThan(outerDistance(weaker))
      expect(outerHalfSize(stronger)).toBeGreaterThan(outerHalfSize(weaker))
      expect(lineWeight(stronger)).toBeGreaterThan(lineWeight(weaker))
      expect(rivalryRadius(stronger)).toBeGreaterThan(rivalryRadius(weaker))
    }
  })

  it('outer forces sit on the ring for their rating', () => {
    for (const r of RATINGS) expect(outerDistance(r)).toBe(ringRadius(r))
  })

  it('unrated forces sit on the outer ring with no line', () => {
    expect(outerDistance(null)).toBe(ringRadius(1))
    expect(lineWeight(null)).toBe(0)
  })

  it('shapes never overlap the rivalry disc and stay inside the drawing', () => {
    for (const r of RATINGS) {
      for (const q of RATINGS) {
        expect(outerDistance(r) - outerHalfSize(r)).toBeGreaterThan(rivalryRadius(q))
      }
      expect(outerDistance(r) + outerHalfSize(r)).toBeLessThan(EXTENT - 40)
    }
  })

  it('places each outer force on its own axis', () => {
    expect(outerCenter('newEntrants', 3)).toEqual({ x: 0, y: -ringRadius(3) })
    expect(outerCenter('substitutes', 3).y).toBeGreaterThan(0)
    expect(outerCenter('supplierPower', 3).x).toBeLessThan(0)
    expect(outerCenter('buyerPower', 3).x).toBeGreaterThan(0)
    expect(OUTER_FORCES).toHaveLength(4)
  })

  it('describes every rating, and the comparison, in words', () => {
    const [airlines, streaming] = INDUSTRY_PRESETS
    const ratings = { ...presetRatings(airlines), buyerPower: null }
    const text = diagramDescription('Airlines', ratings, streaming)
    expect(text).toContain('Competitive rivalry 5')
    expect(text).toContain('Buyer power not rated')
    expect(text).toContain(`Compared with ${streaming.profile.name}`)
  })
})
