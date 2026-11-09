import { useId } from 'react'
import { Disclosure } from '../../../shared/components/Disclosure'
import { FACTORS_NOT_FORCES, SOURCES } from '../data/forces'
import { updateProfile } from '../lib/analysis'
import type { Analysis, IndustryProfile } from '../types'

interface BoardNotesProps {
  analysis: Analysis
  onChange: (next: Analysis) => void
}

/** The notes column when no force is selected: a prompt, industry details, framework notes. SPEC §2.2. */
export function BoardNotes({ analysis, onChange }: BoardNotesProps) {
  const id = useId()
  const { profile } = analysis
  const edit = (patch: Partial<IndustryProfile>) => onChange(updateProfile(analysis, patch))
  const isCustom = analysis.presetId === null

  return (
    <div className="board-notes">
      <h2 id="notes-heading" className="notes-title" tabIndex={-1}>
        {profile.name.trim() || 'Your industry'}
      </h2>
      <p className="notes-prompt">Tap a force on the diagram to rate it.</p>

      <Disclosure className="notes-more" summary="Industry details" defaultOpen={isCustom}>
        {!isCustom ? (
          <p className="hint">
            Illustrative example: teaching material, not verified market research. Any force you edit
            becomes your own assumption.
          </p>
        ) : null}
        <div className="field">
          <label htmlFor={`${id}-name`}>Industry name</label>
          <input id={`${id}-name`} type="text" value={profile.name} autoComplete="off" onChange={(e) => edit({ name: e.target.value })} />
        </div>
        <div className="field">
          <label htmlFor={`${id}-scope`}>Scope</label>
          <p className="hint" id={`${id}-scope-hint`}>
            Which product or service, and which geography? For example, “U.S. domestic passenger air travel.”
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
          <textarea id={`${id}-description`} rows={3} value={profile.description} onChange={(e) => edit({ description: e.target.value })} />
        </div>
        <h3 className="notes-sub">Why scope matters</h3>
        <p>
          Porter defines an industry by its range of products or services and by geography. Too broad
          (“transportation”) blurs businesses that face different forces; too narrow (“one airport’s flights”)
          misses real rivals and substitutes. If two products or regions have different buyers, suppliers or
          barriers to entry, treat them as separate industries.
        </p>
      </Disclosure>

      <Disclosure className="notes-more" summary="About the framework">
        <p>
          Michael Porter’s Five Forces explain how an industry’s structure shapes its average profitability:
          how much of the value it creates its companies keep, and how much goes to customers, suppliers,
          would-be entrants and substitutes. That makes structure the starting point for strategy.
        </p>
        <ul>
          <li>
            <strong>Rivalry sits at the center.</strong> The other four forces press on it from outside.
          </li>
          <li>
            <strong>Focus on the strongest force or forces.</strong> They shape profitability most.
          </li>
          <li>
            <strong>One scale for every force.</strong> A higher rating always means more pressure on profits.
          </li>
        </ul>
        <h3 className="notes-sub">Factors, not forces</h3>
        <p>
          Four things are often mistaken for extra forces. Porter treats them as <em>factors</em> that matter
          only through their effect on the five forces.
        </p>
        <dl className="factor-list">
          {FACTORS_NOT_FORCES.map((factor) => (
            <div key={factor.name}>
              <dt>{factor.name}</dt>
              <dd>{factor.explanation}</dd>
            </div>
          ))}
        </dl>
        <h3 className="notes-sub">Sources</h3>
        <ul className="source-list">
          {SOURCES.map((source) => (
            <li key={source.authorYear}>
              {source.authorYear} {source.title}{' '}
              <cite>
                {source.journal}, {source.volume}
              </cite>
              ({source.issue}).
            </li>
          ))}
        </ul>
      </Disclosure>
    </div>
  )
}
