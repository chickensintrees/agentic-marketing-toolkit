// Small building blocks for the whiteboard look. See SPEC.md §2.4.

import { createPen } from '../sketch'

/** The marker colors, as CSS classes defined in base.css (sketch section). */
export type Ink = 'ink' | 'pencil' | 'accent' | 'pressure'

/**
 * The SVG filter that gives marker strokes a slight wobble. Render once per
 * page; drawings refer to it with the `sketch-wobble` class. Text is never
 * filtered, so it stays crisp on a projector.
 */
export function MarkerDefs() {
  return (
    <svg className="marker-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <filter id="marker-wobble" filterUnits="userSpaceOnUse" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves={2} seed={7} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={2.6} />
        </filter>
      </defs>
    </svg>
  )
}

interface StrokeProps {
  d: string
  ink?: Ink
  width?: number
  dashed?: boolean
  className?: string
}

/** One marker stroke. */
export function Stroke({ d, ink = 'ink', width = 3, dashed = false, className }: StrokeProps) {
  return (
    <path
      className={['stroke', `ink-${ink}`, className].filter(Boolean).join(' ')}
      d={d}
      strokeWidth={width}
      strokeDasharray={dashed ? '7 5' : undefined}
    />
  )
}

interface UnderlineProps {
  seed: string
  ink?: Ink
  width?: number
}

/** A hand-drawn underline that stretches to its parent (which needs `position: relative`). */
export function Underline({ seed, ink = 'ink', width = 3 }: UnderlineProps) {
  const d = createPen(seed).line(2, 7, 98, 6, 0.4)
  return (
    <svg className="sketch-underline" viewBox="0 0 100 14" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path className={`stroke ink-${ink}`} d={d} strokeWidth={width} vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

/** A hand-drawn loop around its parent (which needs `position: relative`). */
export function Circled({ seed, ink = 'accent', width = 3.2 }: UnderlineProps) {
  const d = createPen(seed).ellipse(50, 50, 47, 44, { overshoot: 0.4, wobble: 0.03 })
  return (
    <svg className="sketch-circled" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path className={`stroke ink-${ink} draw-in`} d={d} pathLength={1} strokeWidth={width} vectorEffect="non-scaling-stroke" />
    </svg>
  )
}
