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
  isSourceMissing,
  setEvidence,
  setSource,
  toggleDriver,
  type AssessmentEdit,
} from '../lib/analysis'
import type { Analysis, EvidenceStatus, ForceDefinition } from '../types'
import { ForceDetail } from './ForceDetail'

interface ForceStepProps {
  analysis: Analysis
  force: ForceDefinition
  stepLabel: string
  onChange: (next: Analysis) => void
}

/** Analyze steps 1–5: rate one force, tick its drivers, explain, and state the evidence. */
export function ForceStep({ analysis, force, stepLabel, onChange }: ForceStepProps) {
  const id = useId()
  const assessment = analysis.assessments[force.id]
  const [autoSwitched, setAutoSwitched] = useState(false)

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

  return (
    <div className="step force-step">
      <p className="eyebrow">{stepLabel}</p>
      <h3 id="step-heading" className="step-heading" tabIndex={-1}>
        {force.name}
      </h3>
      <p className="force-question">{force.question}</p>

      <Disclosure
        className="learn-more"
        summary="About this force: what drives it, what high and low look like, and a common misconception"
      >
        <ForceDetail force={force} headingLevel={4} />
      </Disclosure>

      <fieldset className="field rating-field" aria-describedby={`${id}-rating-hint`}>
        <legend>Rating: how strong is this force?</legend>
        <p className="hint" id={`${id}-rating-hint`}>
          For every force, a higher rating means more pressure on industry profitability.
          For example, “Threat of new entrants: High” means entry is easy.
        </p>
        <div className="rating-options">
          {RATINGS.map((rating) => (
            <label key={rating} className="rating-option">
              <input
                type="radio"
                name={`${id}-rating`}
                value={rating}
                checked={assessment.rating === rating}
                onChange={() => edit({ rating })}
              />
              <span className="rating-number">{rating}</span>{' '}
              <span className="rating-text">{RATING_LABELS[rating]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <StatusMessage tone="info">
        {autoSwitched ? (
          <>
            You changed this illustrative example, so its evidence is now “
            {EVIDENCE_LABELS.assumption}.” If you can cite a source, choose “
            {EVIDENCE_LABELS.sourced}.”
          </>
        ) : null}
      </StatusMessage>

      <fieldset className="field" aria-describedby={`${id}-drivers-hint`}>
        <legend>Drivers present</legend>
        <p className="hint" id={`${id}-drivers-hint`}>
          Tick the conditions that apply to this industry. Each one, when present, makes
          this force stronger.
        </p>
        <ul className="checklist">
          {force.drivers.map((driver) => {
            const inputId = `${id}-driver-${driver.id}`
            return (
              <li key={driver.id}>
                <input
                  id={inputId}
                  type="checkbox"
                  checked={assessment.driverIds.includes(driver.id)}
                  aria-describedby={`${inputId}-desc`}
                  onChange={() => apply(toggleDriver(analysis, force.id, driver.id))}
                />
                <div className="check-text">
                  <label htmlFor={inputId}>{driver.label}</label>
                  <p className="check-desc" id={`${inputId}-desc`}>
                    {driver.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </fieldset>

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
                Add a citation or link. Until you do, this force is reported as “
                {SOURCE_MISSING_LABEL}.”
              </p>
            ) : null}
          </div>
        ) : null}
      </fieldset>
    </div>
  )
}
