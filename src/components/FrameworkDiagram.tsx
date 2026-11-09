import { getForce } from '../data/forces'

/** Porter's classic layout: four outside forces pressing on rivalry at the center. */
export function FrameworkDiagram() {
  return (
    <figure className="framework-diagram">
      <div className="diagram-grid">
        <div className="diagram-tile tile-entrants">{getForce('newEntrants').name}</div>
        <div className="diagram-arrow arrow-down" aria-hidden="true">↓</div>
        <div className="diagram-tile tile-suppliers">{getForce('supplierPower').name}</div>
        <div className="diagram-arrow arrow-right" aria-hidden="true">→</div>
        <div className="diagram-tile tile-rivalry">{getForce('rivalry').name}</div>
        <div className="diagram-arrow arrow-left" aria-hidden="true">←</div>
        <div className="diagram-tile tile-buyers">{getForce('buyerPower').name}</div>
        <div className="diagram-arrow arrow-up" aria-hidden="true">↑</div>
        <div className="diagram-tile tile-substitutes">{getForce('substitutes').name}</div>
      </div>
      <figcaption>
        Four outside forces press on rivalry among existing competitors at the center.
      </figcaption>
    </figure>
  )
}
