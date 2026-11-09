import { describe, expect, it } from 'vitest'
import { INDUSTRY_PRESETS } from '../data/industries'
import {
  createBlankAnalysis,
  createPresetAnalysis,
  editAssessment,
  setEvidence,
  setSource,
  updateImplications,
  updateProfile,
} from './analysis'
import { buildMarkdown, formatDate, markdownFileName } from './markdown'

const PREPARED = new Date(2026, 10, 9) // 9 November 2026, local time
const airlines = INDUSTRY_PRESETS.find((p) => p.id === 'us-airlines')!

describe('buildMarkdown (SPEC §2.5)', () => {
  const analysis = (() => {
    let a = createPresetAnalysis(airlines)
    a = editAssessment(a, 'buyerPower', { rating: 3 })
    a = setSource(setEvidence(a, 'supplierPower', 'sourced'), 'supplierPower', 'Trade report | 2026')
    a = setEvidence(a, 'substitutes', 'sourced')
    a = updateImplications(a, { keyForces: 'Rivalry.', response: '' })
    return a
  })()
  const md = buildMarkdown(analysis, PREPARED)
  const lines = md.split('\n')

  it('starts with the title, scope, and prepared date', () => {
    expect(lines[0]).toBe('# Five Forces Analysis: U.S. passenger airlines')
    expect(md).toContain('**Scope:** U.S. domestic scheduled passenger air travel')
    expect(md).toContain('**Prepared:** 2026-11-09')
    expect(md).toContain(airlines.profile.description)
  })

  it('has a five-row table with ratings and evidence labels', () => {
    const header = lines.indexOf('| Force | Rating | Evidence |')
    expect(header).toBeGreaterThan(0)
    expect(lines[header + 1]).toBe('|---|---|---|')
    expect(lines.slice(header + 2, header + 7)).toEqual([
      '| Competitive rivalry | 5 – Very high | Illustrative example (not verified) |',
      '| Threat of new entrants | 3 – Moderate | Illustrative example (not verified) |',
      '| Supplier power | 4 – High | Supported by a source |',
      '| Buyer power | 3 – Moderate | My judgment / assumption |',
      '| Threat of substitutes | 3 – Moderate | Assumption (source missing) |',
    ])
    expect(lines[header + 7]).toBe('')
  })

  it('names the strongest force(s) and the indicative structure', () => {
    expect(md).toContain('**Strongest force(s):** Competitive rivalry')
    // 5 + 3 + 4 + 3 + 3 = 18 / 5 = 3.6
    expect(md).toContain('**Overall structure (indicative):** Challenging structure')
  })

  it('has one section per force, in the standard order', () => {
    const headings = lines.filter((l) => l.startsWith('## '))
    expect(headings).toEqual([
      '## Competitive rivalry',
      '## Threat of new entrants',
      '## Supplier power',
      '## Buyer power',
      '## Threat of substitutes',
      '## Implications',
    ])
    expect(md).toContain('**Rating:** 5 – Very high')
    expect(md).toContain(
      '**Drivers present:** Numerous or equally balanced competitors, Similar products and low switching costs, High fixed costs and low marginal costs, Perishable product or capacity',
    )
    expect(md).toContain(`**Rationale:** ${airlines.assessments.rivalry.rationale}`)
  })

  it('appends the source to sourced evidence', () => {
    expect(md).toContain('**Evidence:** Supported by a source — Source: Trade report | 2026')
    expect(md).toContain('**Evidence:** Assumption (source missing)')
  })

  it('writes the implications, with "—" for empty answers', () => {
    expect(md).toContain('**Which forces matter most:** Rivalry.')
    expect(md).toContain('**How a company could respond:** —')
  })

  it('ends with the footer note', () => {
    expect(md.trimEnd().split('\n').slice(-3)).toEqual([
      '---',
      '_Generated with Five Forces Explorer. Ratings marked "Illustrative" are',
      'teaching examples, not verified market research._',
    ])
  })

  it('escapes pipes in table cells', () => {
    const custom = updateProfile(createBlankAnalysis(), { name: 'A | B' })
    expect(buildMarkdown(custom, PREPARED)).toContain('# Five Forces Analysis: A | B')
  })
})

describe('buildMarkdown with nothing rated', () => {
  const md = buildMarkdown(createBlankAnalysis(), PREPARED)

  it('uses placeholders and omits the strongest force and structure lines', () => {
    expect(md).toContain('# Five Forces Analysis: Untitled industry')
    expect(md).toContain('**Scope:** —')
    expect(md).toContain('| Competitive rivalry | Not rated | — |')
    expect(md).toContain('**Drivers present:** None selected')
    expect(md).toContain('**Rationale:** —')
    expect(md).not.toContain('Strongest force(s)')
    expect(md).not.toContain('Overall structure')
  })
})

describe('file names and dates', () => {
  it('formats the local date as YYYY-MM-DD', () => {
    expect(formatDate(new Date(2026, 0, 5))).toBe('2026-01-05')
  })

  it('builds a readable file name', () => {
    expect(markdownFileName(createPresetAnalysis(airlines), PREPARED)).toBe(
      'five-forces-u-s-passenger-airlines-2026-11-09.md',
    )
    expect(markdownFileName(createBlankAnalysis(), PREPARED)).toBe(
      'five-forces-untitled-industry-2026-11-09.md',
    )
  })
})
