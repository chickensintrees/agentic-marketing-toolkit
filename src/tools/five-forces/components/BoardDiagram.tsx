// Porter's diagram, sketched on the board. Each force is a button.
// Intensity is drawn: tally marks, arrow weight, extra marker passes, and one
// loop around rivalry per rating point. See SPEC §2.2.

import type { KeyboardEvent, ReactNode } from 'react'
import { Stroke, type Ink } from '../../../shared/components/Marker'
import { createPen, tallyWidth } from '../../../shared/sketch'
import { FORCES, FORCE_ORDER } from '../data/forces'
import { RATING_LABELS } from '../lib/analysis'
import type { Analysis, ForceId, Rating } from '../types'

const CX = 500
const CY = 380
const R = 104

/** Outer boxes: centre x, centre y, width, height, label lines. */
const BOXES: Record<Exclude<ForceId, 'rivalry'>, [number, number, number, number, string[]]> = {
  newEntrants: [500, 82, 390, 130, ['New entrants']],
  substitutes: [500, 678, 370, 130, ['Substitutes']],
  supplierPower: [140, 380, 260, 184, ['Supplier', 'power']],
  buyerPower: [860, 380, 260, 184, ['Buyer', 'power']],
}

const OUTER: Exclude<ForceId, 'rivalry'>[] = ['newEntrants', 'supplierPower', 'buyerPower', 'substitutes']

const inkFor = (rating: Rating | null): Ink =>
  rating === null ? 'pencil' : rating >= 4 ? 'pressure' : rating <= 2 ? 'pencil' : 'ink'

const nameOf = (id: ForceId) => FORCES.find((force) => force.id === id)!.name

/** "Buyer power: 4 of 5, High" or "Buyer power: not rated". */
function accessibleName(id: ForceId, rating: Rating | null): string {
  return rating === null ? `${nameOf(id)}: not rated` : `${nameOf(id)}: ${rating} of 5, ${RATING_LABELS[rating]}`
}

interface ScoreProps {
  x: number
  y: number
  rating: Rating | null
  seed: string
}

/** Tally marks plus the numeral, or "?" when unrated. */
function Score({ x, y, rating, seed }: ScoreProps) {
  if (rating === null) {
    return (
      <text x={x} y={y + 14} fontSize={40} textAnchor="middle" className="board-unrated">
        ?
      </text>
    )
  }
  const width = tallyWidth(rating)
  const left = x - width / 2 - 16
  return (
    <>
      <Stroke d={createPen(seed).tally(left, y, rating)} ink={inkFor(rating)} width={2.4 + rating * 0.5} className="sketch-wobble" />
      <text x={left + width + 32} y={y + 14} fontSize={38} className={`board-num board-num-${inkFor(rating)}`}>
        {rating}
      </text>
    </>
  )
}

interface BoardDiagramProps {
  analysis: Analysis
  /** The selected force, circled in the accent color. */
  selected?: ForceId | null
  /** Called when a force is chosen. Without it, the diagram is a static picture. */
  onSelect?: (id: ForceId) => void
  className?: string
  /** Accessible name for the static picture. */
  label?: string
}

export function BoardDiagram({ analysis, selected = null, onSelect, className = 'board-diagram', label }: BoardDiagramProps) {
  const ratingOf = (id: ForceId) => analysis.assessments[id].rating
  const rivalry = ratingOf('rivalry')
  const reach = R + (rivalry ?? 0) * 7 + 12
  const key = analysis.presetId ?? 'custom'

  const wrap = (id: ForceId, children: ReactNode) => {
    if (!onSelect) return <g key={id}>{children}</g>
    const onKeyDown = (event: KeyboardEvent<SVGGElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onSelect(id)
      }
    }
    return (
      <g
        key={id}
        className="board-force"
        role="button"
        tabIndex={0}
        aria-pressed={selected === id}
        aria-label={accessibleName(id, ratingOf(id))}
        data-force={id}
        onClick={() => onSelect(id)}
        onKeyDown={onKeyDown}
      >
        {children}
      </g>
    )
  }

  const arrows = OUTER.map((id) => {
    const rating = ratingOf(id)
    const [x, y, w, h] = BOXES[id]
    let x1 = CX
    let y1 = CY
    let x2 = CX
    let y2 = CY
    if (id === 'newEntrants') [y1, y2] = [y + h / 2 + 10, CY - reach]
    if (id === 'substitutes') [y1, y2] = [y - h / 2 - 10, CY + reach]
    if (id === 'supplierPower') [x1, x2] = [x + w / 2 + 10, CX - reach]
    if (id === 'buyerPower') [x1, x2] = [x - w / 2 - 10, CX + reach]
    const pen = createPen(`${key}-${id}-arrow-${rating}`)
    const r = rating ?? 1
    let d = pen.line(x1, y1, x2, y2, 0.6) + pen.arrowHead(x1, y1, x2, y2, 14 + r * 3.2)
    if (r >= 4) d += pen.line(x1 + pen.jitter(4), y1 + pen.jitter(4), x2 + pen.jitter(3), y2 + pen.jitter(3), 0.6)
    if (r >= 5) d += pen.line(x1 + pen.jitter(6), y1 + pen.jitter(6), x2 + pen.jitter(4), y2 + pen.jitter(4), 0.6)
    return (
      <Stroke key={`arrow-${id}`} d={d} ink={inkFor(rating)} width={rating === null ? 2 : 2 + rating * 1.9} dashed={rating === null} className="sketch-wobble" />
    )
  })

  const outer = OUTER.map((id) => {
    const rating = ratingOf(id)
    const [x, y, w, h, lines] = BOXES[id]
    const pen = createPen(`${key}-${id}-box`)
    const top = y - (lines.length - 1) * 24 - 14
    return wrap(
      id,
      <>
        <Stroke d={pen.rect(x - w / 2, y - h / 2, w, h, 0.9)} width={2.6} dashed={rating === null} className="sketch-wobble" />
        {lines.map((line, i) => (
          <text key={line} className="board-label" x={x} y={top + i * 48} fontSize={46} textAnchor="middle">
            {line}
          </text>
        ))}
        <Score x={x} y={top + (lines.length - 1) * 48 + 46} rating={rating} seed={`${key}-${id}-tally-${rating}`} />
        {selected === id ? (
          <Stroke d={createPen(`sel-${id}`).ellipse(x, y, w / 2 + 26, h / 2 + 22, { overshoot: 0.45, wobble: 0.03 })} ink="accent" width={4.5} className="draw-in" />
        ) : null}
        <rect className="board-focus" x={x - w / 2 - 14} y={y - h / 2 - 14} width={w + 28} height={h + 28} />
        <rect className="board-hit" x={x - w / 2 - 10} y={y - h / 2 - 10} width={w + 20} height={h + 20} />
      </>,
    )
  })

  const rivalryPen = createPen(`${key}-rivalry-${rivalry}`)
  let loops = ''
  for (let i = 0; i < (rivalry ?? 1); i++) {
    loops += rivalryPen.ellipse(CX, CY, R - 6 + i * 7, R - 14 + i * 7, { overshoot: 0.5 + i * 0.07, wobble: 0.035 })
  }
  let sparks = ''
  const sparkCount = Math.max(0, (rivalry ?? 0) - 1)
  for (let i = 0; i < sparkCount; i++) {
    const angle = -Math.PI / 2 + (i - (sparkCount - 1) / 2) * 0.42
    const [r1, r2] = [R * 0.5, R * 0.68]
    sparks += rivalryPen.line(CX + Math.cos(angle) * r1, CY - 34 + Math.sin(angle) * r1 * 0.6, CX + Math.cos(angle) * r2, CY - 34 + Math.sin(angle) * r2 * 0.6, 0.3)
  }
  const center = wrap(
    'rivalry',
    <>
      <Stroke d={loops} ink={inkFor(rivalry)} width={2.2 + (rivalry ?? 0) * 0.35} dashed={rivalry === null} className="sketch-wobble" />
      {sparks ? <Stroke d={sparks} ink={inkFor(rivalry)} width={3} className="sketch-wobble" /> : null}
      <text className="board-label" x={CX} y={CY + 8} fontSize={52} textAnchor="middle">
        Rivalry
      </text>
      <Score x={CX} y={CY + 56} rating={rivalry} seed={`${key}-rivalry-tally-${rivalry}`} />
      {selected === 'rivalry' ? (
        <Stroke
          d={createPen('sel-rivalry').ellipse(CX, CY, reach + 14, reach + 2, { overshoot: 0.5, wobble: 0.025 })}
          ink="accent"
          width={4.5}
          className="draw-in"
        />
      ) : null}
      <rect className="board-focus" x={CX - R - 34} y={CY - R - 34} width={2 * R + 68} height={2 * R + 68} />
      <circle className="board-hit" cx={CX} cy={CY} r={R + 20} />
    </>,
  )

  // Forces are listed in the standard order for keyboard users; arrows are drawn first.
  const byId = Object.fromEntries([...outer, center].map((node) => [String(node.key), node]))
  const ordered = FORCE_ORDER.map((id) => byId[id])

  return (
    <svg
      className={className}
      viewBox="-10 0 1020 752"
      role={onSelect ? 'group' : 'img'}
      aria-label={label ?? (onSelect ? 'Five forces diagram' : `Five forces: ${FORCE_ORDER.map((id) => accessibleName(id, ratingOf(id))).join('; ')}`)}
    >
      {arrows}
      {ordered}
    </svg>
  )
}
