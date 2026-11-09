// Hand-drawn sketches for Home: one per tool and one per wanted tool.
// A tool or wanted tool without its own sketch gets a generic one with its
// initial, so adding one needs no design work. See SPEC.md §2.3.

import type { ReactNode } from 'react'
import { Stroke } from '../shared/components/Marker'
import { createPen, type Pen } from '../shared/sketch'

type Draw = (pen: Pen) => ReactNode

// ----------------------------------------------------------------- Tools

/** Porter's diagram as a quick sketch: rivalry in the middle, four forces around it. */
const fiveForces: Draw = (pen) => {
  const boxes: [number, number, number, number, string[]][] = [
    [245, 8, 270, 92, ['New entrants']],
    [4, 214, 200, 116, ['Supplier', 'power']],
    [556, 214, 200, 116, ['Buyer', 'power']],
    [260, 444, 240, 92, ['Substitutes']],
  ]
  return (
    <>
      {boxes.map(([x, y, w, h]) => (
        <Stroke key={`${x}-${y}`} d={pen.rect(x, y, w, h, 0.9)} width={2.6} className="sketch-wobble" />
      ))}
      <Stroke
        d={pen.ellipse(380, 272, 96, 88, { overshoot: 0.5 }) + pen.ellipse(380, 272, 104, 95, { overshoot: 0.4 })}
        ink="pressure"
        width={3.4}
        className="sketch-wobble"
      />
      <Stroke d={pen.line(380, 108, 380, 166) + pen.arrowHead(380, 108, 380, 166, 18)} width={5} className="sketch-wobble" />
      <Stroke d={pen.line(380, 436, 380, 378) + pen.arrowHead(380, 436, 380, 378, 18)} width={5} className="sketch-wobble" />
      <Stroke d={pen.line(212, 272, 262, 272) + pen.line(214, 275, 260, 270) + pen.arrowHead(212, 272, 266, 272, 22)} ink="pressure" width={7} className="sketch-wobble" />
      <Stroke d={pen.line(548, 272, 498, 272) + pen.line(546, 275, 500, 270) + pen.arrowHead(548, 272, 494, 272, 22)} ink="pressure" width={7} className="sketch-wobble" />
      {boxes.map(([x, y, w, h, lines]) => (
        <text key={`t-${x}-${y}`} x={x + w / 2} y={y + h / 2 + 14 - (lines.length - 1) * 19} fontSize={38} textAnchor="middle">
          {lines.map((line, i) => (
            <tspan key={line} x={x + w / 2} dy={i === 0 ? 0 : 40}>
              {line}
            </tspan>
          ))}
        </text>
      ))}
      <text x={380} y={286} fontSize={42} textAnchor="middle">
        Rivalry
      </text>
    </>
  )
}

const TOOL_SKETCHES: Record<string, Draw> = { 'five-forces': fiveForces }

function initialSketch(name: string, width: number, height: number): Draw {
  return (pen) => (
    <>
      <g className="sketch-wobble">
        <Stroke d={pen.rect(width * 0.2, height * 0.12, width * 0.6, height * 0.76, 0.8)} dashed width={2.6} />
      </g>
      <text x={width / 2} y={height / 2 + 14} fontSize={Math.round(height * 0.36)} textAnchor="middle" className="sketch-initial">
        {name.trim().charAt(0).toUpperCase()}
      </text>
    </>
  )
}

export function ToolSketch({ id, name }: { id: string; name: string }) {
  const draw = TOOL_SKETCHES[id] ?? initialSketch(name, 760, 540)
  return (
    <svg className="tool-sketch" viewBox="-6 0 772 544" aria-hidden="true" focusable="false">
      {draw(createPen(`tool-${id}`))}
    </svg>
  )
}

// ---------------------------------------------------------- Wanted tools

const letters = (items: [string, number, number][]) =>
  items.map(([l, x, y]) => (
    <text key={`${l}-${x}-${y}`} x={x} y={y} fontSize={19} textAnchor="middle" className="sketch-pencil-text">
      {l}
    </text>
  ))

const dashed = (d: string, width = 2.6) => <Stroke d={d} ink="pencil" width={width} dashed className="sketch-wobble" />
const solid = (d: string, width = 2.6) => <Stroke d={d} ink="pencil" width={width} className="sketch-wobble" />

const WANTED_SKETCHES: Record<string, Draw> = {
  'swot-builder': (p) => (
    <>
      {dashed(p.rect(20, 10, 80, 70, 0.8) + p.line(60, 8, 60, 82, 0.6) + p.line(18, 45, 102, 45, 0.6))}
      {letters([['S', 40, 34], ['W', 80, 34], ['O', 40, 70], ['T', 80, 70]])}
    </>
  ),
  'stp-planner': (p) => (
    <>
      {dashed(p.ellipse(56, 47, 32, 32) + p.ellipse(56, 47, 19, 19) + p.ellipse(56, 47, 6, 6))}
      {solid(p.line(106, 8, 62, 42, 0.5) + p.arrowHead(106, 8, 62, 42, 12))}
    </>
  ),
  'persona-builder': (p) => dashed(p.ellipse(60, 30, 13, 15) + p.polyline([[32, 84], [40, 60], [60, 52], [80, 60], [88, 84]])),
  'marketing-mix-planner': (p) => (
    <>
      {dashed(p.rect(22, 10, 34, 32, 0.6) + p.rect(64, 10, 34, 32, 0.6) + p.rect(22, 50, 34, 32, 0.6) + p.rect(64, 50, 34, 32, 0.6), 2.4)}
      {letters([['P', 39, 33], ['P', 81, 33], ['P', 39, 73], ['P', 81, 73]])}
    </>
  ),
  'value-proposition-mapper': (p) => (
    <>
      {dashed(p.ellipse(36, 46, 24, 24) + p.rect(66, 24, 44, 44, 0.7))}
      {solid(p.line(58, 40, 70, 40, 0.3) + p.line(58, 52, 70, 52, 0.3), 2.4)}
    </>
  ),
  'customer-journey-map': (p) => {
    const pts: [number, number][] = [[10, 64], [32, 30], [58, 58], [82, 26], [110, 46]]
    return (
      <>
        {dashed(p.polyline(pts))}
        {solid(pts.map(([x, y]) => p.ellipse(x, y, 3.5, 3.5, { points: 8 })).join(''), 3.2)}
      </>
    )
  },
  'perceptual-map': (p) => (
    <>
      {dashed(p.line(60, 6, 60, 84, 0.5) + p.line(12, 45, 108, 45, 0.5), 2.4)}
      {solid([[34, 24], [42, 30], [84, 62], [92, 22], [30, 66]].map(([x, y]) => p.ellipse(x, y, 3, 3, { points: 8 })).join(''), 3.4)}
    </>
  ),
  'pestel-scanner': (p) => (
    <>
      <text x={60} y={54} fontSize={21} textAnchor="middle" letterSpacing={2} className="sketch-pencil-text">
        PESTEL
      </text>
      {dashed(p.ellipse(60, 46, 52, 20, { overshoot: 0.4 }), 2.2)}
    </>
  ),
  'break-even-pricing': (p) => (
    <>
      {dashed(p.line(14, 8, 14, 82, 0.4) + p.line(14, 82, 110, 82, 0.4), 2.4)}
      {solid(p.line(16, 80, 106, 16, 0.5) + p.line(16, 50, 106, 36, 0.5) + p.ellipse(68, 42, 5, 5, { points: 8 }))}
    </>
  ),
  'customer-lifetime-value': (p) => (
    <>
      {dashed(p.polyline([[14, 80], [14, 66], [34, 66], [34, 52], [54, 52], [54, 38], [74, 38], [74, 24], [94, 24]]))}
      {solid(p.line(84, 40, 108, 10, 0.4) + p.arrowHead(84, 40, 108, 10, 11))}
    </>
  ),
}

const wantedFallback = (name: string): Draw => (p) => (
  <>
    {dashed(p.rect(24, 12, 72, 66, 0.8))}
    <text x={60} y={56} fontSize={30} textAnchor="middle" className="sketch-pencil-text">
      {name.trim().charAt(0).toUpperCase()}
    </text>
  </>
)

export function WantedSketch({ id, name }: { id: string; name: string }) {
  const draw = WANTED_SKETCHES[id] ?? wantedFallback(name)
  return (
    <svg className="wanted-sketch" viewBox="0 0 120 90" aria-hidden="true" focusable="false">
      {draw(createPen(`wanted-${id}`))}
    </svg>
  )
}
