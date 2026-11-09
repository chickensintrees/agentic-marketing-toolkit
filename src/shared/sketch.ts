// Hand-drawn "marker" geometry for the whiteboard look. See SPEC.md §2.4.
//
// Every function returns SVG path data (the `d` attribute). Drawings are
// seeded: the same key always produces the same wobble, so a sketch does not
// jump around when React re-renders, and tests are deterministic.
//
// Usage:
//   const pen = createPen('buyer-box')
//   <path d={pen.rect(10, 10, 200, 120)} />

type Point = readonly [number, number]

/** Round to one decimal place to keep path strings short. */
const r1 = (n: number) => Math.round(n * 10) / 10

/** A 32-bit FNV-1a hash of the key, used as the seed. */
export function hashKey(key: string): number {
  let h = 2166136261
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** A small, fast seeded random generator (mulberry32). Returns numbers in [0, 1). */
export function seededRandom(seed: number): () => number {
  let s = seed | 0
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** A smooth curve through the points (Catmull–Rom, as cubic Béziers). */
export function smoothPath(points: readonly Point[], closed = false): string {
  if (points.length < 2) return ''
  if (points.length === 2) {
    return `M${r1(points[0][0])} ${r1(points[0][1])}L${r1(points[1][0])} ${r1(points[1][1])}`
  }
  const p = closed
    ? [points[points.length - 1], ...points, points[0], points[1]]
    : [points[0], ...points, points[points.length - 1]]
  let d = `M${r1(p[1][0])} ${r1(p[1][1])}`
  for (let i = 1; i < p.length - 2; i++) {
    const [a, b, c, e] = [p[i - 1], p[i], p[i + 1], p[i + 2]]
    d +=
      `C${r1(b[0] + (c[0] - a[0]) / 6)} ${r1(b[1] + (c[1] - a[1]) / 6)} ` +
      `${r1(c[0] - (e[0] - b[0]) / 6)} ${r1(c[1] - (e[1] - b[1]) / 6)} ${r1(c[0])} ${r1(c[1])}`
  }
  return d
}

export interface EllipseOptions {
  /** How far past a full turn the stroke runs, in radians, like a hand-drawn loop. */
  overshoot?: number
  /** Radius wobble as a fraction of the radius. */
  wobble?: number
  /** Number of points around the loop. */
  points?: number
}

export interface Pen {
  /** A random number in [-amount, amount]. */
  jitter: (amount: number) => number
  /** A slightly bowed straight line. `roughness` scales the wobble. */
  line: (x1: number, y1: number, x2: number, y2: number, roughness?: number) => string
  /** Four lines that overshoot at the corners. */
  rect: (x: number, y: number, w: number, h: number, roughness?: number) => string
  /** A loop that overshoots its own start. */
  ellipse: (cx: number, cy: number, rx: number, ry: number, options?: EllipseOptions) => string
  /** Two short strokes making an arrowhead at (x2, y2), pointing from (x1, y1). */
  arrowHead: (x1: number, y1: number, x2: number, y2: number, size: number) => string
  /** A zig-zag wave from x1 to x2. */
  wave: (x1: number, x2: number, y: number, amplitude?: number, step?: number) => string
  /** Straight segments through the points. */
  polyline: (points: readonly Point[], closed?: boolean) => string
  /**
   * Tally marks for 1–5: up to four upright strokes, and for 5 a fifth stroke
   * across them. (x, y) is the centre of the first stroke.
   */
  tally: (x: number, y: number, count: number, height?: number, gap?: number) => string
}

/** Width of a tally of `count` strokes, from the first stroke to the last. */
export function tallyWidth(count: number, gap = 12): number {
  return (Math.max(1, Math.min(count, 4)) - 1) * gap
}

/** A seeded pen. The same key draws the same lines. */
export function createPen(key: string): Pen {
  const random = seededRandom(hashKey(key))
  const jitter = (amount: number) => (random() * 2 - 1) * amount

  const line: Pen['line'] = (x1, y1, x2, y2, roughness = 1) => {
    const dx = x2 - x1
    const dy = y2 - y1
    const length = Math.hypot(dx, dy) || 1
    const bow = jitter(Math.min(length * 0.025, 7) * roughness)
    const mx = (x1 + x2) / 2 + (-dy / length) * bow
    const my = (y1 + y2) / 2 + (dx / length) * bow
    const e = 1.4 * roughness
    return (
      `M${r1(x1 + jitter(e))} ${r1(y1 + jitter(e))}` +
      `Q${r1(mx)} ${r1(my)} ${r1(x2 + jitter(e))} ${r1(y2 + jitter(e))}`
    )
  }

  const rect: Pen['rect'] = (x, y, w, h, roughness = 1) => {
    const o = 4 * roughness
    return [
      line(x - o, y, x + w + o * 0.6, y, roughness),
      line(x + w, y - o * 0.5, x + w, y + h + o, roughness),
      line(x + w + o * 0.4, y + h, x - o * 0.6, y + h, roughness),
      line(x, y + h + o * 0.5, x, y - o, roughness),
    ].join('')
  }

  const ellipse: Pen['ellipse'] = (cx, cy, rx, ry, options = {}) => {
    const { overshoot = 0.32, wobble = 0.045, points = 16 } = options
    const start = random() * Math.PI * 2
    const span = Math.PI * 2 + overshoot
    const pts: Point[] = []
    for (let i = 0; i <= points; i++) {
      const a = start + (span * i) / points
      const k = 1 + jitter(wobble)
      pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k])
    }
    return smoothPath(pts)
  }

  const arrowHead: Pen['arrowHead'] = (x1, y1, x2, y2, size) => {
    const angle = Math.atan2(y2 - y1, x2 - x1)
    const spread = 0.5 + jitter(0.06)
    return (
      line(x2, y2, x2 - size * Math.cos(angle - spread), y2 - size * Math.sin(angle - spread), 0.5) +
      line(x2, y2, x2 - size * Math.cos(angle + spread), y2 - size * Math.sin(angle + spread), 0.5)
    )
  }

  const wave: Pen['wave'] = (x1, x2, y, amplitude = 3, step = 10) => {
    const pts: Point[] = []
    for (let x = x1, i = 0; x <= x2 + 0.1; x += step, i++) {
      pts.push([x, y + (i % 2 ? amplitude : -amplitude) + jitter(0.8)])
    }
    return smoothPath(pts)
  }

  const polyline: Pen['polyline'] = (points, closed = false) => {
    let d = ''
    const n = closed ? points.length : points.length - 1
    for (let i = 0; i < n; i++) {
      const a = points[i]
      const b = points[(i + 1) % points.length]
      d += line(a[0], a[1], b[0], b[1], 0.6)
    }
    return d
  }

  const tally: Pen['tally'] = (x, y, count, height = 34, gap = 12) => {
    let d = ''
    const strokes = Math.max(0, Math.min(count, 4))
    for (let i = 0; i < strokes; i++) {
      const sx = x + i * gap
      d += line(sx + jitter(1), y - height / 2, sx + jitter(1.5), y + height / 2, 0.5)
    }
    if (count >= 5) d += line(x - 8, y + height / 2 - 6, x + 3 * gap + 8, y - height / 2 + 6, 0.5)
    return d
  }

  return { jitter, line, rect, ellipse, arrowHead, wave, polyline, tally }
}
