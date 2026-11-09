import { useId, useState } from 'react'
import { Button } from '../../../shared/components/Button'
import { Disclosure } from '../../../shared/components/Disclosure'
import { Circled, Stroke } from '../../../shared/components/Marker'
import { StatusMessage, type StatusTone } from '../../../shared/components/StatusMessage'
import { copyText } from '../../../shared/clipboard'
import { downloadTextFile } from '../../../shared/download'
import { createPen } from '../../../shared/sketch'
import { FORCES } from '../data/forces'
import { INDUSTRY_PRESETS } from '../data/industries'
import {
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
  updateImplications,
} from '../lib/analysis'
import { buildMarkdown, industryTitle, markdownFileName } from '../lib/markdown'
import { comparisonRows, formatDifference } from '../lib/summary'
import type { Analysis, Rating } from '../types'
import { BoardDiagram } from './BoardDiagram'
import { IndustryDoodle } from './IndustryDoodle'

const DISCLAIMER_TEXT =
  'Example ratings are illustrative teaching material, not verified market research.'

interface SummaryBoardProps {
  analysis: Analysis
  onChange: (next: Analysis) => void
  onBackToBoard: () => void
}

interface Status {
  tone: StatusTone
  text: string
}

/** A hatched marker bar for a rating, and a dashed outline for the comparison. */
function PressureBar({ seed, rating, comparison }: { seed: string; rating: Rating | null; comparison: Rating | null | undefined }) {
  const pen = createPen(seed)
  const hasComparison = comparison !== undefined
  const top = hasComparison ? 3 : 6
  const height = hasComparison ? 22 : 34
  const ink = rating === null ? 'pencil' : rating >= 4 ? 'pressure' : rating <= 2 ? 'pencil' : 'ink'
  let hatch = ''
  if (rating !== null) {
    const width = rating * 20
    for (let x = 4; x < width - 8; x += 7) hatch += pen.line(x, top + height, x + 9, top, 0.25)
  }
  return (
    <svg className="pressure-bar" viewBox="0 0 100 46" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {rating !== null ? (
        <g data-series="analysis">
          <path className={`stroke ink-${ink}`} d={pen.rect(0, top, rating * 20, height, 0.4)} strokeWidth={2.8} vectorEffect="non-scaling-stroke" />
          <path className={`stroke ink-${ink}`} d={hatch} strokeWidth={2} vectorEffect="non-scaling-stroke" />
        </g>
      ) : null}
      {hasComparison && comparison !== null ? (
        <path
          data-series="comparison"
          className="stroke ink-ink"
          d={pen.rect(0, 30, comparison * 20, 13, 0.3)}
          strokeWidth={2}
          strokeDasharray="5 4"
          vectorEffect="non-scaling-stroke"
        />
      ) : null}
    </svg>
  )
}

/** Summary: the pressure chart, comparison, strongest forces, structure, implications, export. SPEC §2.4. */
export function SummaryBoard({ analysis, onChange, onBackToBoard }: SummaryBoardProps) {
  const id = useId()
  const [compareId, setCompareId] = useState('')
  const [status, setStatus] = useState<Status | null>(null)

  const title = industryTitle(analysis)
  const rated = ratedCount(analysis)

  if (rated === 0) {
    return (
      <section className="summary summary-empty" aria-labelledby="view-heading">
        <h2 id="view-heading" tabIndex={-1}>
          Nothing to summarize yet
        </h2>
        <p>Rate at least one force on the board.</p>
        <Button variant="primary" onClick={onBackToBoard}>
          <span aria-hidden="true">← </span>Back to the board
        </Button>
      </section>
    )
  }

  const comparison = findPreset(compareId || null) ?? null
  const rows = comparisonRows(analysis, comparison)
  const strongest = strongestForces(analysis)
  const structure = overallStructure(analysis)
  const evidence = evidenceSummaryParts(evidenceSummary(analysis))

  const copy = async () => {
    const ok = await copyText(buildMarkdown(analysis, new Date()))
    setStatus(
      ok
        ? { tone: 'success', text: 'Copied the Markdown to your clipboard.' }
        : { tone: 'error', text: 'Could not copy to the clipboard in this browser. Try “Download .md” instead.' },
    )
  }
  const download = () => {
    const now = new Date()
    const fileName = markdownFileName(analysis, now)
    const ok = downloadTextFile(fileName, buildMarkdown(analysis, now), 'text/markdown;charset=utf-8')
    setStatus(
      ok
        ? { tone: 'success', text: `Downloaded ${fileName}.` }
        : { tone: 'error', text: 'Could not create the download in this browser.' },
    )
  }

  return (
    <section className="summary" aria-labelledby="view-heading">
      <div className="summary-grid">
        <div className="summary-left">
          <div className="summary-id">
            <IndustryDoodle presetId={analysis.presetId} name={title} className="doodle doodle-big" />
            <div className="summary-id-text">
              <h2 id="view-heading" tabIndex={-1}>
                {title}
              </h2>
              {analysis.profile.scope ? <p className="summary-scope">{analysis.profile.scope}</p> : null}
              <p className="summary-evidence">
                <span className="visually-hidden">Evidence: </span>
                {evidence.map((part, i) => (
                  <span key={part}>
                    {i > 0 ? <span aria-hidden="true"> · </span> : null}
                    <span>{part}</span>
                  </span>
                ))}
              </p>
            </div>
          </div>
          <BoardDiagram analysis={analysis} className="board-diagram board-mini" />
        </div>

        <div className="summary-right">
          <div className="table-wrap">
            <table className="pressure-table">
              <caption className="visually-hidden">
                Ratings from 1 to 5; higher means more pressure on profits
                {comparison ? `, compared with ${comparison.profile.name}` : ''}
              </caption>
              <thead className={comparison ? undefined : 'visually-hidden'}>
                <tr>
                  <th scope="col">Force</th>
                  <th scope="col">
                    <span className="visually-hidden">Chart</span>
                  </th>
                  <th scope="col">{title}</th>
                  {comparison ? (
                    <>
                      <th scope="col">{comparison.profile.name}</th>
                      <th scope="col">Difference</th>
                    </>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const isStrongest = strongest.includes(row.forceId)
                  return (
                    <tr key={row.forceId} className={isStrongest ? 'is-strongest' : undefined}>
                      <th scope="row">
                        <span className="pressure-name">
                          {row.name}
                          {isStrongest ? <Circled seed={`strong-${row.forceId}`} ink="pressure" width={2.6} /> : null}
                        </span>
                      </th>
                      <td className="pressure-bar-cell">
                        <PressureBar
                          seed={`bar-${analysis.presetId ?? 'custom'}-${row.forceId}-${row.rating}-${compareId}`}
                          rating={row.rating}
                          comparison={comparison ? row.comparison : undefined}
                        />
                      </td>
                      <td className="pressure-num">{row.rating === null ? 'Not rated' : row.rating}</td>
                      {comparison ? (
                        <>
                          <td className="pressure-num pressure-compare">{row.comparison ?? '—'}</td>
                          <td className="pressure-num pressure-diff">{formatDifference(row.difference)}</td>
                        </>
                      ) : null}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <ul className="chart-legend" aria-label="Chart legend">
            <li>
              <svg viewBox="0 0 40 16" aria-hidden="true" focusable="false">
                <Stroke d={createPen('lg1').rect(2, 2, 36, 12, 0.3) + createPen('lg2').line(8, 14, 14, 2, 0.2) + createPen('lg3').line(18, 14, 24, 2, 0.2)} width={2} />
              </svg>
              Hatched bar: {title}
            </li>
            {comparison ? (
              <li>
                <svg viewBox="0 0 40 16" aria-hidden="true" focusable="false">
                  <Stroke d={createPen('lg4').rect(2, 3, 36, 10, 0.3)} width={2} dashed />
                </svg>
                Dashed line: {comparison.profile.name}
              </li>
            ) : null}
            <li>Circled: strongest</li>
          </ul>

          <div className="field compare-field">
            <label htmlFor={`${id}-compare`}>Compare with</label>
            <select id={`${id}-compare`} value={compareId} onChange={(e) => setCompareId(e.target.value)}>
              <option value="">None</option>
              {INDUSTRY_PRESETS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.profile.name}
                </option>
              ))}
            </select>
          </div>

          <section className="summary-findings" aria-labelledby={`${id}-strongest`}>
            <h3 id={`${id}-strongest`} className="finding-label">
              {strongest.length > 1 ? 'Strongest forces' : 'Strongest force'}
            </h3>
            <p className="finding-value">{forceNames(strongest).join(', ')}</p>
          </section>
          <section className="summary-findings" aria-labelledby={`${id}-structure`}>
            <h3 id={`${id}-structure`} className="finding-label">
              Overall structure (indicative)
            </h3>
            {structure ? (
              <>
                <p className="finding-value">{structure.label}</p>
                <p className="finding-note">
                  Mean rating {structure.mean.toFixed(1)} of 5. Averages hide what matters: the strongest
                  forces usually shape profits most.
                </p>
              </>
            ) : (
              <p className="finding-note">
                {5 - rated} not rated yet. Rate all five forces to see an indicative label.
              </p>
            )}
          </section>

          <div className="export no-print">
            <div className="button-row">
              <Button variant="primary" onClick={copy}>
                Copy as Markdown
              </Button>
              <Button onClick={download}>Download .md</Button>
              <Button onClick={() => window.print()}>Print</Button>
            </div>
            <StatusMessage tone={status?.tone}>{status?.text ?? null}</StatusMessage>
          </div>
        </div>
      </div>

      <section className="implications" aria-labelledby={`${id}-implications`}>
        <h3 id={`${id}-implications`}>Implications</h3>
        <div className="implications-grid">
          <div className="field">
            <label htmlFor={`${id}-key`}>Which force or forces matter most here, and why?</label>
            <textarea
              id={`${id}-key`}
              rows={4}
              value={analysis.implications.keyForces}
              onChange={(e) => onChange(updateImplications(analysis, { keyForces: e.target.value }))}
            />
          </div>
          <div className="field">
            <label htmlFor={`${id}-response`}>
              How could a company respond: position where the forces are weakest, reshape a force, or exploit a
              change?
            </label>
            <textarea
              id={`${id}-response`}
              rows={4}
              value={analysis.implications.response}
              onChange={(e) => onChange(updateImplications(analysis, { response: e.target.value }))}
            />
          </div>
        </div>
      </section>

      <Disclosure className="recap" summary="Per-force notes" headingLevel={3}>
        <div className="recap-grid">
          {FORCES.map((force) => {
            const a = analysis.assessments[force.id]
            const drivers = driverLabels(force.id, a.driverIds)
            return (
              <article key={force.id} className="recap-item">
                <h4>{force.name}</h4>
                <dl>
                  <dt>Rating</dt>
                  <dd>{a.rating === null ? 'Not rated yet' : ratingLabel(a.rating)}</dd>
                  <dt>Drivers present</dt>
                  <dd>
                    {drivers.length ? (
                      <ul>
                        {drivers.map((label) => (
                          <li key={label}>{label}</li>
                        ))}
                      </ul>
                    ) : (
                      'None selected'
                    )}
                  </dd>
                  <dt>Rationale</dt>
                  <dd>{a.rationale.trim() || '—'}</dd>
                  <dt>Evidence</dt>
                  <dd>
                    {evidenceLabel(a)}
                    {a.evidence === 'sourced' && a.source.trim() ? ` — Source: ${a.source.trim()}` : ''}
                  </dd>
                </dl>
              </article>
            )
          })}
        </div>
      </Disclosure>

      <p className="disclaimer">{DISCLAIMER_TEXT}</p>
    </section>
  )
}
