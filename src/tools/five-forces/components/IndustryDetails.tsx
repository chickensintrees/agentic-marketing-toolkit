import { useId } from 'react'
import { Disclosure } from '../../../shared/components/Disclosure'
import { updateProfile } from '../lib/analysis'
import type { Analysis, IndustryProfile } from '../types'

interface IndustryDetailsProps {
  analysis: Analysis
  onChange: (next: Analysis) => void
  defaultOpen?: boolean
}

/** Name, scope and notes for the industry, on demand. SPEC §2.3. */
export function IndustryDetails({ analysis, onChange, defaultOpen }: IndustryDetailsProps) {
  const id = useId()
  const { profile } = analysis
  const edit = (patch: Partial<IndustryProfile>) => onChange(updateProfile(analysis, patch))

  return (
    <Disclosure summary="Industry details" className="industry-details" defaultOpen={defaultOpen}>
      <div className="details-grid">
        <div className="field">
          <label htmlFor={`${id}-name`}>Industry name</label>
          <input
            id={`${id}-name`}
            type="text"
            value={profile.name}
            autoComplete="off"
            onChange={(e) => edit({ name: e.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor={`${id}-scope`}>Scope</label>
          <input
            id={`${id}-scope`}
            type="text"
            value={profile.scope}
            autoComplete="off"
            aria-describedby={`${id}-scope-hint`}
            onChange={(e) => edit({ scope: e.target.value })}
          />
          <p className="hint" id={`${id}-scope-hint`}>
            Product and geography, e.g. “U.S. domestic passenger air travel.” Too broad or too
            narrow distorts the analysis.
          </p>
        </div>
        <div className="field details-notes">
          <label htmlFor={`${id}-description`}>Description / notes</label>
          <textarea
            id={`${id}-description`}
            rows={3}
            value={profile.description}
            onChange={(e) => edit({ description: e.target.value })}
          />
        </div>
      </div>
    </Disclosure>
  )
}
