// Pure helpers for the Plate (this tool's SPEC.md §2.1–2.3): which view a
// subpath opens, how the side panel maps to the persisted step, and the
// drawing scales that turn a rating into line weight and hatching.

import { FORCES, FORCE_ORDER } from '../data/forces'
import type { Analysis, ForceId, Rating } from '../types'

export type PlateView = 'plate' | 'summary'

/** 'summary' → Summary; anything else ('', 'learn', 'analyze', unknown) → Plate. */
export function plateViewFromSubpath(subpath: string): PlateView {
  const id = subpath.replace(/^\/+|\/+$/g, '').toLowerCase()
  return id === 'summary' ? 'summary' : 'plate'
}

/** The side panel: the key, one force, the industry profile, or implications. */
export type Panel = { kind: 'key' } | { kind: 'force'; forceId: ForceId } | { kind: 'profile' } | { kind: 'implications' }

export const IMPLICATIONS_PANEL_STEP = FORCE_ORDER.length + 1

/** The persisted step for a panel: 0 key, 1–5 a force, 6 implications. The profile is not persisted (0). */
export function panelToStep(panel: Panel): number {
  if (panel.kind === 'force') return FORCE_ORDER.indexOf(panel.forceId) + 1
  if (panel.kind === 'implications') return IMPLICATIONS_PANEL_STEP
  return 0
}

/** The panel for a persisted step; anything out of range opens the key. */
export function stepToPanel(step: number): Panel {
  if (Number.isInteger(step) && step >= 1 && step <= FORCE_ORDER.length) {
    return { kind: 'force', forceId: FORCE_ORDER[step - 1] }
  }
  if (step === IMPLICATIONS_PANEL_STEP) return { kind: 'implications' }
  return { kind: 'key' }
}

/** Arrow shaft weight in drawing units: 0.8 for a rating of 1 up to 7.4 for 5. */
export function arrowWeight(rating: Rating): number {
  return Math.round((0.8 + (rating - 1) * 1.65) * 100) / 100
}

/** Gap between engraved hatch lines: denser (smaller) for a stronger force. */
export function hatchGap(rating: Rating): number {
  return [16, 11, 7.5, 5, 3.4][rating - 1]
}

/** Figure number of a force on the plate: rivalry is Fig. 1.1, substitutes Fig. 1.5. */
export function figureNumber(forceId: ForceId): string {
  return `1.${FORCE_ORDER.indexOf(forceId) + 1}`
}

/** The plate's accessible name: every rating in words. */
export function plateLabel(industry: string, analysis: Analysis): string {
  const parts = FORCES.map((f) => {
    const r = analysis.assessments[f.id].rating
    return `${f.name} ${r === null ? 'not rated' : `${r} of 5`}`
  })
  return `Five forces plate for ${industry}: ${parts.join(', ')}.`
}
