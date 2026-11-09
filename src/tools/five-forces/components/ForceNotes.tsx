import { useId, useState } from 'react'
import { Disclosure } from '../../../shared/components/Disclosure'
import { Circled } from '../../../shared/components/Marker'
import { StatusMessage } from '../../../shared/components/StatusMessage'
import { createPen, tallyWidth } from '../../../shared/sketch'
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
import type { Analysis, EvidenceStatus, ForceDefinition, Rating } from '../types'
import { ForceDetail } from './ForceDetail'

interface ForceNotesProps {
  analysis: Analysis
  force: ForceDefinition
  onChange: (next: Analysis) => void
}

function TallyMark({ rating, strong }: { rating: Rating; strong: boolean }) {
  const d = createPen(`rate-${rating}`).tally(30 - tallyWidth(rating) / 2, 20, rating, 28)
  return (
    <svg className="rate-tally" viewBox="0 0 60 40" aria-hidden="true" focusable="false">
      <path className={`stroke ink-${strong ? (rating >= 4 ? 'pressure' : 'ink') : 'pencil'}`} d={d} strokeWidth={strong ? 3.6 : 2.4} />
    </svg>
  )
}

/** The notes for one selected force: its question, rating, drivers, rationale, evidence. SPEC §2.3. */
export function ForceNotes({ analysis, force, onChange }: ForceNotesProps) {
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

  const evidenceOptions: EvidenceStatus[] = canBeIllustrative(analysis, force.id)
    ? ['illustrative', 'assumption', 'sourced']
    : ['assumption', 'sourced']
  const sourceMissing = isSourceMissing(assessment)
  const ticked = assessment.driverIds
  const drivers = showAll ? force.drivers : force.drivers.filter((driver) => ticked.includes(driver.id))
  const hidden = force.drivers.length - ticked.length

  return (
    <div className="force-notes">
      <h2 id="notes-heading" className="notes-title" tabIndex={-1}>
        {force.name}
      </h2>
      <p className="notes-question">{force.question}</p>

      <fieldset className="rate">
        <legend className="rate-legend">Rating: higher means more pressure on profits</legend>
        <div className="rate-options">
          {RATINGS.map((rating) => {
            const checked = assessment.rating === rating
            return (
              <label key={rating} className={checked ? 'rate-option is-checked' : 'rate-option'}>
                <input
                  className="visually-hidden"
                  type="radio"
                  name={`${id}-rating`}
                  value={rating}
                  checked={checked}
                  onChange={() => edit({ rating })}
                />
                <TallyMark rating={rating} strong={checked} />
                <span className="rate-number">{rating}</span>{' '}
                <span className="visually-hidden">{RATING_LABELS[rating]}</span>
                {checked ? <Circled seed={`rate-ring-${rating}`} /> : null}
              </label>
            )
          })}
        </div>
        <p className="rate-word" aria-hidden="true">
          {assessment.rating === null ? 'Not rated yet' : RATING_LABELS[assessment.rating]}
        </p>
      </fieldset>

      <StatusMessage tone="info">
        {autoSwitched ? (
          <>
            You changed this illustrative example, so its evidence is now “{EVIDENCE_LABELS.assumption}.”
          </>
        ) : null}
      </StatusMessage>

      <fieldset className="drivers">
        <legend className="visually-hidden">Drivers present</legend>
        {drivers.length > 0 ? (
          <ul className="driver-checks">
            {drivers.map((driver) => {
              const inputId = `${id}-driver-${driver.id}`
              const on = ticked.includes(driver.id)
              return (
                <li key={driver.id}>
                  <input
                    id={inputId}
                    type="checkbox"
                    checked={on}
                    onChange={() => apply(toggleDriver(analysis, force.id, driver.id))}
                  />
                  <label htmlFor={inputId} className={on ? undefined : 'driver-off'}>
                    {driver.label}
                  </label>
                </li>
              )
            })}
          </ul>
        ) : null}
        {force.drivers.length > ticked.length || showAll ? (
          <button type="button" className="text-button" aria-expanded={showAll} onClick={() => setShowAll((v) => !v)}>
            {showAll ? 'Show only ticked drivers' : `+ ${hidden} more drivers`}
          </button>
        ) : null}
      </fieldset>

      <Disclosure className="notes-more" summary={`Rationale and evidence · ${evidenceLabel(assessment)}`}>
        <div className="field">
          <label htmlFor={`${id}-rationale`}>Rationale</label>
          <p className="hint" id={`${id}-rationale-hint`}>
            Explain your rating.
          </p>
          <textarea
            id={`${id}-rationale`}
            rows={5}
            value={assessment.rationale}
            aria-describedby={`${id}-rationale-hint`}
            onChange={(e) => edit({ rationale: e.target.value })}
          />
        </div>
        <fieldset className="field">
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
                  <span aria-hidden="true">⚠ </span>
                  Add a citation or link. Until you do, this force is reported as “{SOURCE_MISSING_LABEL}.”
                </p>
              ) : null}
            </div>
          ) : null}
        </fieldset>
      </Disclosure>

      <Disclosure className="notes-more" summary="About this force">
        <ForceDetail force={force} headingLevel={4} />
      </Disclosure>
    </div>
  )
}
