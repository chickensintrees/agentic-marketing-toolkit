// localStorage persistence with validation. See this tool's SPEC.md §2.6.
// Everything here tolerates missing, unavailable (throwing), or corrupted
// storage and falls back to a fresh blank state.

import { FORCE_ORDER, getForce } from '../data/forces'
import type {
  Analysis,
  EvidenceStatus,
  ForceAssessment,
  ForceId,
  IndustryProfile,
  Rating,
} from '../types'
import { STEP_COUNT, createBlankAnalysis, findPreset } from './analysis'

// Namespaced per the suite's tool contract (SPEC.md §3.1):
// agentic-marketing-toolkit:<tool-id>:<version>
export const STORAGE_KEY = 'agentic-marketing-toolkit:five-forces:v1'

export interface PersistedState {
  analysis: Analysis
  step: number
}

/** The minimal storage surface we use (window.localStorage satisfies it). */
export type StorageLike = Pick<Storage, 'getItem' | 'setItem'>

export function freshState(): PersistedState {
  return { analysis: createBlankAnalysis(), step: 0 }
}

/** window.localStorage, or null if it does not exist or access throws. */
export function getDefaultStorage(): StorageLike | null {
  try {
    return typeof window !== 'undefined' && window.localStorage ? window.localStorage : null
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Validation

type Obj = Record<string, unknown>

function isObject(value: unknown): value is Obj {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isString(value: unknown): value is string {
  return typeof value === 'string'
}

const EVIDENCE: readonly EvidenceStatus[] = ['illustrative', 'assumption', 'sourced']

function parseRating(value: unknown): Rating | null | undefined {
  if (value === null) return null
  if (value === 1 || value === 2 || value === 3 || value === 4 || value === 5) return value
  return undefined
}

function parseAssessment(forceId: ForceId, value: unknown): ForceAssessment | null {
  if (!isObject(value)) return null
  const rating = parseRating(value.rating)
  if (rating === undefined) return null
  if (!Array.isArray(value.driverIds) || !value.driverIds.every(isString)) return null
  if (!isString(value.rationale) || !isString(value.source)) return null
  if (!EVIDENCE.includes(value.evidence as EvidenceStatus)) return null
  // Drop driver ids that no longer exist (e.g. after a content update).
  const known = getForce(forceId).drivers.map((d) => d.id)
  const ticked = new Set(value.driverIds)
  return {
    rating,
    driverIds: known.filter((id) => ticked.has(id)),
    rationale: value.rationale,
    evidence: value.evidence as EvidenceStatus,
    source: value.source,
  }
}

function parseProfile(value: unknown): IndustryProfile | null {
  if (!isObject(value)) return null
  const { name, scope, description } = value
  if (!isString(name) || !isString(scope) || !isString(description)) return null
  return { name, scope, description }
}

/** Validate an unknown value as an Analysis. Returns null if invalid. */
export function parseAnalysis(value: unknown): Analysis | null {
  if (!isObject(value)) return null
  const { presetId, profile, assessments, implications } = value
  if (presetId !== null && !isString(presetId)) return null
  const parsedProfile = parseProfile(profile)
  if (!parsedProfile) return null
  if (!isObject(assessments)) return null
  const parsed: Partial<Record<ForceId, ForceAssessment>> = {}
  for (const id of FORCE_ORDER) {
    const a = parseAssessment(id, assessments[id])
    if (!a) return null
    parsed[id] = a
  }
  if (!isObject(implications)) return null
  if (!isString(implications.keyForces) || !isString(implications.response)) return null
  return {
    // A preset that no longer exists turns the analysis into a custom one.
    presetId: presetId !== null && findPreset(presetId) ? presetId : null,
    profile: parsedProfile,
    assessments: parsed as Record<ForceId, ForceAssessment>,
    implications: { keyForces: implications.keyForces, response: implications.response },
  }
}

/** Validate a stored payload. Returns null if anything is wrong. */
export function parseState(value: unknown): PersistedState | null {
  if (!isObject(value) || value.version !== 1) return null
  const analysis = parseAnalysis(value.analysis)
  if (!analysis) return null
  const step =
    typeof value.step === 'number' &&
    Number.isInteger(value.step) &&
    value.step >= 0 &&
    value.step < STEP_COUNT
      ? value.step
      : 0
  return { analysis, step }
}

// ---------------------------------------------------------------------------
// Load / save

export function loadState(storage: StorageLike | null = getDefaultStorage()): PersistedState {
  if (!storage) return freshState()
  try {
    const raw = storage.getItem(STORAGE_KEY)
    if (raw === null) return freshState()
    return parseState(JSON.parse(raw)) ?? freshState()
  } catch {
    return freshState()
  }
}

/** Save the state. Returns false (and never throws) if storage fails. */
export function saveState(
  state: PersistedState,
  storage: StorageLike | null = getDefaultStorage(),
): boolean {
  if (!storage) return false
  try {
    storage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: 1, analysis: state.analysis, step: state.step }),
    )
    return true
  } catch {
    return false
  }
}
