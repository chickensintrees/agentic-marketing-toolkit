// Framework content integrity. See this tool's SPEC.md §3.2 and §5.

import { describe, expect, it } from 'vitest'
import type { ForceId } from '../types'
import { FACTORS_NOT_FORCES, FORCES, FORCE_ORDER, SHORT_NAMES, SOURCES, getForce } from './forces'

const STANDARD_ORDER: ForceId[] = [
  'rivalry',
  'newEntrants',
  'supplierPower',
  'buyerPower',
  'substitutes',
]
const KEBAB_CASE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

describe('FORCES', () => {
  it('lists the five forces in the standard order', () => {
    expect(FORCES.map((f) => f.id)).toEqual(STANDARD_ORDER)
    expect([...FORCE_ORDER]).toEqual(STANDARD_ORDER)
  })

  it('has unique force ids', () => {
    expect(new Set(FORCES.map((f) => f.id)).size).toBe(5)
  })

  it.each(FORCES.map((f) => [f.id, f] as const))('%s has complete content', (_id, force) => {
    expect(force.name.trim()).not.toBe('')
    expect(force.question.trim()).toMatch(/\?$/)
    expect(force.summary.trim()).not.toBe('')
    expect(force.highWhen.length).toBeGreaterThan(0)
    expect(force.lowWhen.length).toBeGreaterThan(0)
    expect(force.example.trim()).not.toBe('')
    expect(force.misconception.trim()).not.toBe('')
    expect(SHORT_NAMES[force.id].trim()).not.toBe('')
  })

  it.each(FORCES.map((f) => [f.id, f] as const))('%s has 4–9 well-formed drivers', (_id, force) => {
    expect(force.drivers.length).toBeGreaterThanOrEqual(4)
    expect(force.drivers.length).toBeLessThanOrEqual(9)
    const ids = force.drivers.map((d) => d.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const driver of force.drivers) {
      expect(driver.id).toMatch(KEBAB_CASE)
      expect(driver.label.trim()).not.toBe('')
      // The Markdown export lists driver labels separated by commas.
      expect(driver.label).not.toContain(',')
      expect(driver.description.trim()).not.toBe('')
    }
  })

  it('looks forces up by id', () => {
    expect(getForce('buyerPower').name).toBe('Buyer power')
  })
})

describe('faithfulness to Porter (2008)', () => {
  const driverIds = (id: ForceId) => getForce(id).drivers.map((d) => d.id)

  it('covers all five intensity conditions and four price-competition conditions for rivalry', () => {
    expect(driverIds('rivalry')).toEqual([
      'numerous-or-balanced-competitors',
      'slow-industry-growth',
      'high-exit-barriers',
      'commitment-beyond-economics',
      'cannot-read-signals',
      'similar-products-low-switching',
      'high-fixed-low-marginal-costs',
      'large-capacity-increments',
      'perishable-product',
    ])
  })

  it('lists the seven entry barriers, then expected retaliation separately', () => {
    const ids = driverIds('newEntrants')
    expect(ids).toHaveLength(8)
    expect(ids.at(-1)).toBe('little-expected-retaliation')
    expect(getForce('newEntrants').summary).toMatch(/separate consideration/)
  })

  it('covers buyer leverage and all four price-sensitivity conditions', () => {
    expect(driverIds('buyerPower')).toEqual([
      'few-or-large-buyers',
      'standardized-products',
      'low-buyer-switching-costs',
      'backward-integration-threat',
      'large-share-of-buyer-costs',
      'buyers-under-cost-pressure',
      'little-effect-on-buyer-quality',
      'little-effect-on-buyer-other-costs',
    ])
  })

  it('covers the six supplier-power conditions', () => {
    expect(driverIds('supplierPower')).toHaveLength(6)
  })

  it('starts substitutes with price–performance and switching cost', () => {
    expect(driverIds('substitutes').slice(0, 2)).toEqual([
      'attractive-price-performance',
      'low-cost-to-switch-to-substitute',
    ])
  })

  it('treats growth, technology, government, and complements as factors, not forces', () => {
    expect(FACTORS_NOT_FORCES.map((f) => f.name)).toEqual([
      'Industry growth rate',
      'Technology and innovation',
      'Government',
      'Complementary products and services',
    ])
  })

  it('cites Porter 1979 and 2008', () => {
    expect(SOURCES.map((s) => s.authorYear)).toEqual(['Porter, M. E. (1979).', 'Porter, M. E. (2008).'])
  })
})
