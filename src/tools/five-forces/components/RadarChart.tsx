import { axisAngle, polygonPoints, radarPoint, type RadarGeometry } from '../lib/radar'

export interface RadarSeries {
  label: string
  values: (number | null)[]
}

interface RadarChartProps {
  labels: string[]
  primary: RadarSeries
  comparison?: RadarSeries
  ariaLabel: string
}

// The viewBox is sized to the pentagon plus its labels, so the chart stays as
// large as possible on a phone. Labels are 18 units high (see five-forces.css).
const VIEW_WIDTH = 404
const VIEW_HEIGHT = 288
const GEOMETRY: RadarGeometry = { cx: 216, cy: 154, radius: 125, max: 5, axes: 5 }
const GAP = 12 // space between a corner of the pentagon and its label
const NUDGE = 6 // upper side labels start this far inside their corner
const LINE_HEIGHT = 21
const RINGS = [1, 2, 3, 4, 5]

interface AxisLabel {
  x: number
  lines: string[]
  firstBaseline: number
  anchor: 'start' | 'middle' | 'end'
}

/**
 * Where to put the label for one corner of the chart, outside the pentagon:
 * the top label above its corner, the upper side labels just above theirs
 * (one word per line, growing upward), and the lower labels centered below.
 */
function layoutLabel(text: string, index: number, geometry: RadarGeometry): AxisLabel {
  const angle = axisAngle(index, geometry.axes)
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  const corner = radarPoint(geometry, index, geometry.max)
  if (sin < 0 && Math.abs(cos) < 0.2) {
    return { x: corner.x, lines: [text], firstBaseline: corner.y - GAP, anchor: 'middle' }
  }
  if (sin < 0) {
    const lines = text.split(' ')
    return {
      x: cos > 0 ? corner.x - NUDGE : corner.x + NUDGE,
      lines,
      firstBaseline: corner.y - GAP - (lines.length - 1) * LINE_HEIGHT,
      anchor: cos > 0 ? 'start' : 'end',
    }
  }
  return { x: corner.x, lines: [text], firstBaseline: corner.y + GAP + 14, anchor: 'middle' }
}

/** Hand-written SVG radar (pentagon) chart of ratings on a 0–5 scale. */
export function RadarChart({ labels, primary, comparison, ariaLabel }: RadarChartProps) {
  const axes = labels.length
  const geometry = { ...GEOMETRY, axes }

  return (
    <svg
      className="radar"
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      role="img"
      aria-label={ariaLabel}
    >
      <g className="radar-grid">
        {RINGS.map((ring) => (
          <polygon
            key={ring}
            points={polygonPoints(geometry, labels.map(() => ring))}
            className={ring === 5 ? 'radar-ring radar-ring-outer' : 'radar-ring'}
          />
        ))}
        {labels.map((label, i) => {
          const end = radarPoint(geometry, i, GEOMETRY.max)
          return (
            <line
              key={label}
              x1={GEOMETRY.cx}
              y1={GEOMETRY.cy}
              x2={end.x}
              y2={end.y}
              className="radar-axis"
            />
          )
        })}
      </g>


      {comparison ? (
        <g className="radar-series radar-series-comparison" data-series="comparison">
          <polygon points={polygonPoints(geometry, comparison.values)} />
          {comparison.values.map((value, i) => {
            if (value === null) return null
            const p = radarPoint(geometry, i, value)
            return (
              <rect
                key={labels[i]}
                x={p.x - 5}
                y={p.y - 5}
                width={10}
                height={10}
                className="radar-marker"
              />
            )
          })}
        </g>
      ) : null}

      <g className="radar-series radar-series-primary" data-series="primary">
        <polygon points={polygonPoints(geometry, primary.values)} />
        {primary.values.map((value, i) => {
          if (value === null) return null
          const p = radarPoint(geometry, i, value)
          return <circle key={labels[i]} cx={p.x} cy={p.y} r={6} className="radar-marker" />
        })}
      </g>

      <g className="radar-ticks" aria-hidden="true">
        {RINGS.map((ring) => {
          const p = radarPoint(geometry, 0, ring)
          return (
            <text key={ring} x={p.x + 6} y={p.y + 4}>
              {ring}
            </text>
          )
        })}
      </g>

      <g className="radar-labels">
        {labels.map((label, i) => {
          const layout = layoutLabel(label, i, geometry)
          return (
            <text key={label} x={layout.x} y={layout.firstBaseline} textAnchor={layout.anchor}>
              {layout.lines.map((line, n) => (
                <tspan key={line} x={layout.x} dy={n === 0 ? 0 : LINE_HEIGHT}>
                  {line}
                </tspan>
              ))}
            </text>
          )
        })}
      </g>
    </svg>
  )
}
