import { useId, useState } from 'react'
import { Disclosure } from '../../../shared/components/Disclosure'
import { StatusMessage } from '../../../shared/components/StatusMessage'
import {
  EVIDENCE_LABELS,
  RATINGS,
  RATING_LABELS,
  SOURCE_MISSING_LABEL,
  canBeIllustrative,
  editAssessment,
  evidenceLabel,
  isSourceMissing,
  setEvidence,
  setSource,
  toggleDriver,
  type AssessmentEdit,
} from '../lib/analysis'
import type { Analysis, EvidenceStatus, ForceDefinition } from '../types'
import { ForceDetail } from './ForceDetail'

interface ForcePanelProps {
  analysis: Analysis
  force: ForceDefinition
  onChange: (next: Analysis) => void
}

/**
 * The selected force: its question, a large rating, the 1–5 scale, the
 * drivers present, and on demand the reasoning, evidence and framework detail.
 * SPEC §2.3 item 4. Render with `key={force.id}` so local state resets.
 */
export function ForcePanel({ analysis, force, onChange }: ForcePanelProps) {
  const id = useId()
  const assessment = analysis.assessments[force.id]
  const [autoSwitched, setAutoSwitched] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const apply = (next: Analysis) => {
    const before = analysis.assessments[force.id].evidence
    const after = next.assessments[force.id].evidence
    if (before === 'illustrative' && after === 'assumption') setAutoSwitched(true)
    onChange(next)
  }
  const edit = (change: AssessmentEdit) => apply(editAssessment(analysis, force.id, change))
  const chooseEvidence = (evidence: EvidenceStatus) => {
    setAutoSwitched(false)
    onChange(setEvidence(analysis, force.id, evidence))
  }

  const illustrativeAllowed = canBeIllustrative(analysis, force.id)
  const evidenceOptions: EvidenceStatus[] = illustrativeAllowed
    ? ['illustrative', 'assumption', 'sourced']
    : ['assumption', 'sourced']
  const edited = analysis.presetId !== null && !illustrativeAllowed
  const sourceMissing = isSourceMissing(assessment)
  const rating = assessment.rating
  const ticked = new Set(assessment.driverIds)
  const drivers = showAll ? force.drivers : force.drivers.filter((d) => ticked.has(d.id))

  return (
    <section className="force-panel" aria-labelledby={`${id}-name`}>
      <div className="panel-head">
        <h2 id={`${id}-name`} className="panel-name">
          {force.name}
        </h2>
        <p className="panel-question">{force.question}</p>
      </div>

      <div className="panel-rating" aria-hidden="true">
        <span className={['panel-numeral', rating === null ? 'is-empty' : ''].join(' ')}>{rating ?? '–'}</span>
        <span className="mono muted">/ 5</span>
        <span className="panel-level mono">
          <span>{rating === null ? 'Not rated' : RATING_LABELS[rating]}</span>
          {edited ? <span className="edited-mark">Edited</span> : null}
        </span>
      </div>

      <fieldset className="rating-field" aria-describedby={`${id}-scale`}>
        <legend className="visually-hidden">Rating</legend>
        <div className="rating-squares">
          {RATINGS.map((r) => (
            <label key={r} className={['rating-square', rating !== null && r <= rating ? 'is-filled' : ''].join(' ')}>
              <input
                type="radio"
                name={`${id}-rating`}
                value={r}
                checked={rating === r}
                onChange={() => edit({ rating: r })}
              />
              <span aria-hidden="true">{r}</span>
              <span className="visually-hidden">
                {r} {RATING_LABELS[r]}
              </span>
            </label>
          ))}
        </div>
        <p className="rating-scale mono muted" id={`${id}-scale`}>
          <span>Low</span>
          <span className="rating-scale-note">Higher = more pressure on profit</span>
          <span>High</span>
        </p>
      </fieldset>

      <StatusMessage tone="info">
        {autoSwitched ? <>Edited: its evidence is now “{EVIDENCE_LABELS.assumption}.”</> : null}
      </StatusMessage>

      <fieldset className="drivers">
        <div className="drivers-head">
          <legend className="mono">Drivers present</legend>
          <button
            type="button"
            className="button button-quiet mono"
            aria-expanded={showAll}
            onClick={() => setShowAll((v) => !v)}
          >
            {showAll ? 'Present only' : `All ${force.drivers.length} drivers`}
          </button>
        </div>
        {drivers.length === 0 ? (
          <p className="hint drivers-empty">None ticked.</p>
        ) : (
          <ul className="driver-checks">
            {drivers.map((driver) => {
              const inputId = `${id}-driver-${driver.id}`
              return (
                <li key={driver.id}>
                  <input
                    id={inputId}
                    type="checkbox"
                    checked={ticked.has(driver.id)}
                    onChange={() => apply(toggleDriver(analysis, force.id, driver.id))}
                  />
                  <label htmlFor={inputId}>{driver.label}</label>
                </li>
              )
            })}
          </ul>
        )}
      </fieldset>

      <p className="evidence-line mono muted">
        <span className="visually-hidden">Evidence: </span>
        {evidenceLabel(assessment)}
      </p>

      <Disclosure summary="Reasoning and evidence" className="panel-more">
        <div className="field">
          <label htmlFor={`${id}-rationale`}>Rationale</label>
          <textarea
            id={`${id}-rationale`}
            rows={5}
            value={assessment.rationale}
            placeholder="Explain your rating."
            onChange={(e) => edit({ rationale: e.target.value })}
          />
        </div>
        <fieldset className="field evidence-field">
          <legend>Evidence</legend>
          <div className="evidence-options">
            {evidenceOptions.map((evidence) => (
              <label key={evidence} className="radio-row">
                <input
                  type="radio"
                  name={`${id}-evidence`}
                  value={evidence}
                  checked={assessment.evidence === evidence}
                  onChange={() => chooseEvidence(evidence)}
                />
                <span>{EVIDENCE_LABELS[evidence]}</span>
              </label>
            ))}
          </div>
          {assessment.evidence === 'sourced' ? (
            <div className="field source-field">
              <label htmlFor={`${id}-source`}>Source (citation or URL)</label>
              <input
                id={`${id}-source`}
                type="text"
                value={assessment.source}
                autoComplete="off"
                aria-describedby={sourceMissing ? `${id}-source-hint` : undefined}
                onChange={(e) => onChange(setSource(analysis, force.id, e.target.value))}
              />
              {sourceMissing ? (
                <p className="hint hint-warning" id={`${id}-source-hint`}>
                  Add a citation or link. Until you do, this force is reported as “{SOURCE_MISSING_LABEL}.”
                </p>
              ) : null}
            </div>
          ) : null}
        </fieldset>
      </Disclosure>

      <Disclosure summary="About this force" className="panel-more">
        <ForceDetail force={force} headingLevel={3} />
      </Disclosure>
    </section>
  )
}
