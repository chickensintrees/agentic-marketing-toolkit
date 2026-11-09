// Markdown export. See this tool's SPEC.md §2.5.
//
// Each bold "field" line is its own paragraph (separated by a blank line) so
// that the lines stay on separate lines when the Markdown is rendered.

import { slugify } from '../../../shared/download'
import { FORCES } from '../data/forces'
import type { Analysis, ForceAssessment } from '../types'
import {
  driverLabels,
  evidenceLabel,
  forceNames,
  overallStructure,
  ratingLabel,
  strongestForces,
} from './analysis'

/** Printed under the structure line: Porter's point that the strongest force(s) matter most (tool SPEC §2.4, §2.5). */
export const STRUCTURE_CAVEAT =
  "_Averages hide what matters: the strongest force or forces usually shape an industry's profitability most._"

export const UNTITLED_INDUSTRY = 'Untitled industry'
const EMPTY = '—'

/** Local calendar date as YYYY-MM-DD. */
export function formatDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/** Collapse whitespace so a value fits on one line. */
function oneLine(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

/** Make text safe inside a Markdown table cell. */
function cell(text: string): string {
  return oneLine(text).replace(/\|/g, '\\|')
}

function orDash(text: string): string {
  const trimmed = text.trim()
  return trimmed === '' ? EMPTY : trimmed
}

/**
 * Keep free text from changing the document's structure: escape a line that
 * starts like a heading, quote, or table row, and a line made only of "-" or
 * "=" (which would turn the line above it into a heading).
 */
function plainText(text: string): string {
  return text
    .split('\n')
    .map((line) => line.replace(/^( {0,3})([#>|]|[-=]+\s*$)/, '$1\\$2'))
    .join('\n')
}

export function industryTitle(analysis: Analysis): string {
  return oneLine(analysis.profile.name) || UNTITLED_INDUSTRY
}

/** Evidence text for the table; "—" when the force is not rated. */
function evidenceText(analysis: Analysis, forceIndex: number): string {
  const force = FORCES[forceIndex]
  const a = analysis.assessments[force.id]
  if (a.rating === null) return EMPTY
  return evidenceLabel(a)
}

/**
 * Evidence text for a force's own section, with its source. Shown whenever the
 * force has any input, even without a rating, so a source is never dropped.
 */
function sectionEvidence(a: ForceAssessment): string {
  const hasInput =
    a.rating !== null || a.driverIds.length > 0 || a.rationale.trim() !== '' || a.evidence === 'sourced'
  if (!hasInput) return EMPTY
  const source = a.evidence === 'sourced' ? oneLine(a.source) : ''
  return source ? `${evidenceLabel(a)} — Source: ${source}` : evidenceLabel(a)
}

export function buildMarkdown(analysis: Analysis, prepared: Date): string {
  const lines: string[] = []
  const push = (...items: string[]) => lines.push(...items)

  push(`# Five Forces Analysis: ${industryTitle(analysis)}`, '')
  push(`**Scope:** ${orDash(oneLine(analysis.profile.scope))}`, '')
  push(`**Prepared:** ${formatDate(prepared)}`, '')

  const description = analysis.profile.description.trim()
  if (description) push(plainText(description), '')

  push('| Force | Rating | Evidence |', '|---|---|---|')
  FORCES.forEach((force, i) => {
    const a = analysis.assessments[force.id]
    push(`| ${cell(force.name)} | ${ratingLabel(a.rating)} | ${cell(evidenceText(analysis, i))} |`)
  })
  push('')

  const strongest = strongestForces(analysis)
  if (strongest.length > 0) {
    push(`**Strongest force(s):** ${forceNames(strongest).join(', ')}`, '')
  }
  const structure = overallStructure(analysis)
  if (structure) {
    push(`**Overall structure (indicative):** ${structure.label}`, '')
    push(STRUCTURE_CAVEAT, '')
  }

  FORCES.forEach((force) => {
    const a = analysis.assessments[force.id]
    const drivers = driverLabels(force.id, a.driverIds)
    push(`## ${force.name}`, '')
    push(`**Rating:** ${ratingLabel(a.rating)}`, '')
    push(`**Drivers present:** ${drivers.length ? drivers.join(', ') : 'None selected'}`, '')
    push(`**Rationale:** ${plainText(orDash(a.rationale))}`, '')
    push(`**Evidence:** ${sectionEvidence(a)}`, '')
  })

  push('## Implications', '')
  push(`**Which forces matter most:** ${plainText(orDash(analysis.implications.keyForces))}`, '')
  push(`**How a company could respond:** ${plainText(orDash(analysis.implications.response))}`, '')

  push(
    '---',
    '_Generated with Five Forces Explorer. Ratings marked "Illustrative" are',
    'teaching examples, not verified market research._',
    '',
  )
  return lines.join('\n')
}

/** A file name such as `five-forces-us-passenger-airlines-2026-11-09.md`. */
export function markdownFileName(analysis: Analysis, prepared: Date): string {
  const slug = slugify(industryTitle(analysis))
  return `five-forces-${slug || 'analysis'}-${formatDate(prepared)}.md`
}
