import { describe, expect, it } from 'vitest'
import { viewFromSubpath } from './navigation'

describe('viewFromSubpath (SPEC §2.1)', () => {
  it.each([
    ['', 'learn'],
    ['learn', 'learn'],
    ['analyze', 'analyze'],
    ['summary', 'summary'],
    ['summary/', 'summary'],
    ['Summary', 'summary'],
    ['something-else', 'learn'],
    ['summary/extra', 'learn'],
  ])('%j → %s', (subpath, view) => {
    expect(viewFromSubpath(subpath)).toBe(view)
  })
})
