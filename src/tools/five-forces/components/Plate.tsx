import { useId, type KeyboardEvent } from 'react'
import { FORCES, SHORT_NAMES } from '../data/forces'
import { arrowWeight, hatchGap } from '../lib/plate'
import type { Analysis, ForceId, Rating } from '../types'
import { emblemMarkup } from './emblems'

/*
 * The plate (SPEC §2.2): rivalry at the centre, four forces pressing on it.
 * Every rating is drawn several ways at once: shaft weight, arrowhead size,
 * one tally tick per point, hatching density, filled pips and, for rivalry,
 * one nested frame per point. Colour only marks the selected force.
 */

interface Box {
  x: number
  y: number
  w: number
  h: number
}

type Layout = Record<ForceId, Box>

// Wide field (760 × 620) and phone field (400 × 524).
const WIDE: Layout = {
  rivalry: { x: 380, y: 310, w: 180, h: 128 },
  newEntrants: { x: 380, y: 52, w: 196, h: 84 },
  supplierPower: { x: 98, y: 310, w: 184, h: 84 },
  buyerPower: { x: 662, y: 310, w: 184, h: 84 },
  substitutes: { x: 380, y: 568, w: 196, h: 84 },
}
const NARROW: Layout = {
  rivalry: { x: 200, y: 262, w: 98, h: 112 },
  newEntrants: { x: 200, y: 40, w: 184, h: 72 },
  supplierPower: { x: 53, y: 262, w: 102, h: 100 },
  buyerPower: { x: 347, y: 262, w: 102, h: 100 },
  substitutes: { x: 200, y: 484, w: 184, h: 72 },
}
const TWO_LINE: Partial<Record<ForceId, [string, string]>> = {
  supplierPower: ['Supplier', 'power'],
  buyerPower: ['Buyer', 'power'],
}
const DIRECTION: Record<Exclude<ForceId, 'rivalry'>, [number, number]> = {
  newEntrants: [0, 1],
  supplierPower: [1, 0],
  buyerPower: [-1, 0],
  substitutes: [0, -1],
}
const OUTER: Exclude<ForceId, 'rivalry'>[] = ['newEntrants', 'supplierPower', 'buyerPower', 'substitutes']

const INK = 'var(--color-ink)'
const ACCENT = 'var(--color-accent)'
const CARTOUCHE = 'var(--color-surface)'

interface PlateProps {
  analysis: Analysis
  /** The selected force, drawn in the accent with a double rule. */
  selected?: ForceId | null
  /** When given, each force is a button that calls this. */
  onSelect?: (forceId: ForceId) => void
  /** Use the phone layout (two-line side labels, tighter frames). */
  narrow?: boolean
  /** The plate's accessible name (see plateLabel in lib/plate.ts). */
  label: string
}

function Pips({ cx, y, rating, accent, step = 15, size = 8 }: { cx: number; y: number; rating: Rating | null; accent: boolean; step?: number; size?: number }) {
  const color = accent ? ACCENT : INK
  const left = cx - (step * 4 + size) / 2
  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={left + i * step}
          y={y}
          width={size}
          height={size}
          fill={rating !== null && i < rating ? color : CARTOUCHE}
          stroke={color}
          strokeWidth={0.9}
        />
      ))}
    </>
  )
}

export function Plate({ analysis, selected = null, onSelect, narrow = false, label }: PlateProps) {
  const prefix = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const layout = narrow ? NARROW : WIDE
  const width = narrow ? 400 : 760
  const height = narrow ? 524 : 620
  const frameStep = narrow ? 3 : 6
  const rating = (forceId: ForceId) => analysis.assessments[forceId].rating
  const rv = rating('rivalry')
  const centre = layout.rivalry

  const interactive = onSelect !== undefined
  const forceProps = (forceId: ForceId) => {
    if (!interactive) return { 'aria-hidden': true as const }
    const force = FORCES.find((f) => f.id === forceId)!
    const r = rating(forceId)
    return {
      className: 'plate-force',
      role: 'button',
      tabIndex: 0,
      'aria-pressed': selected === forceId,
      'aria-label': `${force.name}, ${r === null ? 'not rated' : `${r} of 5`}`,
      onClick: () => onSelect(forceId),
      onKeyDown: (event: KeyboardEvent<SVGGElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect(forceId)
        }
      },
    }
  }

  const patterns = [1, 2, 3, 4, 5].map((r) => {
    const gap = hatchGap(r as Rating)
    return (
      <g key={r}>
        <pattern id={`${prefix}h${r}`} width={gap} height={gap} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2={gap} stroke={INK} strokeWidth={0.7} />
        </pattern>
        <pattern id={`${prefix}x${r}`} width={gap} height={gap} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d={`M0 0V${gap}M0 0H${gap}`} stroke={INK} strokeWidth={0.6} fill="none" />
        </pattern>
      </g>
    )
  })

  const arrows = OUTER.map((forceId) => {
    const box = layout[forceId]
    const r = rating(forceId)
    const [dx, dy] = DIRECTION[forceId]
    const color = selected === forceId ? ACCENT : INK
    const weight = r === null ? 0.8 : arrowWeight(r)
    const head = r === null ? 7 : narrow ? 8 + r * 2 : 9 + r * 2.6
    const half = r === null ? 3.5 : narrow ? 4 + r * 1.5 : 5 + r * 1.9
    const outer = frameStep * (rv ?? 0) + (narrow ? 4 : 6)
    const x1 = dy ? box.x : box.x + (dx * box.w) / 2
    const y1 = dy ? box.y + (dy * box.h) / 2 : box.y
    const x2 = dy ? box.x : centre.x - dx * (centre.w / 2 + outer)
    const y2 = dy ? centre.y - dy * (centre.h / 2 + outer) : box.y
    const sx = x2 - dx * head
    const sy = y2 - dy * head
    const px = -dy
    const py = dx
    const tickCount = r === null || (narrow && dx !== 0) ? 0 : r
    return (
      <g key={forceId} aria-hidden="true" className="plate-arrow">
        <line x1={x1} y1={y1} x2={sx} y2={sy} stroke={color} strokeWidth={weight} strokeDasharray={r === null ? '2 4' : undefined} />
        <path
          d={`M${x2} ${y2}L${sx + px * half} ${sy + py * half}L${sx + dx * head * 0.28} ${sy + dy * head * 0.28}L${sx - px * half} ${sy - py * half}Z`}
          fill={r === null ? 'none' : color}
          stroke={color}
          strokeWidth={r === null ? 0.8 : 0}
        />
        {Array.from({ length: tickCount }, (_, i) => {
          const t = 10 + i * 7
          const tx = x1 + dx * t
          const ty = y1 + dy * t
          const l = weight / 2 + 5
          return <line key={i} x1={tx + px * l} y1={ty + py * l} x2={tx - px * l} y2={ty - py * l} stroke={color} strokeWidth={1} />
        })}
      </g>
    )
  })

  const rivalryOn = selected === 'rivalry'
  const frames = Array.from({ length: rv ?? 0 }, (_, k) => {
    const i = (rv ?? 0) - k
    const o = i * frameStep
    return (
      <rect
        key={i}
        x={centre.x - centre.w / 2 - o}
        y={centre.y - centre.h / 2 - o}
        width={centre.w + 2 * o}
        height={centre.h + 2 * o}
        fill="none"
        stroke={rivalryOn ? ACCENT : INK}
        strokeWidth={i === rv ? 1 : 0.6}
      />
    )
  })
  const cw = narrow ? 84 : 140
  const ch = narrow ? 96 : 92

  const rivalry = (
    <g {...forceProps('rivalry')}>
      {frames}
      <rect
        className="plate-box"
        x={centre.x - centre.w / 2}
        y={centre.y - centre.h / 2}
        width={centre.w}
        height={centre.h}
        fill={rv === null ? CARTOUCHE : `url(#${prefix}x${rv})`}
        stroke={rivalryOn ? ACCENT : INK}
        strokeWidth={rivalryOn ? 2.5 : 1.2}
      />
      <rect x={centre.x - cw / 2} y={centre.y - ch / 2} width={cw} height={ch} fill={CARTOUCHE} stroke={INK} strokeWidth={0.6} />
      <g
        transform={`translate(${centre.x - 15} ${centre.y - 42}) scale(.625)`}
        fill={INK}
        stroke={INK}
        strokeWidth={1.6}
        strokeLinejoin="round"
        strokeLinecap="round"
        dangerouslySetInnerHTML={{ __html: emblemMarkup(analysis.presetId) }}
      />
      <text className="plate-label" x={centre.x} y={centre.y + 18} textAnchor="middle" fontSize={narrow ? 18 : 21}>
        {SHORT_NAMES.rivalry}
      </text>
      <Pips cx={centre.x} y={centre.y + 28} rating={rv} accent={rivalryOn} step={narrow ? 14 : 15} />
    </g>
  )

  const boxes = OUTER.map((forceId) => {
    const box = layout[forceId]
    const r = rating(forceId)
    const on = selected === forceId
    const two = narrow ? TWO_LINE[forceId] : undefined
    const cartW = narrow ? (two ? 90 : 160) : 144
    const cartH = narrow ? (two ? 84 : 52) : 48
    const lines = two ?? [SHORT_NAMES[forceId]]
    const firstY = narrow ? box.y - (two ? 18 : 4) : box.y - 2
    return (
      <g key={forceId} {...forceProps(forceId)}>
        <rect
          className="plate-box"
          x={box.x - box.w / 2}
          y={box.y - box.h / 2}
          width={box.w}
          height={box.h}
          fill={r === null ? CARTOUCHE : `url(#${prefix}h${r})`}
          stroke={on ? ACCENT : INK}
          strokeWidth={on ? 2.5 : 1.2}
        />
        {on ? (
          <rect x={box.x - box.w / 2 + 4} y={box.y - box.h / 2 + 4} width={box.w - 8} height={box.h - 8} fill="none" stroke={ACCENT} strokeWidth={0.6} />
        ) : null}
        <rect x={box.x - cartW / 2} y={box.y - cartH / 2} width={cartW} height={cartH} fill={CARTOUCHE} stroke={INK} strokeWidth={0.6} />
        {lines.map((line, i) => (
          <text key={line} className="plate-label" x={box.x} y={firstY + i * 20} textAnchor="middle" fontSize={19}>
            {/* The trailing space keeps a two-line name one phrase ("Supplier power") for assistive tech; it is not drawn. */}
            {i < lines.length - 1 ? `${line} ` : line}
          </text>
        ))}
        <Pips cx={box.x} y={narrow ? box.y + (two ? 18 : 8) : box.y + 7} rating={r} accent={on} step={narrow ? 14 : 15} />
      </g>
    )
  })

  return (
    <svg className="plate" viewBox={`0 0 ${width} ${height}`} role={interactive ? 'group' : 'img'} aria-label={label}>
      <defs>{patterns}</defs>
      <rect width={width} height={height} fill="var(--color-bg)" />
      {arrows}
      {rivalry}
      {boxes}
    </svg>
  )
}
