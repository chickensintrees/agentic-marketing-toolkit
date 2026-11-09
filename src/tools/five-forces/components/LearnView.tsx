import { Button } from '../../../shared/components/Button'
import { FACTORS_NOT_FORCES, FORCES, SOURCES } from '../data/forces'
import { ForceCard } from './ForceCard'
import { FrameworkDiagram } from './FrameworkDiagram'

interface LearnViewProps {
  onStartAnalysis: () => void
}

export function LearnView({ onStartAnalysis }: LearnViewProps) {
  return (
    <section className="view learn-view" aria-labelledby="view-heading">
      <div className="learn-intro">
        <div className="learn-intro-text">
          <h2 id="view-heading" tabIndex={-1}>
            Learn the framework
          </h2>
          <p className="lead">
            Michael Porter’s Five Forces framework explains how the structure of an
            industry shapes its average profitability. The forces determine how the value
            an industry creates is divided: how much its companies keep, and how much is
            captured by customers, suppliers, would-be entrants, and substitutes. That
            makes industry structure the starting point for strategy.
          </p>
          <ul className="key-points">
            <li>
              <strong>Rivalry sits at the center.</strong> The other four forces press on
              it from outside.
            </li>
            <li>
              <strong>Structure, not glamour.</strong> Whether an industry is high-tech,
              fast-growing, or fashionable matters less than how its five forces line up.
            </li>
            <li>
              <strong>Focus on the strongest force or forces.</strong> They shape
              profitability most and matter most for strategy.
            </li>
            <li>
              <strong>One scale for every force.</strong> In this app, a higher rating
              always means more pressure on industry profits.
            </li>
          </ul>
        </div>
        <FrameworkDiagram />
      </div>

      <section className="learn-section" aria-labelledby="forces-heading">
        <h3 id="forces-heading">The five forces</h3>
        <p className="section-intro">
          Select a force to see what drives it, what high and low look like, an example,
          and a common misconception.
        </p>
        <ul className="force-cards">
          {FORCES.map((force) => (
            <li key={force.id}>
              <ForceCard force={force} />
            </li>
          ))}
        </ul>
      </section>

      <aside className="callout factors" aria-labelledby="factors-heading">
        <h3 id="factors-heading">Factors, not forces</h3>
        <p>
          Four things are often mistaken for extra forces. Porter treats them as{' '}
          <em>factors</em>: they matter, but only through their effect on the five forces.
          Ask how each one changes the forces in your industry.
        </p>
        <dl className="factor-list">
          {FACTORS_NOT_FORCES.map((factor) => (
            <div key={factor.name}>
              <dt>{factor.name}</dt>
              <dd>{factor.explanation}</dd>
            </div>
          ))}
        </dl>
      </aside>

      <section className="learn-section sources" aria-labelledby="sources-heading">
        <h3 id="sources-heading">Sources</h3>
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

      <div className="cta">
        <p className="cta-text">Ready to apply it to a real industry?</p>
        <Button variant="primary" onClick={onStartAnalysis}>
          Analyze an industry<span aria-hidden="true"> →</span>
        </Button>
      </div>
    </section>
  )
}
