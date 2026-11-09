import { useEffect, useRef } from 'react'
import { FORCES, FORCE_ORDER } from '../data/forces'
import { IMPLICATIONS_STEP, STEP_COUNT, isStepComplete, ratedCount } from '../lib/analysis'
import type { Analysis } from '../types'
import { ForceStep } from './ForceStep'
import { ImplicationsStep } from './ImplicationsStep'
import { IndustryStep } from './IndustryStep'
import { StepList } from './StepList'

interface AnalyzeViewProps {
  analysis: Analysis
  step: number
  onStepChange: (step: number) => void
  onChange: (next: Analysis) => void
  onSelectIndustry: (presetId: string | null) => void
  onStartOver: () => void
  onViewSummary: () => void
}

const STEP_LABELS: string[] = [
  'Industry',
  ...FORCES.map((f) => f.shortName),
  'Implications',
]

export function AnalyzeView({
  analysis,
  step,
  onStepChange,
  onChange,
  onSelectIndustry,
  onStartOver,
  onViewSummary,
}: AnalyzeViewProps) {
  const rated = ratedCount(analysis)
  const total = FORCE_ORDER.length
  const moveFocus = useRef(false)

  // After the user changes step, move focus to the new step's heading so
  // keyboard and screen-reader users land at the start of the new content.
  useEffect(() => {
    if (!moveFocus.current) return
    moveFocus.current = false
    document.getElementById('step-heading')?.focus()
  }, [step])

  const goTo = (next: number) => {
    if (next < 0 || next >= STEP_COUNT || next === step) return
    moveFocus.current = true
    onStepChange(next)
  }

  const stepLabel = `Step ${step + 1} of ${STEP_COUNT}`
  const forceId = FORCE_ORDER[step - 1]
  const force = FORCES.find((f) => f.id === forceId)

  let content
  if (step === 0) {
    content = (
      <IndustryStep
        analysis={analysis}
        stepLabel={stepLabel}
        onChange={onChange}
        onSelectIndustry={onSelectIndustry}
      />
    )
  } else if (force) {
    content = (
      <ForceStep
        key={force.id}
        analysis={analysis}
        force={force}
        stepLabel={`${stepLabel} · Force ${step} of ${total}`}
        onChange={onChange}
      />
    )
  } else {
    content = (
      <ImplicationsStep analysis={analysis} stepLabel={stepLabel} onChange={onChange} />
    )
  }

  return (
    <section className="view analyze-view" aria-labelledby="view-heading">
      <div className="view-header">
        <div>
          <h2 id="view-heading" tabIndex={-1}>
            Analyze an industry
          </h2>
          <p className="view-subtitle">
            Define the industry, rate each force, and explain your reasoning. Your work is
            saved in this browser as you go.
          </p>
        </div>
        <div className="analyze-toolbar">
          <div className="progress">
            <p className="progress-text">
              <strong>
                {rated} of {total}
              </strong>{' '}
              forces rated
            </p>
            <div className="meter" aria-hidden="true">
              <span style={{ width: `${(rated / total) * 100}%` }} />
            </div>
          </div>
          <button type="button" className="button button-quiet" onClick={onStartOver}>
            Start over
          </button>
        </div>
      </div>

      <div className="analyze-layout">
        <StepList
          labels={STEP_LABELS}
          current={step}
          isComplete={(s) => isStepComplete(analysis, s)}
          onSelect={goTo}
        />
        <div className="step-panel card">
          {content}
          <div className="step-nav">
            {step > 0 ? (
              <button
                type="button"
                className="button button-secondary"
                onClick={() => goTo(step - 1)}
              >
                <span aria-hidden="true">← </span>Back
              </button>
            ) : null}
            {step < IMPLICATIONS_STEP ? (
              <button
                type="button"
                className="button button-primary"
                onClick={() => goTo(step + 1)}
              >
                Next: {STEP_LABELS[step + 1]}
                <span aria-hidden="true"> →</span>
              </button>
            ) : (
              <button type="button" className="button button-primary" onClick={onViewSummary}>
                View summary<span aria-hidden="true"> →</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
