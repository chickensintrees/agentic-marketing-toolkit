import { useId } from 'react'
import { updateImplications } from '../lib/analysis'
import type { Analysis } from '../types'

interface ImplicationsPanelProps {
  analysis: Analysis
  onChange: (next: Analysis) => void
  onViewSummary: () => void
}

/** The two implications prompts (SPEC §2.2). */
export function ImplicationsPanel({ analysis, onChange, onViewSummary }: ImplicationsPanelProps) {
  const id = useId()
  const { implications } = analysis
  return (
    <section className="implications-panel" aria-labelledby={`${id}-heading`}>
      <p className="panel-kicker">
        <span className="sc">Fig. 2</span>
      </p>
      <h2 id={`${id}-heading`} className="panel-heading" tabIndex={-1}>
        Implications
      </h2>
      <div className="panel-form">
        <div className="field">
          <label htmlFor={`${id}-key`}>Which force or forces matter most here, and why?</label>
          <textarea
            id={`${id}-key`}
            rows={4}
            value={implications.keyForces}
            onChange={(e) => onChange(updateImplications(analysis, { keyForces: e.target.value }))}
          />
        </div>
        <div className="field">
          <label htmlFor={`${id}-response`}>
            How could a company respond — position where the forces are weakest, reshape a force, or
            exploit a change?
          </label>
          <textarea
            id={`${id}-response`}
            rows={4}
            value={implications.response}
            onChange={(e) => onChange(updateImplications(analysis, { response: e.target.value }))}
          />
        </div>
      </div>
      <p className="panel-actions">
        <button type="button" className="button button-primary" onClick={onViewSummary}>
          View the summary
        </button>
      </p>
    </section>
  )
}
