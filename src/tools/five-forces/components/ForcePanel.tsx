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
  findPreset,
  isSourceMissing,
  setEvidence,
  setSource,
  toggleDriver,
  type AssessmentEdit,
} from '../lib/analysis'
import { arrowWeight, figureNumber } from '../lib/plate'
import type { Analysis, EvidenceStatus, ForceDefinition } from '../types'
import { ForceDetail } from './ForceDetail'

interface ForcePanelProps {
  analysis: Analysis
  force: ForceDefinition
  onChange: (next: Analysis) => void
}

/** The side panel for one force (SPEC §2.3): rate it, tick drivers, explain, state the evidence. */
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

  const evidenceOptions: EvidenceStatus[] = canBeIllustrative(analysis, force.id)
    ? ['illustrative', 'assumption', 'sourced']
    : ['assumption', 'sourced']
  const sourceMissing = isSourceMissing(assessment)

  // By default list the ticked drivers and the preset's; the rest on demand.
  const presetIds = findPreset(analysis.presetId)?.assessments[force.id].driverIds ?? []
  const shortList = force.drivers.filter(
    (d) => assessment.driverIds.includes(d.id) || presetIds.includes(d.id),
  )
  const drivers = showAll || shortList.length === 0 ? force.drivers : shortList
  const hidden = force.drivers.length - drivers.length

  return (
    <section className="force-panel" aria-labelledby={`${id}-heading`}>
      <p className="panel-kicker">
        <span className="sc">Fig. {figureNumber(force.id)}</span>
        <span className="panel-evidence">{evidenceLabel(assessment)}</span>
      </p>
      <h2 id={`${id}-heading`} className="panel-heading" tabIndex={-1}>
        {force.name}
      </h2>
      <p className="panel-question">{force.question}</p>

      <fieldset className="weight-scale" aria-describedby={`${id}-scale-hint`}>
        <legend className="visually-hidden">Rating: how strong is this force?</legend>
        <div className="weight-options">
          {RATINGS.map((rating) => (
            <label key={rating} className="weight-option">
              <input
                type="radio"
                className="visually-hidden"
                name={`${id}-rating`}
                value={rating}
                checked={assessment.rating === rating}
                onChange={() => edit({ rating })}
              />
              <svg viewBox="0 0 44 20" aria-hidden="true" focusable="false">
                <line x1="2" y1="10" x2="42" y2="10" strokeWidth={arrowWeight(rating)} />
              </svg>
              <span className="weight-number">{rating}</span>{' '}
              <span className="visually-hidden">{RATING_LABELS[rating]}</span>
            </label>
          ))}
        </div>
        <p className="weight-ends" id={`${id}-scale-hint`}>
          <span>very low</span>
          <span className="weight-ends-mid">pressure on profit</span>
          <span>very high</span>
        </p>
      </fieldset>

      <StatusMessage tone="info">
        {autoSwitched ? <>You changed an example, so its evidence is now “{EVIDENCE_LABELS.assumption}.”</> : null}
      </StatusMessage>

      <fieldset className="drivers">
        <legend className="visually-hidden">Drivers present</legend>
        <ul>
          {drivers.map((driver) => {
            const inputId = `${id}-driver-${driver.id}`
            return (
              <li key={driver.id}>
                <input
                  id={inputId}
                  type="checkbox"
                  checked={assessment.driverIds.includes(driver.id)}
                  onChange={() => apply(toggleDriver(analysis, force.id, driver.id))}
                />
                <label htmlFor={inputId}>{driver.label}</label>
              </li>
            )
          })}
        </ul>
        {hidden > 0 ? (
          <button type="button" className="button button-quiet more-drivers" onClick={() => setShowAll(true)}>
            {hidden} more drivers
          </button>
        ) : null}
      </fieldset>

      <Disclosure className="panel-more" summary="Rationale and evidence">
        <div className="panel-form">
          <div className="field">
            <label htmlFor={`${id}-rationale`}>Rationale</label>
            <textarea
              id={`${id}-rationale`}
              rows={4}
              placeholder="Explain your rating."
              value={assessment.rationale}
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
              <div className="field">
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
                    <span aria-hidden="true">† </span>
                    Add a citation or link. Until then this force reads “{SOURCE_MISSING_LABEL}.”
                  </p>
                ) : null}
              </div>
            ) : null}
          </fieldset>
        </div>
      </Disclosure>

      <Disclosure className="panel-more" summary="About this force">
        <ForceDetail force={force} headingLevel={4} />
      </Disclosure>
    </section>
  )
}
