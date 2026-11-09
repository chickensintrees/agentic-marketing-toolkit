// A quick marker doodle for each example industry. A preset without a doodle
// of its own gets a generic one with its initial (SPEC §2.2), so a student who
// adds a preset needs no design work.

import type { ReactNode } from 'react'
import { Stroke, type Ink } from '../../../shared/components/Marker'
import { createPen, type Pen } from '../../../shared/sketch'

type Draw = (pen: Pen, ink: Ink) => ReactNode

const w = (d: string, ink: Ink, width = 3) => <Stroke d={d} ink={ink} width={width} className="sketch-wobble" />

const DOODLES: Record<string, Draw> = {
  'us-airlines': (p, ink) => (
    <>
      {w(
        p.ellipse(52, 42, 38, 8, { overshoot: 0.15 }) +
          p.line(18, 40, 10, 20) +
          p.line(10, 20, 20, 22) +
          p.line(20, 22, 30, 36) +
          p.polyline([[46, 44], [34, 66], [44, 66], [62, 44]]) +
          p.line(54, 38, 58, 38, 0.3) +
          p.line(62, 38, 66, 38, 0.3) +
          p.line(70, 38, 74, 38, 0.3),
        ink,
      )}
      {w(p.line(4, 74, 30, 70, 0.5) + p.line(70, 72, 96, 66, 0.5), 'pencil', 2.2)}
    </>
  ),
  'coffee-shops': (p, ink) => (
    <>
      {w(
        p.line(28, 32, 32, 68) +
          p.line(32, 68, 64, 68) +
          p.line(64, 68, 68, 32) +
          p.ellipse(48, 32, 20, 5, { overshoot: 0.2 }) +
          p.ellipse(72, 48, 8, 9, { overshoot: 0 }) +
          p.line(18, 73, 78, 73),
        ink,
      )}
      {w(p.wave(38, 42, 14, 3, 4) + p.wave(50, 54, 14, 3, 4), 'pencil', 2.4)}
    </>
  ),
  'video-streaming': (p, ink) =>
    w(p.rect(12, 10, 76, 48) + p.polyline([[42, 24], [42, 46], [61, 35]], true) + p.line(50, 58, 50, 68) + p.line(34, 70, 66, 70), ink),
  'soft-drinks': (p, ink) => (
    <>
      {w(
        p.line(34, 16, 34, 68) +
          p.line(64, 16, 64, 68) +
          p.ellipse(49, 16, 15, 4, { overshoot: 0.2 }) +
          p.ellipse(49, 68, 15, 4, { overshoot: 0 }) +
          p.wave(34, 64, 42, 3, 7.5),
        ink,
      )}
      {w(p.ellipse(76, 34, 3, 3, { points: 8 }) + p.ellipse(82, 20, 4, 4, { points: 8 }) + p.ellipse(74, 8, 2.5, 2.5, { points: 8 }), 'pencil', 2.4)}
    </>
  ),
  'whitewater-rafting': (p, ink) => (
    <>
      {w(p.ellipse(48, 50, 32, 9, { overshoot: 0.2 }) + p.ellipse(48, 49, 22, 4.5, { overshoot: 0.1 }) + p.line(70, 14, 40, 64) + p.ellipse(39, 66, 4, 7, { overshoot: 0.1 }), ink)}
      {w(p.wave(6, 94, 64, 3, 11) + p.wave(14, 86, 72, 2.5, 12), 'pencil', 2.4)}
    </>
  ),
}

const customDoodle: Draw = (p, ink) => (
  <>
    {w(p.rect(18, 10, 64, 58, 0.8), ink, 2.6)}
    {w(p.line(30, 26, 70, 26, 0.3) + p.line(30, 40, 62, 40, 0.3) + p.line(30, 54, 54, 54, 0.3), 'pencil', 2.4)}
  </>
)

const initialDoodle =
  (name: string): Draw =>
  (p, ink) => (
    <>
      {w(p.ellipse(50, 40, 30, 30), ink, 2.6)}
      <text x={50} y={52} fontSize={34} textAnchor="middle">
        {name.trim().charAt(0).toUpperCase() || '?'}
      </text>
    </>
  )

interface IndustryDoodleProps {
  /** A preset id, or null for a custom industry. */
  presetId: string | null
  name: string
  ink?: Ink
  className?: string
}

export function IndustryDoodle({ presetId, name, ink = 'ink', className = 'doodle' }: IndustryDoodleProps) {
  const draw = presetId === null ? customDoodle : (DOODLES[presetId] ?? initialDoodle(name))
  return (
    <svg className={className} viewBox="0 0 100 80" aria-hidden="true" focusable="false">
      {draw(createPen(`doodle-${presetId ?? 'custom'}`), ink)}
    </svg>
  )
}
