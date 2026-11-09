import { emblemMarkup } from './emblems'

/** One emblem as a decorative inline SVG; the surrounding control carries the name. */
export function Emblem({ id, className }: { id: string | null; className?: string }) {
  return (
    <svg className={['emblem', className].filter(Boolean).join(' ')} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <g
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        strokeLinecap="round"
        dangerouslySetInnerHTML={{ __html: emblemMarkup(id) }}
      />
    </svg>
  )
}
