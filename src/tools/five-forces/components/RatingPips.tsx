import { RATINGS } from '../lib/analysis'
import type { Rating } from '../types'

interface RatingPipsProps {
  rating: Rating | null
}

/**
 * Five small squares, filled up to the rating. Purely visual: the rating is
 * always also given as text next to it, so this is hidden from screen readers.
 */
export function RatingPips({ rating }: RatingPipsProps) {
  return (
    <span className="rating-pips" aria-hidden="true">
      {RATINGS.map((value) => (
        <span key={value} className={rating !== null && value <= rating ? 'pip is-filled' : 'pip'} />
      ))}
    </span>
  )
}
