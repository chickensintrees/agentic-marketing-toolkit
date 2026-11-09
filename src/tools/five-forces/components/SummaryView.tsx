import { useId, useState } from 'react'
import { Button } from '../../../shared/components/Button'
import { Disclosure } from '../../../shared/components/Disclosure'
import { FORCES, getForce } from '../data/forces'
import { INDUSTRY_PRESETS } from '../data/industries'
import {
  RATING_LABELS,
  driverLabels,
  evidenceLabel,
  evidenceSummary,
  evidenceSummaryParts,
  findPreset,
  overallStructure,
  ratedCount,
  ratingLabel,
  strongestForces,
  updateImplications,
} from '../lib/analysis'
import { diagramDescription, presetRatings, type Ratings } from '../lib/diagram'
import { industryTitle } from '../lib/markdown'
import { comparisonRows, formatDifference } from '../lib/summary'
import type { Analysis, ForceAssessment } from '../types'
import { ExportPanel } from './ExportPanel'
import { ForceDiagram } from './ForceDiagram'

const SUMMARY_DISCLAIMER =
  'Example ratings are illustrative teaching material, not verified market research.'
const NONE = ''

interface SummaryViewProps {
  analysis: Analysis
  onChange: (next: Analysis) => void
  onGoToCanvas: () => void
}

/** The Summary: diagram, comparison, strongest forces, structure, implications, recap, export. SPEC §2.4. */
export function SummaryView({ analysis, onChange, onGoToCanvas }: SummaryViewProps) {
  const rated = ratedCount(analysis)
  return (
    <section className="summary" aria-labelledby="view-heading">
      {rated === 0 ? (
        <div className="empty-state">
          <h2 id="view-heading" tabIndex={-1}>
            Nothing to summarize yet
          </h2>
          <p className="muted">Rate a force on the canvas first.</p>
          <Button variant="primary" onClick={onGoToCanvas}>
            Go to the canvas<span aria-hidden="true"> →</span>
          </Button>
        </div>
      ) : (
        <SummaryContent analysis={analysis} rated={rated} onChange={onChange} />
      )}
      <p className="disclaimer mono muted">{SUMMARY_DISCLAIMER}</p>
    </section>
  )
}

function SummaryContent({
  analysis,
  rated,
  onChange,
}: {
  analysis: Analysis
  rated: number
  onChange: (next: Analysis) => void
}) {
  const id = useId()
  const [compareId, setCompareId] = useState(NONE)
  const comparison = findPreset(compareId || null) ?? null
  const title = industryTitle(analysis)
  const evidence = evidenceSummaryParts(evidenceSummary(analysis))
  const strongest = strongestForces(analysis)
  const structure = overallStructure(analysis)
  const rows = comparisonRows(analysis, comparison)
  const ratings = Object.fromEntries(FORCES.map((f) => [f.id, analysis.assessments[f.id].rating])) as Ratings
  const scope = analysis.profile.scope.trim()

  return (
    <>
      <header className="summary-head">
        <h2 id="view-heading" tabIndex={-1} className="summary-title">
          {title}
        </h2>
        <p className="mono muted summary-meta">
          {scope ? <span>{scope}</span> : null}
          <span>
            <span className="visually-hidden">Evidence: </span>
            {evidence.map((part, i) => (
              <span key={part}>
                {i > 0 ? <span aria-hidden="true"> · </span> : null}
                <span>{part}</span>
              </span>
            ))}
          </span>
        </p>
      </header>

      <div className="summary-grid">
        <div className="summary-figure">
          <ForceDiagram
            ratings={ratings}
            comparison={comparison ? presetRatings(comparison) : null}
            description={diagramDescription(title, ratings, comparison)}
          />
          <div className="compare-row no-print">
            <div className="field compare-field">
              <label htmlFor={`${id}-compare`}>Compare with</label>
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
              <ul className="legend mono" aria-label="Chart legend">
                <li>
                  <span className="legend-swatch legend-solid" aria-hidden="true" />
                  {title} (solid)
                </li>
                <li>
                  <span className="legend-swatch legend-dashed" aria-hidden="true" />
                  {comparison.profile.name} (dashed outline)
                </li>
              </ul>
            ) : null}
          </div>
        </div>

        <div className="summary-data">
          <div className="table-wrap" role="region" aria-labelledby={`${id}-caption`} tabIndex={0}>
            <table className="data-table ratings-table">
              <caption id={`${id}-caption`} className="visually-hidden">
                Ratings from 1 (very low) to 5 (very high pressure on profitability)
              </caption>
              <thead>
                <tr>
                  <th scope="col">Force</th>
                  <th scope="col" className="num">
                    Rating
                  </th>
                  {comparison ? (
                    <>
                      <th scope="col" className="num">
                        {comparison.profile.name}
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
                    <th scope="row">{row.name}</th>
                    <td className="num">
                      <RatingCell rating={row.rating} />
                    </td>
                    {comparison ? (
                      <>
                        <td className="num">
                          <RatingCell rating={row.comparison} compact />
                        </td>
                        <td className="num">{formatDifference(row.difference)}</td>
                      </>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="verdicts">
            <section className="verdict" aria-labelledby={`${id}-strongest`}>
              <h3 id={`${id}-strongest`} className="mono">
                Strongest {strongest.length === 1 ? 'force' : 'forces'}
              </h3>
              <ul className="verdict-list">
                {strongest.map((forceId) => (
                  <li key={forceId}>{getForce(forceId).name}</li>
                ))}
              </ul>
            </section>
            <section className="verdict" aria-labelledby={`${id}-structure`}>
              <h3 id={`${id}-structure`} className="mono">
                Overall structure (indicative)
              </h3>
              {structure ? (
                <>
                  <p className="verdict-value">{structure.label}</p>
                  <p className="mono muted">Mean rating {structure.mean.toFixed(1)} of 5</p>
                </>
              ) : (
                <p className="muted">
                  Rate all five forces to see an indicative label ({rated} of {FORCES.length} rated).
                </p>
              )}
            </section>
          </div>
          <p className="hint caveat">
            Averages hide what matters: the strongest force or forces usually shape profitability
            most.
          </p>

          <ExportPanel analysis={analysis} />
        </div>
      </div>

      <div className="summary-more">
        <Disclosure summary="Implications" headingLevel={3} defaultOpen>
          <Implications analysis={analysis} onChange={onChange} />
        </Disclosure>
        <Disclosure summary="Force by force" headingLevel={3} className="recap">
          <div className="recap-grid">
            {FORCES.map((force) => (
              <RecapItem
                key={force.id}
                name={force.name}
                drivers={driverLabels(force.id, analysis.assessments[force.id].driverIds)}
                assessment={analysis.assessments[force.id]}
              />
            ))}
          </div>
        </Disclosure>
      </div>
    </>
  )
}

function RatingCell({ rating, compact = false }: { rating: ForceAssessment['rating']; compact?: boolean }) {
  if (rating === null) return <span className="muted">Not rated</span>
  return (
    <span className="rating-cell">
      <span className="squares" aria-hidden="true" hidden={compact}>
        {[1, 2, 3, 4, 5].map((i) => (
          <i key={i} className={i <= rating ? 'on' : undefined} />
        ))}
      </span>
      <span className="rating-cell-num" aria-hidden="true">
        {rating}
      </span>
      <span className="visually-hidden">
        {rating} {RATING_LABELS[rating]}
      </span>
    </span>
  )
}

function Implications({ analysis, onChange }: { analysis: Analysis; onChange: (next: Analysis) => void }) {
  const id = useId()
  const { keyForces, response } = analysis.implications
  return (
    <div className="implications">
      <div className="field">
        <label htmlFor={`${id}-key`}>Which force or forces matter most here, and why?</label>
        <textarea
          id={`${id}-key`}
          rows={4}
          value={keyForces}
          onChange={(e) => onChange(updateImplications(analysis, { keyForces: e.target.value }))}
        />
      </div>
      <div className="field">
        <label htmlFor={`${id}-response`}>
          How could a company respond: position where the forces are weakest, reshape a force, or
          exploit a change?
        </label>
        <textarea
          id={`${id}-response`}
          rows={4}
          value={response}
          onChange={(e) => onChange(updateImplications(analysis, { response: e.target.value }))}
        />
      </div>
    </div>
  )
}

function RecapItem({
  name,
  drivers,
  assessment,
}: {
  name: string
  drivers: string[]
  assessment: ForceAssessment
}) {
  return (
    <article className="recap-item">
      <h4>{name}</h4>
      <dl>
        <dt>Rating</dt>
        <dd>{ratingLabel(assessment.rating)}</dd>
        <dt>Drivers</dt>
        <dd>
          {drivers.length ? (
            <ul>
              {drivers.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          ) : (
            'None selected'
          )}
        </dd>
        <dt>Rationale</dt>
        <dd>{assessment.rationale.trim() || '—'}</dd>
        <dt>Evidence</dt>
        <dd>
          {evidenceLabel(assessment)}
          {assessment.evidence === 'sourced' && assessment.source.trim() ? (
            <>
              {' '}
              — Source: {assessment.source}
            </>
          ) : null}
        </dd>
      </dl>
    </article>
  )
}
