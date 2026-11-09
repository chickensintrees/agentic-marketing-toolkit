import { Button } from '../../../shared/components/Button'
import { getForce } from '../data/forces'
import { ratedCount } from '../lib/analysis'
import type { Ratings } from '../lib/diagram'
import { industryTitle } from '../lib/markdown'
import type { Analysis, ForceId } from '../types'
import { ForceDiagram } from './ForceDiagram'
import { ForcePanel } from './ForcePanel'
import { FrameworkNotes } from './FrameworkNotes'
import { IndustryDetails } from './IndustryDetails'
import { IndustryStrip } from './IndustryStrip'

interface CanvasViewProps {
  analysis: Analysis
  selected: ForceId
  onSelectForce: (forceId: ForceId) => void
  onChange: (next: Analysis) => void
  onSelectIndustry: (presetId: string | null) => void
  onStartOver: () => void
  onViewSummary: () => void
}

/** The one canvas: industry strip, the diagram as the interface, and the force panel. SPEC §2.3. */
export function CanvasView({
  analysis,
  selected,
  onSelectForce,
  onChange,
  onSelectIndustry,
  onStartOver,
  onViewSummary,
}: CanvasViewProps) {
  const ratings = Object.fromEntries(
    Object.entries(analysis.assessments).map(([id, a]) => [id, a.rating]),
  ) as Ratings
  const rated = ratedCount(analysis)
  const scope = analysis.profile.scope.trim()

  return (
    <div className="canvas">
      <IndustryStrip presetId={analysis.presetId} onSelect={onSelectIndustry} />

      <div className="canvas-grid">
        <div className="canvas-figure">
          <div className="canvas-industry">
            <h2 id="view-heading" tabIndex={-1} className="canvas-industry-name">
              {industryTitle(analysis)}
            </h2>
            <p className="mono muted canvas-meta">
              {scope ? <span>{scope}</span> : null}
              <span>{rated} / 5 rated</span>
            </p>
          </div>
          <ForceDiagram ratings={ratings} selected={selected} onSelect={onSelectForce} />
          <p className="diagram-key mono muted">Closer · larger · heavier = stronger</p>
        </div>

        <ForcePanel key={selected} analysis={analysis} force={getForce(selected)} onChange={onChange} />
      </div>

      <div className="canvas-more">
        <IndustryDetails
          key={analysis.presetId ?? 'custom'}
          analysis={analysis}
          onChange={onChange}
          defaultOpen={analysis.presetId === null}
        />
        <FrameworkNotes />
      </div>

      <div className="canvas-foot no-print">
        <Button variant="quiet" onClick={onStartOver}>
          Start over
        </Button>
        <Button variant="primary" onClick={onViewSummary}>
          Summary<span aria-hidden="true"> →</span>
        </Button>
      </div>
    </div>
  )
}
