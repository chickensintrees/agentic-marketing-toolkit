import { useEffect, useState } from 'react'
import { ForceDiagram } from '../tools/five-forces/components/ForceDiagram'
import { INDUSTRY_PRESETS } from '../tools/five-forces/data/industries'
import { presetRatings } from '../tools/five-forces/lib/diagram'

const CYCLE_MS = 2600

function prefersReducedMotion(): boolean {
  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Home's live picture of Five Forces Explorer: its diagram, cycling through the example industries. */
function FiveForcesVisual() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % INDUSTRY_PRESETS.length), CYCLE_MS)
    return () => window.clearInterval(timer)
  }, [])
  const preset = INDUSTRY_PRESETS[index]
  const ratings = presetRatings(preset)
  return (
    <figure className="tool-visual" aria-hidden="true">
      <ForceDiagram ratings={ratings} />
      <figcaption className="tool-visual-caption mono">
        <span>{preset.profile.name}</span>
        <span className="tool-visual-digits">
          {Object.values(ratings).join(' ')}
        </span>
      </figcaption>
    </figure>
  )
}

/**
 * A tool's picture on Home, keyed by tool id. Tools without one show
 * nothing. (The shell already depends on every tool through the registry.)
 */
export function ToolVisual({ toolId }: { toolId: string }) {
  if (toolId === 'five-forces') return <FiveForcesVisual />
  return null
}
