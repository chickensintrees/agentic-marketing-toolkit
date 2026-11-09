import type { KeyboardEvent } from 'react'
import { FORCE_ORDER, SHORT_NAMES, getForce } from '../data/forces'
import {
  EXTENT,
  OUTER_FORCES,
  OUTER_PLACEMENT,
  lineWeight,
  outerDistance,
  outerHalfSize,
  ringRadius,
  rivalryRadius,
  type OuterForceId,
  type Ratings,
} from '../lib/diagram'
import { RATINGS, RATING_LABELS } from '../lib/analysis'
import type { ForceId, Rating } from '../types'

interface ForceDiagramProps {
  ratings: Ratings
  /** A second set of ratings drawn as dashed outlines. */
  comparison?: Ratings | null
  selected?: ForceId | null
  /** When given, each force is a button that selects it. */
  onSelect?: (forceId: ForceId) => void
  /** A miniature: no rings, labels or numerals, drawn in currentColor. */
  mini?: boolean
  /** The accessible name when the diagram is a single image. */
  description?: string
  className?: string
}

/** A triangle pointing toward −y (outward, before rotation onto its axis). */
const TRIANGLE = '0,-1.1 1.2,0.95 -1.2,0.95'
/** Crop marks around a unit square, for the selected force. */
const CROP = 'M-1.3,-.75V-1.3H-.75M.75,-1.3H1.3V-.75M1.3,.75V1.3H.75M-.75,1.3H-1.3V.75'

const LABEL_AT: Record<OuterForceId, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  newEntrants: { x: 0, y: -462, anchor: 'middle' },
  supplierPower: { x: -492, y: -132, anchor: 'start' },
  buyerPower: { x: 492, y: -132, anchor: 'end' },
  substitutes: { x: 0, y: 486, anchor: 'middle' },
}

function forceLabel(forceId: ForceId, rating: Rating | null): string {
  const name = getForce(forceId).name
  return rating === null ? `${name}, not rated` : `${name}, ${rating} of 5, ${RATING_LABELS[rating]}`
}

/**
 * Porter's Five Forces as one geometric figure: rivalry is the central disc;
 * a stronger outer force sits closer, is larger and pulls a heavier line.
 * See this tool's SPEC.md §2.2.
 */
export function ForceDiagram({
  ratings,
  comparison,
  selected,
  onSelect,
  mini = false,
  description,
  className,
}: ForceDiagramProps) {
  const interactive = Boolean(onSelect)
  const detailed = !mini

  const buttonProps = (forceId: ForceId) => {
    if (!onSelect) return {}
    return {
      role: 'button',
      tabIndex: 0,
      'aria-pressed': selected === forceId,
      'aria-label': forceLabel(forceId, ratings[forceId]),
      onClick: () => onSelect(forceId),
      onKeyDown: (event: KeyboardEvent<SVGGElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect(forceId)
        }
      },
    }
  }

  const rivalry = ratings.rivalry
  const rr = rivalryRadius(rivalry)

  return (
    <svg
      className={['ffd', mini ? 'ffd-mini' : '', interactive ? 'ffd-interactive' : '', className]
        .filter(Boolean)
        .join(' ')}
      viewBox={`${-EXTENT} ${-EXTENT} ${2 * EXTENT} ${2 * EXTENT}`}
      {...(interactive
        ? { role: 'group', 'aria-label': 'Five forces diagram' }
        : description
          ? { role: 'img', 'aria-label': description }
          : { 'aria-hidden': true })}
    >
      {detailed ? (
        <g className="ffd-rings" aria-hidden="true">
          {RATINGS.map((r) => (
            <circle key={r} className="ffd-ring" r={ringRadius(r)} />
          ))}
          {RATINGS.map((r) => (
            <text
              key={r}
              className="ffd-tick"
              x={ringRadius(r) * 0.7071 + 8}
              y={-ringRadius(r) * 0.7071 - 8}
            >
              {r}
            </text>
          ))}
        </g>
      ) : null}

      <g aria-hidden="true">
        {OUTER_FORCES.map((forceId) => {
          const r = ratings[forceId]
          const { rotation } = OUTER_PLACEMENT[forceId]
          return (
            <rect
              key={forceId}
              className="ffd-line ffd-anim"
              x={-0.5}
              y={0}
              width={1}
              height={1}
              style={{
                transform: `rotate(${rotation}deg) scale(${lineWeight(r)}, ${outerDistance(r)})`,
              }}
            />
          )
        })}
      </g>

      {OUTER_FORCES.map((forceId) => {
        const r = ratings[forceId]
        const { dx, dy, rotation, shape } = OUTER_PLACEMENT[forceId]
        const d = outerDistance(r)
        const h = outerHalfSize(r)
        const at = `translate(${dx * d}px, ${dy * d}px)`
        const numeralOffset = shape === 'triangle' ? 0.32 * h : 0
        const label = LABEL_AT[forceId]
        return (
          <g
            key={forceId}
            className={['ffd-force', selected === forceId ? 'is-selected' : '', r === null ? 'is-unrated' : '']
              .filter(Boolean)
              .join(' ')}
            data-force={forceId}
            {...buttonProps(forceId)}
          >
            {shape === 'square' ? (
              <rect
                className="ffd-shape ffd-anim"
                x={-1}
                y={-1}
                width={2}
                height={2}
                style={{ transform: `${at} scale(${h})` }}
              />
            ) : (
              <polygon
                className="ffd-shape ffd-anim"
                points={TRIANGLE}
                style={{ transform: `${at} rotate(${rotation}deg) scale(${h})` }}
              />
            )}
            {detailed ? (
              <>
                <text
                  className="ffd-num ffd-anim"
                  style={{
                    transform: `translate(${dx * (d + numeralOffset)}px, ${dy * (d + numeralOffset)}px)`,
                    fontSize: `${22 + 7 * (r ?? 1)}px`,
                  }}
                  aria-hidden="true"
                >
                  {r ?? '–'}
                </text>
                <text
                  className="ffd-label"
                  x={label.x}
                  y={label.y}
                  textAnchor={label.anchor}
                  aria-hidden="true"
                >
                  {SHORT_NAMES[forceId].toUpperCase()}
                </text>
              </>
            ) : null}
            {interactive ? (
              <>
                <path className="ffd-crop ffd-anim" d={CROP} style={{ transform: `${at} scale(${h})` }} />
                <rect className="ffd-hit" x={dx * d - h * 1.4} y={dy * d - h * 1.4} width={h * 2.8} height={h * 2.8} />
              </>
            ) : null}
          </g>
        )
      })}

      <g
        className={['ffd-force ffd-rivalry', selected === 'rivalry' ? 'is-selected' : '', rivalry === null ? 'is-unrated' : '']
          .filter(Boolean)
          .join(' ')}
        data-force="rivalry"
        {...buttonProps('rivalry')}
      >
        <circle className="ffd-shape ffd-anim" r={1} style={{ transform: `scale(${rr})` }} />
        {detailed ? (
          <>
            <text
              className="ffd-num ffd-anim"
              style={{
                transform: `translate(0px, ${-14 - 2 * (rivalry ?? 1)}px)`,
                fontSize: `${50 + 16 * (rivalry ?? 1)}px`,
              }}
              aria-hidden="true"
            >
              {rivalry ?? '–'}
            </text>
            <text className="ffd-label ffd-label-rivalry ffd-anim" y={28 + 0.36 * rr} aria-hidden="true">
              {SHORT_NAMES.rivalry.toUpperCase()}
            </text>
          </>
        ) : null}
        {interactive ? (
          <>
            <path className="ffd-crop ffd-anim" d={CROP} style={{ transform: `scale(${rr})` }} />
            <rect className="ffd-hit" x={-rr} y={-rr} width={2 * rr} height={2 * rr} />
          </>
        ) : null}
      </g>

      {comparison ? (
        <g className="ffd-comparison" data-series="comparison" aria-hidden="true">
          {FORCE_ORDER.map((forceId) => {
            const c = comparison[forceId]
            if (c === null) return null
            if (forceId === 'rivalry') {
              return <circle key={forceId} className="ffd-ghost" r={rivalryRadius(c) + 12} />
            }
            const { dx, dy, rotation, shape } = OUTER_PLACEMENT[forceId]
            const d = outerDistance(c)
            const h = outerHalfSize(c) + 10
            return shape === 'square' ? (
              <rect key={forceId} className="ffd-ghost" x={dx * d - h} y={dy * d - h} width={2 * h} height={2 * h} />
            ) : (
              <polygon
                key={forceId}
                className="ffd-ghost"
                points={TRIANGLE.split(' ')
                  .map((p) => {
                    const [x, y] = p.split(',').map(Number)
                    const rad = (rotation * Math.PI) / 180
                    const rx = (x * Math.cos(rad) - y * Math.sin(rad)) * h
                    const ry = (x * Math.sin(rad) + y * Math.cos(rad)) * h
                    return `${dx * d + rx},${dy * d + ry}`
                  })
                  .join(' ')}
              />
            )
          })}
        </g>
      ) : null}
    </svg>
  )
}
