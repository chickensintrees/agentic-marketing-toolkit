import { describe, expect, it } from 'vitest'
import { canvasViewFromSubpath, forceFromStep, stepForForce, subpathForView } from './views'

describe('views', () => {
  it('maps subpaths to the Canvas or the Summary', () => {
    expect(canvasViewFromSubpath('summary')).toBe('summary')
    expect(canvasViewFromSubpath('/Summary/')).toBe('summary')
    for (const s of ['', 'learn', 'analyze', 'nonsense']) expect(canvasViewFromSubpath(s)).toBe('canvas')
    expect(subpathForView('canvas')).toBe('')
    expect(subpathForView('summary')).toBe('summary')
  })

  it('stores the selected force as a step and reads it back', () => {
    expect(stepForForce('rivalry')).toBe(1)
    expect(stepForForce('substitutes')).toBe(5)
    expect(forceFromStep(stepForForce('buyerPower'))).toBe('buyerPower')
    expect(forceFromStep(0)).toBeNull()
    expect(forceFromStep(6)).toBeNull()
  })
})
