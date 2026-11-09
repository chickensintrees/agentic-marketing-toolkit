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

const VIEW_WIDTH = 460
const VIEW_HEIGHT = 300
const GEOMETRY: RadarGeometry = { cx: 230, cy: 158, radius: 118, max: 5, axes: 5 }
const LABEL_OFFSET = 16
const FONT_SIZE = 18
const LINE_HEIGHT = 20
const RINGS = [1, 2, 3, 4, 5]

interface AxisLabel {
  x: number
  lines: string[]
  firstBaseline: number
  anchor: 'start' | 'middle' | 'end'
}

function layoutLabel(text: string, index: number, axes: number): AxisLabel {
  const angle = axisAngle(index, axes)
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  const r = GEOMETRY.radius + LABEL_OFFSET
  const x = GEOMETRY.cx + r * cos
  const y = GEOMETRY.cy + r * sin
  if (Math.abs(cos) < 0.2) {
    // Top (or bottom) label: one line, centered on the axis.
    return {
      x,
      lines: [text],
      firstBaseline: sin < 0 ? y - 4 : y + FONT_SIZE,
      anchor: 'middle',
    }
  }
  // Side labels wrap one word per line and are centered on the axis end.
  const lines = text.split(' ')
  const block = (lines.length - 1) * LINE_HEIGHT
  return {
    x,
    lines,
    firstBaseline: y - block / 2 + FONT_SIZE * 0.35,
    anchor: cos > 0 ? 'start' : 'end',
  }
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

      <g className="radar-ticks">
        {RINGS.map((ring) => {
          const p = radarPoint(geometry, 0, ring)
          return (
            <text key={ring} x={p.x + 6} y={p.y + 4}>
              {ring}
            </text>
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

      <g className="radar-labels">
        {labels.map((label, i) => {
          const layout = layoutLabel(label, i, axes)
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
