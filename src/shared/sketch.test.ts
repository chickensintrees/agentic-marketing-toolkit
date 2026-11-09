import { describe, expect, it } from 'vitest'
import { createPen, hashKey, seededRandom, smoothPath, tallyWidth } from './sketch'

const strokes = (d: string) => (d.match(/M/g) ?? []).length

describe('sketch helpers', () => {
  it('the same key draws the same lines, and a different key draws different ones', () => {
    expect(createPen('box').rect(0, 0, 100, 50)).toBe(createPen('box').rect(0, 0, 100, 50))
    expect(createPen('box').rect(0, 0, 100, 50)).not.toBe(createPen('other').rect(0, 0, 100, 50))
  })

  it('seededRandom is deterministic and stays in [0, 1)', () => {
    const a = seededRandom(hashKey('x'))
    const b = seededRandom(hashKey('x'))
    for (let i = 0; i < 50; i++) {
      const value = a()
      expect(value).toBe(b())
      expect(value).toBeGreaterThanOrEqual(0)
      expect(value).toBeLessThan(1)
    }
  })

  it('a line starts near its first point and ends near its last', () => {
    const d = createPen('line').line(10, 20, 110, 20)
    const nums = d.match(/-?\d+(\.\d+)?/g)!.map(Number)
    expect(Math.abs(nums[0] - 10)).toBeLessThanOrEqual(1.4)
    expect(Math.abs(nums[1] - 20)).toBeLessThanOrEqual(1.4)
    expect(Math.abs(nums[4] - 110)).toBeLessThanOrEqual(1.4)
    expect(Math.abs(nums[5] - 20)).toBeLessThanOrEqual(1.4)
  })

  it('draws a tally of 1–4 as upright strokes and 5 as a crossed gate', () => {
    const pen = createPen('tally')
    expect(strokes(pen.tally(0, 0, 1))).toBe(1)
    expect(strokes(pen.tally(0, 0, 4))).toBe(4)
    expect(strokes(pen.tally(0, 0, 5))).toBe(5)
    expect(strokes(pen.tally(0, 0, 0))).toBe(0)
    expect(tallyWidth(1)).toBe(0)
    expect(tallyWidth(5)).toBe(36)
  })

  it('a rectangle has four strokes and an ellipse is one smooth stroke', () => {
    const pen = createPen('shapes')
    expect(strokes(pen.rect(0, 0, 10, 10))).toBe(4)
    const loop = pen.ellipse(50, 50, 20, 10)
    expect(strokes(loop)).toBe(1)
    expect(loop).toContain('C')
    expect(loop).not.toMatch(/NaN/)
  })

  it('smoothPath handles short input', () => {
    expect(smoothPath([])).toBe('')
    expect(smoothPath([[0, 0], [10, 10]])).toBe('M0 0L10 10')
  })
})
