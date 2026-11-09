import { Disclosure } from '../../../shared/components/Disclosure'
import type { ForceDefinition } from '../types'
import { ForceDetail } from './ForceDetail'

interface ForceCardProps {
  force: ForceDefinition
}

/** A Learn-view card: the force's name and question, expanding to its full detail. */
export function ForceCard({ force }: ForceCardProps) {
  return (
    <Disclosure
      className="force-card"
      headingLevel={4}
      summary={
        <>
          <span className="force-card-name">{force.name}</span>{' '}
          <span className="force-card-question">{force.question}</span>
        </>
      }
    >
      <ForceDetail force={force} headingLevel={5} />
    </Disclosure>
  )
}
