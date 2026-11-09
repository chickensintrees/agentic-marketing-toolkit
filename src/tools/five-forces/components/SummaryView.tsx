import { useId, useState } from 'react'
import { Button } from '../../../shared/components/Button'
import { Card } from '../../../shared/components/Card'
import { FORCES, SHORT_NAMES, getForce } from '../data/forces'
import { INDUSTRY_PRESETS } from '../data/industries'
import {
  NOT_RATED_LABEL,
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
} from '../lib/analysis'
import { industryTitle } from '../lib/markdown'
import { chartDescription, comparisonRows, formatDifference, ratingsInOrder } from '../lib/summary'
import type { Analysis, ForceAssessment, Rating } from '../types'
import { ExportPanel } from './ExportPanel'
import { RadarChart } from './RadarChart'
import { RatingPips } from './RatingPips'

const SUMMARY_DISCLAIMER =
  'Example ratings are illustrative teaching material, not verified market research.'

const NONE = ''

interface SummaryViewProps {
  analysis: Analysis
  onGoToAnalyze: () => void
}

/** The Summary view: chart, comparison, strongest forces, recap, implications, export. */
export function SummaryView({ analysis, onGoToAnalyze }: SummaryViewProps) {
  const rated = ratedCount(analysis)

  return (
    <section className="view summary-view" aria-labelledby="view-heading">
      <div className="view-header">
        <div>
          <h2 id="view-heading" tabIndex={-1}>
            Summary
          </h2>
          <p className="view-subtitle">
            Your analysis at a glance, ready to discuss, export, or print.
          </p>
        </div>
      </div>

      {rated === 0 ? (
        <Card className="empty-state">
          <h3>Nothing to summarize yet</h3>
          <p>
            Rate at least one force in Analyze and your chart, strongest forces, and recap
            will appear here.
          </p>
          <Button variant="primary" onClick={onGoToAnalyze}>
            Go to Analyze<span aria-hidden="true"> →</span>
          </Button>
        </Card>
      ) : (
        <SummaryContent analysis={analysis} rated={rated} />
      )}

      <p className="disclaimer">
        <span aria-hidden="true">ⓘ </span>
        {SUMMARY_DISCLAIMER}
      </p>
    </section>
  )
}

function SummaryContent({ analysis, rated }: { analysis: Analysis; rated: number }) {
  const id = useId()
  const [compareId, setCompareId] = useState(NONE)
  const comparison = findPreset(compareId || null) ?? null
  const title = industryTitle(analysis)
  const evidence = evidenceSummaryParts(evidenceSummary(analysis))
  const strongest = strongestForces(analysis)
  const structure = overallStructure(analysis)
  const rows = comparisonRows(analysis, comparison)
  const total = FORCES.length
  const unrated = FORCES.filter((f) => analysis.assessments[f.id].rating === null)

  return (
    <>
      <Card as="section" className="summary-header" aria-labelledby={`${id}-industry`}>
        <p className="eyebrow">Industry</p>
        <h3 id={`${id}-industry`} className="summary-title">
          {title}
        </h3>
        {analysis.profile.scope.trim() ? (
          <p className="summary-scope">
            <strong>Scope:</strong> {analysis.profile.scope}
          </p>
        ) : null}
        {analysis.profile.description.trim() ? (
          <p className="summary-description">{analysis.profile.description}</p>
        ) : null}
        <p className="evidence-badges">
          <span className="visually-hidden">Evidence: </span>
          {evidence.map((part) => (
            <span key={part} className="badge">
              {part}
            </span>
          ))}
        </p>
      </Card>

      <div className="summary-grid">
        <Card as="section" className="chart-card" aria-labelledby={`${id}-chart`}>
          <div className="chart-card-header">
            <h3 id={`${id}-chart`}>Force ratings</h3>
            <div className="field compare-field no-print">
              <label htmlFor={`${id}-compare`}>Compare with</label>
              <select
                id={`${id}-compare`}
                value={compareId}
                onChange={(e) => setCompareId(e.target.value)}
              >
                <option value={NONE}>None</option>
                {INDUSTRY_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.profile.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <RadarChart
            labels={FORCES.map((f) => SHORT_NAMES[f.id])}
            primary={{ label: title, values: ratingsInOrder(analysis.assessments) }}
            comparison={
              comparison
                ? {
                    label: comparison.profile.name,
                    values: ratingsInOrder(comparison.assessments),
                  }
                : undefined
            }
            ariaLabel={chartDescription(title, analysis, comparison)}
          />

          {comparison ? (
            <ul className="chart-legend" aria-label="Chart legend">
              <li>
                <svg className="legend-swatch" viewBox="0 0 36 12" aria-hidden="true">
                  <line className="legend-line legend-line-primary" x1="2" y1="6" x2="34" y2="6" />
                  <circle className="legend-marker-primary" cx="18" cy="6" r="4" />
                </svg>
                <span>
                  {title} <span className="muted">(your analysis, solid line)</span>
                </span>
              </li>
              <li>
                <svg className="legend-swatch" viewBox="0 0 36 12" aria-hidden="true">
                  <line
                    className="legend-line legend-line-comparison"
                    x1="2"
                    y1="6"
                    x2="34"
                    y2="6"
                  />
                  <rect className="legend-marker-comparison" x="14" y="2" width="8" height="8" />
                </svg>
                <span>
                  {comparison.profile.name}{' '}
                  <span className="muted">(illustrative example, dashed line)</span>
                </span>
              </li>
            </ul>
          ) : null}

          {unrated.length > 0 ? (
            <p className="unrated-note">
              <strong>Not rated yet</strong> (plotted at 0):{' '}
              {unrated.map((f) => f.name).join(', ')}.
            </p>
          ) : null}

          {/* Scrolls sideways inside the card on very narrow phones; focusable so
              keyboard users can scroll it too. */}
          <div className="table-wrap" role="region" aria-labelledby={`${id}-caption`} tabIndex={0}>
            <table className="data-table ratings-table">
              <caption id={`${id}-caption`}>
                Ratings from 1 (very low) to 5 (very high pressure on profitability)
              </caption>
              <thead>
                <tr>
                  <th scope="col">Force</th>
                  <th scope="col">Your rating</th>
                  {comparison ? (
                    <>
                      <th scope="col">{comparison.profile.name}</th>
                      <th scope="col" className="nowrap" aria-label="Difference" title="Difference">
                        Diff.
                      </th>
                    </>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.forceId}>
                    <th scope="row">{row.name}</th>
                    <RatingCell rating={row.rating} />
                    {comparison ? (
                      <>
                        <RatingCell rating={row.comparison} />
                        <td className="table-number">{formatDifference(row.difference)}</td>
                      </>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="highlights">
          <Card as="section" className="highlight" aria-labelledby={`${id}-strongest`}>
            <h3 id={`${id}-strongest`}>
              Strongest {strongest.length === 1 ? 'force' : 'forces'}
            </h3>
            <ul className="strongest-list">
              {strongest.map((forceId) => (
                <li key={forceId}>
                  <span className="strongest-name">{getForce(forceId).name}</span>
                  <span className="strongest-rating">
                    {ratingLabel(analysis.assessments[forceId].rating)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="muted">
              The strongest force or forces usually shape an industry’s profitability most,
              so they are where strategy starts.
            </p>
          </Card>

          <Card as="section" className="highlight" aria-labelledby={`${id}-structure`}>
            <h3 id={`${id}-structure`}>Overall structure (indicative)</h3>
            {structure ? (
              <>
                <p className="structure-label">{structure.label}</p>
                <p className="structure-mean">
                  Mean rating {structure.mean.toFixed(1)} of 5
                </p>
              </>
            ) : (
              <p className="structure-pending">
                Rate all five forces to see an indicative label ({rated} of {total} rated).
              </p>
            )}
            <p className="muted">
              Averages hide what matters: one very strong force can hold down profits even
              when the others are weak, so read this alongside the strongest forces.
            </p>
          </Card>
        </div>
      </div>

      <section className="recap" aria-labelledby={`${id}-recap`}>
        <h3 id={`${id}-recap`}>Force by force</h3>
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
      </section>

      <Card as="section" className="implications-recap" aria-labelledby={`${id}-implications`}>
        <h3 id={`${id}-implications`}>Implications</h3>
        <dl className="field-list">
          <div>
            <dt>Which forces matter most</dt>
            <dd className="prose">{analysis.implications.keyForces.trim() || '—'}</dd>
          </div>
          <div>
            <dt>How a company could respond</dt>
            <dd className="prose">{analysis.implications.response.trim() || '—'}</dd>
          </div>
        </dl>
      </Card>

      <ExportPanel analysis={analysis} />
    </>
  )
}

/** A table cell with the number first and its word on a smaller line below. */
function RatingCell({ rating }: { rating: Rating | null }) {
  if (rating === null) {
    return (
      <td>
        <span className="table-word">{NOT_RATED_LABEL}</span>
      </td>
    )
  }
  return (
    <td>
      <span className="table-number">{rating}</span>{' '}
      <span className="table-word">{RATING_LABELS[rating]}</span>
    </td>
  )
}

interface RecapItemProps {
  name: string
  drivers: string[]
  assessment: ForceAssessment
}

function RecapItem({ name, drivers, assessment }: RecapItemProps) {
  const source = assessment.evidence === 'sourced' ? assessment.source.trim() : ''
  return (
    <Card as="article" className="recap-item">
      <h4>{name}</h4>
      <p className="recap-rating">
        <RatingPips rating={assessment.rating} />
        <span>{ratingLabel(assessment.rating)}</span>
      </p>
      <dl className="field-list">
        <div>
          <dt>Drivers present</dt>
          <dd>
            {drivers.length > 0 ? (
              <ul className="compact-list">
                {drivers.map((label) => (
                  <li key={label}>{label}</li>
                ))}
              </ul>
            ) : (
              'None selected'
            )}
          </dd>
        </div>
        <div>
          <dt>Rationale</dt>
          <dd className="prose">{assessment.rationale.trim() || '—'}</dd>
        </div>
        <div>
          <dt>Evidence</dt>
          <dd>
            {assessment.rating === null ? '—' : evidenceLabel(assessment)}
            {assessment.rating !== null && source ? (
              <>
                {' — Source: '}
                {/^https?:\/\//i.test(source) ? (
                  <a href={source} target="_blank" rel="noreferrer">
                    {source}
                  </a>
                ) : (
                  source
                )}
              </>
            ) : null}
          </dd>
        </div>
      </dl>
    </Card>
  )
}
