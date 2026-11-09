// Geometry for the force diagram: rivalry at the center, the four outer
// forces on the axes around it. A stronger force sits closer to the center,
// is larger, and has a heavier line. Pure functions, no React.
// See this tool's SPEC.md §2.2.

import { FORCES } from '../data/forces'
import type { ForceId, IndustryPreset, Rating } from '../types'

export type Ratings = Record<ForceId, Rating | null>
export type OuterForceId = Exclude<ForceId, 'rivalry'>

/** The diagram is drawn in a square viewBox from −EXTENT to +EXTENT. */
export const EXTENT = 500

export interface OuterPlacement {
  /** Unit vector from the center toward the force. */
  dx: number
  dy: number
  /** Degrees that turn a shape drawn "pointing outward along +y" onto this axis. */
  rotation: number
  /** Squares for the bargaining powers, triangles for the threats. */
  shape: 'square' | 'triangle'
}

export const OUTER_PLACEMENT: Record<OuterForceId, OuterPlacement> = {
  newEntrants: { dx: 0, dy: -1, rotation: 180, shape: 'triangle' },
  supplierPower: { dx: -1, dy: 0, rotation: 90, shape: 'square' },
  buyerPower: { dx: 1, dy: 0, rotation: -90, shape: 'square' },
  substitutes: { dx: 0, dy: 1, rotation: 0, shape: 'triangle' },
}

export const OUTER_FORCES: readonly OuterForceId[] = [
  'newEntrants',
  'supplierPower',
  'buyerPower',
  'substitutes',
]

/** Radius of the dotted ring for a rating: 5 is innermost. */
export function ringRadius(rating: Rating): number {
  return 430 - 35 * rating
}

/** Distance of an outer force's center from the diagram's center. Unrated forces sit on ring 1. */
export function outerDistance(rating: Rating | null): number {
  return ringRadius(rating ?? 1)
}

/** Half the width of an outer force's shape. */
export function outerHalfSize(rating: Rating | null): number {
  return 24 + 14 * (rating ?? 1)
}

/** Stroke weight of the line from the center to an outer force; 0 when unrated. */
export function lineWeight(rating: Rating | null): number {
  return rating === null ? 0 : 4 + 3.4 * rating
}

/** Radius of the rivalry disc. */
export function rivalryRadius(rating: Rating | null): number {
  return 40 + 22 * (rating ?? 1)
}

/** Center of an outer force's shape. */
export function outerCenter(forceId: OuterForceId, rating: Rating | null): { x: number; y: number } {
  const { dx, dy } = OUTER_PLACEMENT[forceId]
  const d = outerDistance(rating)
  return { x: dx * d, y: dy * d }
}

/** The ratings of a preset, keyed by force. */
export function presetRatings(preset: IndustryPreset): Ratings {
  const entries = FORCES.map((force) => [force.id, preset.assessments[force.id].rating])
  return Object.fromEntries(entries) as Ratings
}

function describe(ratings: Ratings): string {
  return FORCES.map((force) => {
    const rating = ratings[force.id]
    return rating === null ? `${force.name} not rated` : `${force.name} ${rating}`
  }).join(', ')
}

/** The diagram's accessible name: every rating it shows, in words. */
export function diagramDescription(
  title: string,
  ratings: Ratings,
  comparison: IndustryPreset | null,
): string {
  let text = `Five forces diagram for ${title}, ratings from 1 to 5: ${describe(ratings)}.`
  if (comparison) {
    text += ` Compared with ${comparison.profile.name} (illustrative example, dashed outlines): ${describe(
      presetRatings(comparison),
    )}.`
  }
  return text
}
