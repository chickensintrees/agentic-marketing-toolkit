// Markdown export. See SPEC.md §2.5.
//
// Each bold "field" line is its own paragraph (separated by a blank line) so
// that the lines stay on separate lines when the Markdown is rendered.

import { FORCES } from '../data/forces'
import type { Analysis } from '../types'
import {
  driverLabels,
  evidenceLabel,
  forceNames,
  overallStructure,
  ratingLabel,
  strongestForces,
} from './analysis'

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

export function industryTitle(analysis: Analysis): string {
  return oneLine(analysis.profile.name) || UNTITLED_INDUSTRY
}

/** Evidence text for one force; "—" when the force is not rated. */
function evidenceText(analysis: Analysis, forceIndex: number): string {
  const force = FORCES[forceIndex]
  const a = analysis.assessments[force.id]
  if (a.rating === null) return EMPTY
  return evidenceLabel(a)
}

export function buildMarkdown(analysis: Analysis, prepared: Date): string {
  const lines: string[] = []
  const push = (...items: string[]) => lines.push(...items)

  push(`# Five Forces Analysis: ${industryTitle(analysis)}`, '')
  push(`**Scope:** ${orDash(oneLine(analysis.profile.scope))}`, '')
  push(`**Prepared:** ${formatDate(prepared)}`, '')

  const description = analysis.profile.description.trim()
  if (description) push(description, '')

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
  }

  FORCES.forEach((force, i) => {
    const a = analysis.assessments[force.id]
    const drivers = driverLabels(force.id, a.driverIds)
    let evidence = evidenceText(analysis, i)
    if (a.rating !== null && a.evidence === 'sourced' && a.source.trim() !== '') {
      evidence += ` — Source: ${oneLine(a.source)}`
    }
    push(`## ${force.name}`, '')
    push(`**Rating:** ${ratingLabel(a.rating)}`, '')
    push(`**Drivers present:** ${drivers.length ? drivers.join(', ') : 'None selected'}`, '')
    push(`**Rationale:** ${orDash(a.rationale)}`, '')
    push(`**Evidence:** ${evidence}`, '')
  })

  push('## Implications', '')
  push(`**Which forces matter most:** ${orDash(analysis.implications.keyForces)}`, '')
  push(`**How a company could respond:** ${orDash(analysis.implications.response)}`, '')

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
  const slug = industryTitle(analysis)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/g, '')
  return `five-forces-${slug || 'analysis'}-${formatDate(prepared)}.md`
}
