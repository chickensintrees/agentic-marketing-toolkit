import { useId } from 'react'
import { Disclosure } from '../../../shared/components/Disclosure'
import { updateProfile } from '../lib/analysis'
import type { Analysis, IndustryProfile } from '../types'

interface ProfilePanelProps {
  analysis: Analysis
  onChange: (next: Analysis) => void
  onDone: () => void
}

/** The industry profile: name, scope, notes (SPEC §2.2). */
export function ProfilePanel({ analysis, onChange, onDone }: ProfilePanelProps) {
  const id = useId()
  const { profile } = analysis
  const edit = (patch: Partial<IndustryProfile>) => onChange(updateProfile(analysis, patch))

  return (
    <section className="profile-panel" aria-labelledby={`${id}-heading`}>
      <p className="panel-kicker">
        <span className="sc">The industry</span>
        {analysis.presetId !== null ? <span className="panel-evidence">Illustrative example</span> : null}
      </p>
      <h2 id={`${id}-heading`} className="panel-heading" tabIndex={-1}>
        Industry profile
      </h2>
      <div className="panel-form">
        <div className="field">
          <label htmlFor={`${id}-name`}>Industry name</label>
          <input id={`${id}-name`} type="text" value={profile.name} autoComplete="off" onChange={(e) => edit({ name: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor={`${id}-scope`}>Scope</label>
          <input
            id={`${id}-scope`}
            type="text"
            value={profile.scope}
            autoComplete="off"
            placeholder="Which product, which geography?"
            onChange={(e) => edit({ scope: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor={`${id}-description`}>Description / notes</label>
          <textarea id={`${id}-description`} rows={3} value={profile.description} onChange={(e) => edit({ description: e.target.value })} />
        </div>
      </div>
      <Disclosure className="panel-more" summary="Why scope matters">
        <p className="panel-note">
          Porter defines an industry by its products and its geography. Too broad blurs businesses
          facing different forces; too narrow misses real rivals and substitutes.
        </p>
      </Disclosure>
      <p className="panel-actions">
        <button type="button" className="button" onClick={onDone}>
          Done
        </button>
      </p>
    </section>
  )
}
