import { useId } from 'react'
import { INDUSTRY_PRESETS } from '../data/industries'
import { updateProfile } from '../lib/analysis'
import type { Analysis, IndustryProfile } from '../types'

const CUSTOM = 'custom'

interface IndustryStepProps {
  analysis: Analysis
  stepLabel: string
  onChange: (next: Analysis) => void
  onSelectIndustry: (presetId: string | null) => void
}

/** Step 1: choose a preset or a custom industry and edit its profile. */
export function IndustryStep({
  analysis,
  stepLabel,
  onChange,
  onSelectIndustry,
}: IndustryStepProps) {
  const id = useId()
  const { profile } = analysis

  const edit = (patch: Partial<IndustryProfile>) => onChange(updateProfile(analysis, patch))

  return (
    <div className="step industry-step">
      <p className="eyebrow">{stepLabel}</p>
      <h3 id="step-heading" className="step-heading" tabIndex={-1}>
        Choose and define the industry
      </h3>

      <div className="field">
        <label htmlFor={`${id}-industry`}>Industry</label>
        <p className="hint" id={`${id}-industry-hint`}>
          Start from one of the illustrative examples, or analyze an industry of your own.
        </p>
        <select
          id={`${id}-industry`}
          aria-describedby={`${id}-industry-hint`}
          value={analysis.presetId ?? CUSTOM}
          onChange={(e) => onSelectIndustry(e.target.value === CUSTOM ? null : e.target.value)}
        >
          <option value={CUSTOM}>Custom industry</option>
          <optgroup label="Illustrative examples">
            {INDUSTRY_PRESETS.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.profile.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {analysis.presetId !== null ? (
        <div className="callout callout-note">
          <p>
            <strong>Illustrative example.</strong> These ratings and rationales are teaching
            material, not verified market research. Change anything you disagree with:
            any force you edit becomes your own assumption.
          </p>
        </div>
      ) : null}

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
        <p className="hint" id={`${id}-scope-hint`}>
          Which product or service, and which geography? For example, “U.S. domestic
          passenger air travel.”
        </p>
        <input
          id={`${id}-scope`}
          type="text"
          value={profile.scope}
          autoComplete="off"
          aria-describedby={`${id}-scope-hint`}
          onChange={(e) => edit({ scope: e.target.value })}
        />
      </div>

      <div className="field">
        <label htmlFor={`${id}-description`}>Description / notes</label>
        <textarea
          id={`${id}-description`}
          rows={3}
          value={profile.description}
          onChange={(e) => edit({ description: e.target.value })}
        />
      </div>

      <aside className="callout" aria-labelledby={`${id}-scope-why`}>
        <h4 id={`${id}-scope-why`}>Why scope matters</h4>
        <p>
          Porter defines an industry along two dimensions: the range of products or
          services, and geography. Draw the boundary too broadly (“transportation”) and you
          blur together businesses facing very different forces. Draw it too narrowly (“one
          airport’s flights”) and you can miss real rivals and substitutes. A useful test:
          if two products or regions have different buyers, suppliers, or barriers to
          entry, treat them as separate industries.
        </p>
      </aside>
    </div>
  )
}
