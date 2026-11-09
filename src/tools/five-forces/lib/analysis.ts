// Pure analysis logic: creating, editing, and summarizing an Analysis.
// No React here. See this tool's SPEC.md §2.3–§2.4.

import { FORCE_ORDER, getForce } from '../data/forces'
import { INDUSTRY_PRESETS } from '../data/industries'
import type {
  Analysis,
  EvidenceStatus,
  ForceAssessment,
  ForceId,
  IndustryPreset,
  IndustryProfile,
  Rating,
} from '../types'

export const RATINGS: readonly Rating[] = [1, 2, 3, 4, 5]

export const RATING_LABELS: Record<Rating, string> = {
  1: 'Very low',
  2: 'Low',
  3: 'Moderate',
  4: 'High',
  5: 'Very high',
}

export const EVIDENCE_LABELS: Record<EvidenceStatus, string> = {
  illustrative: 'Illustrative example (not verified)',
  assumption: 'My judgment / assumption',
  sourced: 'Supported by a source',
}

export const SOURCE_MISSING_LABEL = 'Assumption (source missing)'
export const NOT_RATED_LABEL = 'Not rated'

/** Analyze steps: 0 = industry, 1–5 = forces in standard order, 6 = implications. */
export const STEP_COUNT = FORCE_ORDER.length + 2
export const IMPLICATIONS_STEP = STEP_COUNT - 1

// ---------------------------------------------------------------------------
// Creating analyses

export function createBlankAssessment(): ForceAssessment {
  return {
    rating: null,
    driverIds: [],
    rationale: '',
    evidence: 'assumption',
    source: '',
  }
}

function mapForces<T>(fn: (id: ForceId) => T): Record<ForceId, T> {
  return {
    rivalry: fn('rivalry'),
    newEntrants: fn('newEntrants'),
    supplierPower: fn('supplierPower'),
    buyerPower: fn('buyerPower'),
    substitutes: fn('substitutes'),
  }
}

export function createBlankAnalysis(): Analysis {
  return {
    presetId: null,
    profile: { name: '', scope: '', description: '' },
    assessments: mapForces(() => createBlankAssessment()),
    implications: { keyForces: '', response: '' },
  }
}

/** Driver ids in the force's own order (the order of data/forces.ts), unknown ids dropped. */
export function inDriverOrder(forceId: ForceId, driverIds: readonly string[]): string[] {
  const selected = new Set(driverIds)
  return getForce(forceId)
    .drivers.map((d) => d.id)
    .filter((id) => selected.has(id))
}

export function findPreset(id: string | null): IndustryPreset | undefined {
  if (id === null) return undefined
  return INDUSTRY_PRESETS.find((p) => p.id === id)
}

/** A fresh copy of a preset. Every assessment is marked illustrative. */
export function createPresetAnalysis(preset: IndustryPreset): Analysis {
  return {
    presetId: preset.id,
    profile: { ...preset.profile },
    assessments: mapForces((id) => {
      const a = preset.assessments[id]
      return {
        rating: a.rating,
        driverIds: inDriverOrder(id, a.driverIds),
        rationale: a.rationale,
        evidence: 'illustrative',
        source: '',
      }
    }),
    implications: { keyForces: '', response: '' },
  }
}

// ---------------------------------------------------------------------------
// Editing (every function returns a new Analysis)

export function updateProfile(
  analysis: Analysis,
  patch: Partial<IndustryProfile>,
): Analysis {
  return { ...analysis, profile: { ...analysis.profile, ...patch } }
}

export function updateImplications(
  analysis: Analysis,
  patch: Partial<Analysis['implications']>,
): Analysis {
  return { ...analysis, implications: { ...analysis.implications, ...patch } }
}

function replaceAssessment(
  analysis: Analysis,
  forceId: ForceId,
  assessment: ForceAssessment,
): Analysis {
  return {
    ...analysis,
    assessments: { ...analysis.assessments, [forceId]: assessment },
  }
}

/** The fields whose edits turn an illustrative assessment into an assumption. */
export type AssessmentEdit = Partial<
  Pick<ForceAssessment, 'rating' | 'driverIds' | 'rationale'>
>

/**
 * Apply an edit to the rating, drivers, or rationale of one force.
 * Evidence rule: editing an `illustrative` assessment turns it into an
 * `assumption`, because the values are no longer the preset's.
 */
export function editAssessment(
  analysis: Analysis,
  forceId: ForceId,
  edit: AssessmentEdit,
): Analysis {
  const current = analysis.assessments[forceId]
  const next: ForceAssessment = { ...current, ...edit }
  if (current.evidence === 'illustrative' && !sameValues(current, next)) {
    next.evidence = 'assumption'
  }
  return replaceAssessment(analysis, forceId, next)
}

/** Tick or untick a driver. Driver ids are kept in the force's own order. */
export function toggleDriver(
  analysis: Analysis,
  forceId: ForceId,
  driverId: string,
): Analysis {
  const current = analysis.assessments[forceId].driverIds
  const next = current.includes(driverId)
    ? current.filter((id) => id !== driverId)
    : [...current, driverId]
  return editAssessment(analysis, forceId, { driverIds: inDriverOrder(forceId, next) })
}

export function setEvidence(
  analysis: Analysis,
  forceId: ForceId,
  evidence: EvidenceStatus,
): Analysis {
  const current = analysis.assessments[forceId]
  return replaceAssessment(analysis, forceId, { ...current, evidence })
}

export function setSource(
  analysis: Analysis,
  forceId: ForceId,
  source: string,
): Analysis {
  const current = analysis.assessments[forceId]
  return replaceAssessment(analysis, forceId, { ...current, source })
}

// ---------------------------------------------------------------------------
// Comparing against a preset

function sameDriverSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false
  const set = new Set(a)
  return b.every((id) => set.has(id))
}

function sameValues(a: ForceAssessment, b: ForceAssessment): boolean {
  return (
    a.rating === b.rating &&
    a.rationale === b.rationale &&
    sameDriverSet(a.driverIds, b.driverIds)
  )
}

/**
 * Whether the "Illustrative example" evidence option may be offered: only
 * while the force still holds exactly the values that came from its preset.
 */
export function canBeIllustrative(analysis: Analysis, forceId: ForceId): boolean {
  const assessment = analysis.assessments[forceId]
  if (assessment.evidence === 'illustrative') return true
  const preset = findPreset(analysis.presetId)
  if (!preset) return false
  return sameValues(assessment, preset.assessments[forceId])
}

/**
 * True when the analysis contains anything the user would lose by switching
 * industry: any difference from a freshly loaded preset (or a blank analysis
 * for a custom industry) in the profile, ratings, drivers, rationales,
 * evidence, sources, or implications.
 */
export function hasUserInput(analysis: Analysis): boolean {
  const preset = findPreset(analysis.presetId)
  const baseline = preset ? createPresetAnalysis(preset) : createBlankAnalysis()
  const p = analysis.profile
  const bp = baseline.profile
  if (p.name !== bp.name || p.scope !== bp.scope || p.description !== bp.description) {
    return true
  }
  if (
    analysis.implications.keyForces !== baseline.implications.keyForces ||
    analysis.implications.response !== baseline.implications.response
  ) {
    return true
  }
  return FORCE_ORDER.some((id) => {
    const a = analysis.assessments[id]
    const b = baseline.assessments[id]
    return !sameValues(a, b) || a.evidence !== b.evidence || a.source !== b.source
  })
}

// ---------------------------------------------------------------------------
// Labels

export function ratingLabel(rating: Rating | null): string {
  return rating === null ? NOT_RATED_LABEL : `${rating} – ${RATING_LABELS[rating]}`
}

export function isSourceMissing(assessment: ForceAssessment): boolean {
  return assessment.evidence === 'sourced' && assessment.source.trim() === ''
}

/** The evidence label shown in the summary and export. */
export function evidenceLabel(assessment: ForceAssessment): string {
  if (isSourceMissing(assessment)) return SOURCE_MISSING_LABEL
  return EVIDENCE_LABELS[assessment.evidence]
}

// ---------------------------------------------------------------------------
// Summaries

export function ratedCount(analysis: Analysis): number {
  return FORCE_ORDER.filter((id) => analysis.assessments[id].rating !== null).length
}

export function isStepComplete(analysis: Analysis, step: number): boolean {
  if (step === 0) {
    return analysis.profile.name.trim() !== '' && analysis.profile.scope.trim() !== ''
  }
  if (step === IMPLICATIONS_STEP) {
    return (
      analysis.implications.keyForces.trim() !== '' &&
      analysis.implications.response.trim() !== ''
    )
  }
  const forceId = FORCE_ORDER[step - 1]
  return forceId !== undefined && analysis.assessments[forceId].rating !== null
}

/** The force(s) with the highest rating, including all ties. Empty if none rated. */
export function strongestForces(analysis: Analysis): ForceId[] {
  let max = 0
  for (const id of FORCE_ORDER) {
    const r = analysis.assessments[id].rating
    if (r !== null && r > max) max = r
  }
  if (max === 0) return []
  return FORCE_ORDER.filter((id) => analysis.assessments[id].rating === max)
}

/** Mean rating of the rated forces, or null when nothing is rated. */
export function meanRating(analysis: Analysis): number | null {
  const ratings = FORCE_ORDER.map((id) => analysis.assessments[id].rating).filter(
    (r): r is Rating => r !== null,
  )
  if (ratings.length === 0) return null
  return ratings.reduce<number>((sum, r) => sum + r, 0) / ratings.length
}

export type StructureLabel =
  | 'Favorable structure'
  | 'Mixed structure'
  | 'Challenging structure'

// Small tolerance so that values like 17 / 5 compare equal to 3.4.
const EPSILON = 1e-9

/** Indicative label: mean ≤ 2.0 favorable, ≤ 3.4 mixed, otherwise challenging. */
export function structureLabel(mean: number): StructureLabel {
  if (mean <= 2.0 + EPSILON) return 'Favorable structure'
  if (mean <= 3.4 + EPSILON) return 'Mixed structure'
  return 'Challenging structure'
}

export interface OverallStructure {
  label: StructureLabel
  mean: number
}

/** The indicative overall structure. Null until all five forces are rated. */
export function overallStructure(analysis: Analysis): OverallStructure | null {
  if (ratedCount(analysis) < FORCE_ORDER.length) return null
  const mean = meanRating(analysis)
  if (mean === null) return null
  return { label: structureLabel(mean), mean }
}

export interface EvidenceSummary {
  illustrative: number
  assumption: number
  sourced: number
  sourceMissing: number
  unrated: number
}

/** Counts of evidence types across rated forces, plus the number unrated. */
export function evidenceSummary(analysis: Analysis): EvidenceSummary {
  const summary: EvidenceSummary = {
    illustrative: 0,
    assumption: 0,
    sourced: 0,
    sourceMissing: 0,
    unrated: 0,
  }
  for (const id of FORCE_ORDER) {
    const a = analysis.assessments[id]
    if (a.rating === null) summary.unrated += 1
    else if (isSourceMissing(a)) summary.sourceMissing += 1
    else summary[a.evidence] += 1
  }
  return summary
}

/** Human-readable parts, e.g. ["3 illustrative", "1 assumption", "1 sourced"]. */
export function evidenceSummaryParts(summary: EvidenceSummary): string[] {
  const parts: string[] = []
  if (summary.illustrative) parts.push(`${summary.illustrative} illustrative`)
  if (summary.assumption) {
    parts.push(`${summary.assumption} ${summary.assumption === 1 ? 'assumption' : 'assumptions'}`)
  }
  if (summary.sourced) parts.push(`${summary.sourced} sourced`)
  if (summary.sourceMissing) parts.push(`${summary.sourceMissing} source missing`)
  if (summary.unrated) parts.push(`${summary.unrated} not rated`)
  return parts
}

/** Driver labels for the ticked driver ids, in the force's order. */
export function driverLabels(forceId: ForceId, driverIds: string[]): string[] {
  const selected = new Set(driverIds)
  return getForce(forceId)
    .drivers.filter((d) => selected.has(d.id))
    .map((d) => d.label)
}

/** Force names for a list of ids, in the order given. */
export function forceNames(ids: ForceId[]): string[] {
  return ids.map((id) => getForce(id).name)
}

