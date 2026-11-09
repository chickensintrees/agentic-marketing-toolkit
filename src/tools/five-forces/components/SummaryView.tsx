import { useId, useState } from 'react'
import { Disclosure } from '../../../shared/components/Disclosure'
import { FORCES, SHORT_NAMES } from '../data/forces'
import { INDUSTRY_PRESETS } from '../data/industries'
import {
  NOT_RATED_LABEL,
  driverLabels,
  evidenceLabel,
  evidenceSummary,
  evidenceSummaryParts,
  findPreset,
  forceNames,
  overallStructure,
  ratedCount,
  ratingLabel,
  strongestForces,
} from '../lib/analysis'
import { industryTitle } from '../lib/markdown'
import { arrowWeight, plateLabel } from '../lib/plate'
import { comparisonRows, formatDifference } from '../lib/summary'
import type { Analysis, Rating } from '../types'
import { ExportPanel } from './ExportPanel'
import { Plate } from './Plate'

const SUMMARY_DISCLAIMER = 'Example ratings are illustrative teaching material, not verified market research.'
const NONE = ''

interface SummaryViewProps {
  analysis: Analysis
  narrow: boolean
  onGoToPlate: () => void
}

/** Two drawn bars: yours solid, the comparison dashed. Same scale as the plate. */
function WeightBars({ rating, comparison }: { rating: Rating | null; comparison: Rating | null | undefined }) {
  const compare = comparison !== undefined
  return (
    <svg className="weight-bars" viewBox={`0 0 124 ${compare ? 26 : 16}`} aria-hidden="true" focusable="false">
      <line x1="0" y1="8" x2="120" y2="8" className="bar-guide" />
      {rating !== null ? <line x1="0" y1="8" x2={24 * rating} y2="8" className="bar-yours" strokeWidth={arrowWeight(rating)} /> : null}
      {compare ? (
        <>
          <line x1="0" y1="20" x2="120" y2="20" className="bar-guide" />
          {comparison !== null ? (
            <line x1="0" y1="20" x2={24 * comparison} y2="20" className="bar-compare" strokeWidth={Math.max(1.4, arrowWeight(comparison) * 0.6)} />
          ) : null}
        </>
      ) : null}
    </svg>
  )
}

/** The Summary (SPEC §2.4): the plate, the schedule of forces, comparison, notes, export. */
export function SummaryView({ analysis, narrow, onGoToPlate }: SummaryViewProps) {
  const id = useId()
  const [compareId, setCompareId] = useState(NONE)
  const comparison = findPreset(compareId === NONE ? null : compareId) ?? null
  const rated = ratedCount(analysis)
  const title = industryTitle(analysis)

  if (rated === 0) {
    return (
      <section className="summary-view" aria-labelledby={`${id}-summary`}>
        <h2 id={`${id}-summary`} className="visually-hidden">
          Summary
        </h2>
        <div className="empty-state">
          <p className="empty-line">Nothing is rated yet.</p>
          <button type="button" className="button button-primary" onClick={onGoToPlate}>
            Rate a force on the plate
          </button>
        </div>
        <p className="disclaimer">{SUMMARY_DISCLAIMER}</p>
      </section>
    )
  }

  const rows = comparisonRows(analysis, comparison)
  const strongest = strongestForces(analysis)
  const structure = overallStructure(analysis)
  const evidence = evidenceSummaryParts(evidenceSummary(analysis))

  const notes = (
    <div className="notes-body">
      {FORCES.map((force) => {
        const a = analysis.assessments[force.id]
        const drivers = driverLabels(force.id, a.driverIds)
        return (
          <section key={force.id} className="note" aria-label={force.name}>
            <h4>
              {force.name} <span className="note-rating">{ratingLabel(a.rating)}</span>
            </h4>
            <p>
              <span className="sc">Drivers</span> {drivers.length ? drivers.join(', ') : 'None selected'}
            </p>
            <p>
              <span className="sc">Rationale</span> {a.rationale || '—'}
            </p>
            <p>
              <span className="sc">Evidence</span> {evidenceLabel(a)}
              {a.evidence === 'sourced' && a.source ? ` — Source: ${a.source}` : ''}
            </p>
          </section>
        )
      })}
      <section className="note" aria-label="Implications">
        <h4>Implications</h4>
        <p>
          <span className="sc">Which forces matter most</span> {analysis.implications.keyForces || '—'}
        </p>
        <p>
          <span className="sc">How a company could respond</span> {analysis.implications.response || '—'}
        </p>
      </section>
    </div>
  )

  return (
    <section className="summary-view" aria-labelledby={`${id}-summary`}>
      <h2 id={`${id}-summary`} className="visually-hidden">
        Summary
      </h2>
      <div className="summary-grid">
        <figure className="summary-figure">
          <Plate analysis={analysis} narrow={narrow} label={plateLabel(title, analysis)} />
          <figcaption>
            {analysis.profile.scope ? <span className="summary-scope">{analysis.profile.scope}. </span> : null}
            <span className="summary-evidence">{evidence.join(' · ')}</span>
          </figcaption>
        </figure>

        <div className="summary-side">
          <div className="compare-row no-print">
            <label htmlFor={`${id}-compare`} className="sc">
              Compare with
            </label>
            <select id={`${id}-compare`} value={compareId} onChange={(e) => setCompareId(e.target.value)}>
              <option value={NONE}>None</option>
              {INDUSTRY_PRESETS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.profile.name}
                </option>
              ))}
            </select>
          </div>
          {comparison ? (
            <p className="legend">
              <svg viewBox="0 0 30 8" aria-hidden="true" focusable="false">
                <line x1="0" y1="4" x2="30" y2="4" className="bar-yours" strokeWidth={3} />
              </svg>
              <span>{title}</span>
              <svg viewBox="0 0 30 8" aria-hidden="true" focusable="false">
                <line x1="0" y1="4" x2="30" y2="4" className="bar-compare" strokeWidth={2} />
              </svg>
              <span>{comparison.profile.name} (illustrative, dashed)</span>
            </p>
          ) : null}

          <div className="table-wrap">
            <table className="data-table schedule">
              <caption>
                <span className="sc">Table 1.</span> Schedule of forces
              </caption>
              <thead>
                <tr>
                  <th scope="col">Force</th>
                  <th scope="col">
                    <span className="visually-hidden">Drawn weight</span>
                  </th>
                  <th scope="col" className="num">
                    Rating
                  </th>
                  {comparison ? (
                    <>
                      <th scope="col" className="num">
                        Compare<span className="visually-hidden">: {comparison.profile.name}</span>
                      </th>
                      <th scope="col" className="num">
                        Difference
                      </th>
                    </>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.forceId}>
                    <th scope="row">{SHORT_NAMES[row.forceId]}</th>
                    <td className="bars">
                      <WeightBars rating={row.rating} comparison={comparison ? row.comparison : undefined} />
                    </td>
                    <td className="num">{row.rating === null ? NOT_RATED_LABEL : row.rating}</td>
                    {comparison ? (
                      <>
                        <td className="num">{row.comparison ?? NOT_RATED_LABEL}</td>
                        <td className="num">{formatDifference(row.difference)}</td>
                      </>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="verdict">
            <span className="sc">Strongest</span> <span className="verdict-value">{forceNames(strongest).join(' and ')}</span>
          </p>
          {structure ? (
            <p className="verdict">
              <span className="sc">Overall (indicative)</span> <span className="verdict-value">{structure.label}</span>
              <span className="verdict-mean">Mean rating {structure.mean.toFixed(1)} of 5</span>
              <span className="verdict-caveat"> Averages hide what matters: the strongest forces usually shape profit most.</span>
            </p>
          ) : null}

          <ExportPanel analysis={analysis} />

          <Disclosure className="notes-disclosure no-print" summary="Notes by force">
            {notes}
          </Disclosure>
        </div>
      </div>

      <div className="print-only">
        <h3>Notes by force</h3>
        {notes}
      </div>
      <p className="disclaimer">{SUMMARY_DISCLAIMER}</p>
    </section>
  )
}
