import type { ForceDefinition } from '../types'
import { ForceDetail } from './ForceDetail'

interface ForceCardProps {
  force: ForceDefinition
  expanded: boolean
  onToggle: () => void
}

/** A Learn-view card: name and question, expanding to the full force detail. */
export function ForceCard({ force, expanded, onToggle }: ForceCardProps) {
  const panelId = `force-panel-${force.id}`
  return (
    <article className={expanded ? 'force-card is-open' : 'force-card'}>
      <h4 className="force-card-heading">
        <button
          type="button"
          className="force-card-toggle"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="force-card-text">
            <span className="force-card-name">{force.name}</span>{' '}
            <span className="force-card-question">{force.question}</span>
          </span>
          <span className="chevron" aria-hidden="true" />
        </button>
      </h4>
      <div id={panelId} className="force-card-panel" hidden={!expanded}>
        <ForceDetail force={force} headingLevel={5} />
      </div>
    </article>
  )
}
