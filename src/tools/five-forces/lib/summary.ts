// Pure helpers for the Summary view: the comparison table and the radar
// chart's text description. See this tool's SPEC.md §2.4.

import { FORCES } from '../data/forces'
import type { Analysis, ForceId, IndustryPreset, Rating } from '../types'

/** The five ratings in the standard force order; unrated forces are null. */
export function ratingsInOrder(assessments: Analysis['assessments']): (Rating | null)[] {
  return FORCES.map((force) => assessments[force.id].rating)
}

export interface ComparisonRow {
  forceId: ForceId
  name: string
  rating: Rating | null
  /** The comparison preset's rating, or null when there is no comparison. */
  comparison: Rating | null
  /** rating − comparison; null when either side is missing. */
  difference: number | null
}

/** One row per force for the Summary's data table. */
export function comparisonRows(
  analysis: Analysis,
  comparison: IndustryPreset | null,
): ComparisonRow[] {
  return FORCES.map((force) => {
    const rating = analysis.assessments[force.id].rating
    const other = comparison ? comparison.assessments[force.id].rating : null
    return {
      forceId: force.id,
      name: force.name,
      rating,
      comparison: other,
      difference: rating !== null && other !== null ? rating - other : null,
    }
  })
}

/** "+2", "0", "−1" (a true minus sign), or "—" when there is nothing to compare. */
export function formatDifference(difference: number | null): string {
  if (difference === null) return '—'
  if (difference > 0) return `+${difference}`
  if (difference < 0) return `−${Math.abs(difference)}`
  return '0'
}

function describeSeries(ratings: (Rating | null)[]): string {
  return FORCES.map((force, i) => {
    const rating = ratings[i]
    return rating === null ? `${force.name} not rated` : `${force.name} ${rating}`
  }).join(', ')
}

/** The radar chart's accessible name: every number the chart shows, in words. */
export function chartDescription(
  title: string,
  analysis: Analysis,
  comparison: IndustryPreset | null,
): string {
  let text = `Radar chart of force ratings from 0 to 5 for ${title}: ${describeSeries(
    ratingsInOrder(analysis.assessments),
  )}.`
  if (comparison) {
    text += ` Compared with ${comparison.profile.name} (illustrative example): ${describeSeries(
      ratingsInOrder(comparison.assessments),
    )}.`
  }
  return text
}
