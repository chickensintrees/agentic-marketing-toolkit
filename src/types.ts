// Shared data types. See SPEC.md §3.1.

export type ForceId =
  | 'rivalry'
  | 'newEntrants'
  | 'supplierPower'
  | 'buyerPower'
  | 'substitutes'

export type Rating = 1 | 2 | 3 | 4 | 5
export type EvidenceStatus = 'illustrative' | 'assumption' | 'sourced'

export interface Driver {
  id: string // kebab-case, unique within its force
  label: string // short, e.g. "High switching costs for buyers"
  description: string // one sentence: why this strengthens the force
}

export interface ForceDefinition {
  id: ForceId
  name: string // "Threat of new entrants"
  shortName: string // compact label for charts and the step list, e.g. "New entrants"
  question: string // "How easy is it for new competitors to enter?"
  summary: string
  drivers: Driver[] // 4–8 drivers
  highWhen: string[]
  lowWhen: string[]
  example: string
  misconception: string
}

export interface ForceAssessment {
  rating: Rating | null
  driverIds: string[]
  rationale: string
  evidence: EvidenceStatus
  source: string
}

export interface IndustryProfile {
  name: string
  scope: string
  description: string
}

export interface IndustryPreset {
  id: string // kebab-case, unique, equals the file name
  profile: IndustryProfile
  assessments: Record<ForceId, ForceAssessment> // evidence: 'illustrative'
}

export interface Analysis {
  presetId: string | null // null = custom industry
  profile: IndustryProfile
  assessments: Record<ForceId, ForceAssessment>
  implications: { keyForces: string; response: string }
}
