import { useId, useState, type ReactNode } from 'react'

interface DisclosureProps {
  /** The always-visible label of the toggle button. */
  summary: ReactNode
  children: ReactNode
  /** Wrap the toggle in a heading of this level, so it appears in the page outline. */
  headingLevel?: 2 | 3 | 4 | 5 | 6
  defaultOpen?: boolean
  className?: string
}

/**
 * A show/hide section (the WAI-ARIA disclosure pattern): a button with
 * aria-expanded that reveals the panel below it. Works with keyboard alone.
 */
export function Disclosure({
  summary,
  children,
  headingLevel,
  defaultOpen = false,
  className,
}: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()

  const toggle = (
    <button
      type="button"
      className="disclosure-toggle"
      aria-expanded={open}
      aria-controls={panelId}
      onClick={() => setOpen((value) => !value)}
    >
      <span className="disclosure-summary">{summary}</span>
      <span className="disclosure-chevron" aria-hidden="true" />
    </button>
  )
  const Heading = headingLevel ? (`h${headingLevel}` as const) : null

  return (
    <div className={['disclosure', open ? 'is-open' : '', className].filter(Boolean).join(' ')}>
      {Heading ? <Heading className="disclosure-heading">{toggle}</Heading> : toggle}
      <div id={panelId} className="disclosure-panel" hidden={!open}>
        {children}
      </div>
    </div>
  )
}
