import { Disclosure } from '../../../shared/components/Disclosure'
import { FACTORS_NOT_FORCES, SOURCES } from '../data/forces'

/** What the framework is for, factors that are not forces, and sources. SPEC §2.3 item 6. */
export function FrameworkNotes() {
  return (
    <Disclosure summary="About the framework" className="framework-notes">
      <div className="notes-grid">
        <div className="notes-lead">
          <p>
            Industry structure shapes an industry’s average profitability, so it is where
            strategy starts. Rivalry sits at the center; the other four forces press on it.
            The strongest force or forces matter most.
          </p>
        </div>
        <section aria-labelledby="factors-heading">
          <h3 id="factors-heading" className="notes-heading">
            Factors, not forces
          </h3>
          <dl className="factor-list">
            {FACTORS_NOT_FORCES.map((factor) => (
              <div key={factor.name}>
                <dt>{factor.name}</dt>
                <dd>{factor.explanation}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section aria-labelledby="sources-heading">
          <h3 id="sources-heading" className="notes-heading">
            Sources
          </h3>
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
        </section>
      </div>
    </Disclosure>
  )
}
