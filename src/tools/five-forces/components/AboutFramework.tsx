import { Disclosure } from '../../../shared/components/Disclosure'
import { FACTORS_NOT_FORCES, SOURCES } from '../data/forces'

/** On-demand notes under the plate: purpose, factors not forces, sources (SPEC §2.2). */
export function AboutFramework() {
  return (
    <Disclosure className="about-framework" summary="About the framework" headingLevel={2}>
      <div className="about-body">
        <p>
          Industry structure shapes how profitable an industry is on average, and so what strategy can
          achieve. The strongest force or forces matter most.
        </p>
        <h3 className="about-heading">Factors, not forces</h3>
        <dl className="factor-list">
          {FACTORS_NOT_FORCES.map((factor) => (
            <div key={factor.name}>
              <dt>{factor.name}</dt>
              <dd>{factor.explanation}</dd>
            </div>
          ))}
        </dl>
        <h3 className="about-heading">Sources</h3>
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
      </div>
    </Disclosure>
  )
}
