// Geometry for the hand-written SVG radar chart (no chart library).

export interface Point {
  x: number
  y: number
}

export interface RadarGeometry {
  cx: number
  cy: number
  radius: number
  max: number
  axes: number
}

/** Angle of axis `index`, starting at 12 o'clock and going clockwise. */
export function axisAngle(index: number, axes: number): number {
  return -Math.PI / 2 + (index * 2 * Math.PI) / axes
}

/** Position of `value` (0..max) on axis `index`. */
export function radarPoint(geometry: RadarGeometry, index: number, value: number): Point {
  const clamped = Math.max(0, Math.min(geometry.max, value))
  const r = (clamped / geometry.max) * geometry.radius
  const angle = axisAngle(index, geometry.axes)
  return {
    x: round(geometry.cx + r * Math.cos(angle)),
    y: round(geometry.cy + r * Math.sin(angle)),
  }
}

/** SVG `points` attribute for one series. `null` values plot at 0. */
export function polygonPoints(geometry: RadarGeometry, values: (number | null)[]): string {
  return values
    .map((v, i) => radarPoint(geometry, i, v ?? 0))
    .map((p) => `${p.x},${p.y}`)
    .join(' ')
}

function round(n: number): number {
  return Math.round(n * 100) / 100
}
