// The tool's two views and the selected force. See this tool's SPEC.md §2.1
// and §2.6. (Replaces the Learn / Analyze / Summary mapping in navigation.ts,
// which is kept for reference.)

import { FORCE_ORDER } from '../data/forces'
import type { ForceId } from '../types'

export type CanvasView = 'canvas' | 'summary'

/** 'summary' → Summary; '', 'learn', 'analyze' and anything else → Canvas. */
export function canvasViewFromSubpath(subpath: string): CanvasView {
  const id = subpath.replace(/^\/+|\/+$/g, '').toLowerCase()
  return id === 'summary' ? 'summary' : 'canvas'
}

/** The subpath that opens a view: '' for the Canvas. */
export function subpathForView(view: CanvasView): string {
  return view === 'summary' ? 'summary' : ''
}

/** The persisted `step` (1–5) as a force; anything else selects nothing. */
export function forceFromStep(step: number): ForceId | null {
  return FORCE_ORDER[step - 1] ?? null
}

/** The `step` to persist for a selected force. */
export function stepForForce(forceId: ForceId): number {
  return FORCE_ORDER.indexOf(forceId) + 1
}
