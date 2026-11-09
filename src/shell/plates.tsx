// Drawn thumbnails for Home's plates (SPEC.md §2.3). Pure line drawings in a
// 120 × 80 field, coloured only through currentColor and the theme tokens.
// An id without a drawing gets a blank ruled plate.

import type { ReactNode } from 'react'

const STROKE = { fill: 'none', stroke: 'currentColor', strokeWidth: 1 } as const
const FINE = { ...STROKE, strokeWidth: 0.5 } as const

function Letter({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontFamily="var(--font-display)" fontSize="13" fill="currentColor">
      {children}
    </text>
  )
}

function polar(cx: number, cy: number, r: number, i: number, n: number) {
  const a = (i * 2 * Math.PI) / n - Math.PI / 2
  return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]
}

const DRAWINGS: Record<string, ReactNode> = {
  'five-forces': (
    <>
      <defs>
        <pattern id="thumb-hatch" width="2.2" height="2.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="2.2" stroke="currentColor" strokeWidth="0.25" />
        </pattern>
      </defs>
      {[3, 2, 1].map((o) => (
        <rect key={o} x={47 - o * 1.6} y={29 - o * 1.6} width={26 + o * 3.2} height={22 + o * 3.2} {...FINE} />
      ))}
      <rect x="47" y="29" width="26" height="22" fill="url(#thumb-hatch)" stroke="currentColor" />
      <rect x="51" y="33" width="18" height="14" fill="var(--color-bg)" stroke="currentColor" strokeWidth="0.4" />
      {[
        [47, 4],
        [47, 64],
        [6, 34],
        [87, 34],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="27" height="12" fill="url(#thumb-hatch)" stroke="currentColor" />
          <rect x={x + 4} y={y + 3} width="19" height="6" fill="var(--color-bg)" stroke="currentColor" strokeWidth="0.4" />
        </g>
      ))}
      <path d="M60.5 16v6.5" {...STROKE} strokeWidth="2" />
      <path d="M60.5 64v-6.5" {...STROKE} strokeWidth="1.2" />
      <path d="M33 40h5.5" {...STROKE} strokeWidth="2.6" />
      <path d="M87 40h-5.5" {...STROKE} strokeWidth="1.6" />
      <path d="M60.5 25l-2.5-3h5zM60.5 55l-2.5 3h5zM42 40l-3.5-3v6zM78 40l3.5-3v6z" fill="currentColor" />
    </>
  ),
  'swot-builder': (
    <>
      <path d="M20 10h80v60H20zM60 10v60M20 40h80" {...STROKE} />
      <Letter x={40} y={30}>S</Letter>
      <Letter x={80} y={30}>W</Letter>
      <Letter x={40} y={60}>O</Letter>
      <Letter x={80} y={60}>T</Letter>
    </>
  ),
  'stp-planner': (
    <>
      <circle cx="44" cy="40" r="26" {...STROKE} />
      <path d="M44 14v52M18 40h52M26 22l36 36" {...FINE} />
      <path d="M44 14a26 26 0 0 1 26 26H44z" fill="currentColor" />
      <path d="M78 40h20" {...STROKE} />
      <path d="M102 40l-6-4v8z" fill="currentColor" />
    </>
  ),
  'persona-builder': (
    <>
      <circle cx="60" cy="28" r="12" {...STROKE} />
      <path d="M34 72c0-16 12-26 26-26s26 10 26 26" {...STROKE} />
      <path d="M50 52l-6 20M58 50l-4 22M66 50l2 22M72 52l6 20" {...FINE} />
    </>
  ),
  'marketing-mix-planner': (
    <>
      <rect x="22" y="12" width="36" height="26" {...STROKE} />
      <rect x="62" y="12" width="36" height="26" {...STROKE} />
      <rect x="22" y="42" width="36" height="26" {...STROKE} />
      <rect x="62" y="42" width="36" height="26" {...STROKE} />
      <circle cx="60" cy="40" r="7" fill="var(--color-bg)" stroke="currentColor" />
    </>
  ),
  'value-proposition-mapper': (
    <>
      <rect x="14" y="16" width="44" height="44" {...STROKE} />
      <circle cx="86" cy="38" r="22" {...STROKE} />
      <path d="M58 38h6" {...STROKE} />
      <path d="M18 22l36 32M18 32l26 24M18 42l16 14" {...FINE} />
    </>
  ),
  'customer-journey-map': (
    <>
      <path d="M10 56C26 56 28 22 44 22s18 34 34 34 20-38 32-38" {...STROKE} strokeWidth="1.4" />
      <circle cx="10" cy="56" r="3" fill="currentColor" />
      <circle cx="44" cy="22" r="3" fill="var(--color-bg)" stroke="currentColor" />
      <circle cx="78" cy="56" r="3" fill="currentColor" />
      <circle cx="110" cy="18" r="3" fill="var(--color-bg)" stroke="currentColor" />
      <path d="M10 70h100" {...FINE} />
    </>
  ),
  'perceptual-map': (
    <>
      <path d="M60 8v64M20 40h80" {...STROKE} />
      <circle cx="38" cy="24" r="4" fill="currentColor" />
      <circle cx="46" cy="30" r="4" fill="currentColor" />
      <circle cx="42" cy="18" r="4" fill="currentColor" />
      <circle cx="82" cy="58" r="4" fill="currentColor" />
      <circle cx="80" cy="22" r="9" {...STROKE} strokeDasharray="2 2" />
    </>
  ),
  'pestel-scanner': (
    <>
      <circle cx="60" cy="40" r="6" fill="currentColor" />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const [x1, y1] = polar(60, 40, 10, i, 6)
        const [x2, y2] = polar(60, 40, 30, i, 6)
        return (
          <g key={i}>
            <path d={`M${x1} ${y1}L${x2} ${y2}`} {...STROKE} />
            <circle cx={x2} cy={y2} r="4" fill="var(--color-bg)" stroke="currentColor" />
          </g>
        )
      })}
    </>
  ),
  'break-even-pricing': (
    <>
      <path d="M16 70V10M16 70h92" {...STROKE} />
      <path d="M16 46L104 22" {...STROKE} />
      <path d="M16 70L100 14" {...STROKE} strokeWidth="1.6" />
      <circle cx="59.5" cy="41" r="3.2" fill="var(--color-bg)" stroke="currentColor" />
      <path d="M59.5 44v26" {...STROKE} strokeDasharray="2 2" />
    </>
  ),
  'customer-lifetime-value': (
    <>
      <path d="M16 70V10M16 70h92" {...STROKE} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={24 + i * 14} y={70 - (10 + i * 8)} width="8" height={10 + i * 8} {...STROKE} />
      ))}
      <path d="M22 58C50 50 80 30 104 14" {...FINE} />
    </>
  ),
}

/** The drawing for a tool or wanted tool, framed as a small plate. */
export function PlateThumbnail({ id, draft = false }: { id: string; draft?: boolean }) {
  return (
    <svg className={draft ? 'plate-thumb is-draft' : 'plate-thumb'} viewBox="0 0 120 80" aria-hidden="true" focusable="false">
      {DRAWINGS[id] ?? <path d="M30 20h60v40H30z M36 26h48v28H36z" {...FINE} />}
    </svg>
  )
}
