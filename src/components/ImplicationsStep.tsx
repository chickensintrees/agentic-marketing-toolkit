import { useId } from 'react'
import { forceNames, strongestForces, updateImplications } from '../lib/analysis'
import type { Analysis } from '../types'

interface ImplicationsStepProps {
  analysis: Analysis
  stepLabel: string
  onChange: (next: Analysis) => void
}

/** Step 7: what the analysis means for strategy. */
export function ImplicationsStep({ analysis, stepLabel, onChange }: ImplicationsStepProps) {
  const id = useId()
  const strongest = forceNames(strongestForces(analysis))

  return (
    <div className="step implications-step">
      <p className="eyebrow">{stepLabel}</p>
      <h3 id="step-heading" className="step-heading" tabIndex={-1}>
        Implications
      </h3>
      <p>
        The point of the analysis is strategy. The strongest force or forces usually shape
        profitability most, so start there.
      </p>
      {strongest.length > 0 ? (
        <p className="callout callout-note">
          Your strongest rated {strongest.length === 1 ? 'force is' : 'forces are'}{' '}
          <strong>{strongest.join(', ')}</strong>.
        </p>
      ) : null}

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
        <label htmlFor={`${id}-response`}>How could a company respond?</label>
        <p className="hint" id={`${id}-response-hint`}>
          Position where the forces are weakest, reshape a force in its favor, or exploit a
          change in the industry.
        </p>
        <textarea
          id={`${id}-response`}
          rows={4}
          value={analysis.implications.response}
          aria-describedby={`${id}-response-hint`}
          onChange={(e) => onChange(updateImplications(analysis, { response: e.target.value }))}
        />
      </div>
    </div>
  )
}
