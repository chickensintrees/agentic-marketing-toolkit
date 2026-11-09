import type { ForceDefinition } from '../types'

interface ForceDetailProps {
  force: ForceDefinition
  /** Heading level for the detail's sub-sections, to fit the surrounding outline. */
  headingLevel: 3 | 4 | 5
}

/** Full explanation of one force: summary, drivers, high/low, example, misconception. */
export function ForceDetail({ force, headingLevel }: ForceDetailProps) {
  const H = (`h${headingLevel}` as 'h3' | 'h4' | 'h5')
  return (
    <div className="force-detail">
      <p className="force-summary">{force.summary}</p>

      <H className="detail-heading">What makes this force stronger</H>
      <ul className="driver-list">
        {force.drivers.map((driver) => (
          <li key={driver.id}>
            <strong>{driver.label}.</strong> {driver.description}
          </li>
        ))}
      </ul>

      <div className="high-low">
        <div>
          <H className="detail-heading">The force is high when…</H>
          <ul>
            {force.highWhen.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <H className="detail-heading">The force is low when…</H>
          <ul>
            {force.lowWhen.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="detail-box">
        <H className="detail-heading">Example</H>
        <p>{force.example}</p>
      </div>
      <div className="detail-box detail-box-myth">
        <H className="detail-heading">Common misconception</H>
        <p>{force.misconception}</p>
      </div>
    </div>
  )
}
