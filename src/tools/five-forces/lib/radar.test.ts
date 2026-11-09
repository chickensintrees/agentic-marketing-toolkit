import { describe, expect, it } from 'vitest'
import { axisAngle, polygonPoints, radarPoint, type RadarGeometry } from './radar'

const geometry: RadarGeometry = { cx: 100, cy: 100, radius: 50, max: 5, axes: 5 }

describe('radar geometry', () => {
  it('starts the first axis at 12 o’clock', () => {
    expect(axisAngle(0, 5)).toBeCloseTo(-Math.PI / 2)
    expect(radarPoint(geometry, 0, 5)).toEqual({ x: 100, y: 50 })
  })

  it('plots 0 at the center and clamps values to the scale', () => {
    expect(radarPoint(geometry, 2, 0)).toEqual({ x: 100, y: 100 })
    expect(radarPoint(geometry, 0, 9)).toEqual(radarPoint(geometry, 0, 5))
  })

  it('plots unrated (null) values at 0', () => {
    const points = polygonPoints(geometry, [5, null, null, null, null]).split(' ')
    expect(points).toHaveLength(5)
    expect(points[0]).toBe('100,50')
    expect(points.slice(1)).toEqual(['100,100', '100,100', '100,100', '100,100'])
  })
})
