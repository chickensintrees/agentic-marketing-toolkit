import type { Rating } from '../types'
import { arrowWeight } from '../lib/plate'

const KEY: { rating: Rating; label: string }[] = [
  { rating: 1, label: 'Light pressure' },
  { rating: 3, label: 'Moderate' },
  { rating: 5, label: 'Heavy pressure' },
]

/** What the side panel shows when no force is selected: the line-weight key. */
export function KeyPanel({ hasIndustry }: { hasIndustry: boolean }) {
  return (
    <section className="key-panel" aria-labelledby="key-heading">
      <h2 id="key-heading" className="key-prompt" tabIndex={-1}>
        {hasIndustry ? 'Select a force on the plate.' : 'Choose an industry, or select a force.'}
      </h2>
      <ul className="weight-key" aria-label="Key">
        {KEY.map(({ rating, label }) => (
          <li key={rating}>
            <svg viewBox="0 0 70 16" aria-hidden="true" focusable="false">
              <line x1="0" y1="8" x2="56" y2="8" strokeWidth={arrowWeight(rating)} />
              <path d={`M70 8L55 ${8 - 4 - rating}L55 ${8 + 4 + rating}Z`} />
            </svg>
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
