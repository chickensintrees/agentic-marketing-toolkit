// The tool's views and how they map to the subpath the shell passes in.
// See this tool's SPEC.md §2.1.

export type View = 'learn' | 'analyze' | 'summary'

export const VIEWS: readonly { id: View; label: string }[] = [
  { id: 'learn', label: 'Learn' },
  { id: 'analyze', label: 'Analyze' },
  { id: 'summary', label: 'Summary' },
]

/** '' or 'learn' → Learn, 'analyze' → Analyze, 'summary' → Summary, anything else → Learn. */
export function viewFromSubpath(subpath: string): View {
  const id = subpath.replace(/^\/+|\/+$/g, '').toLowerCase()
  return VIEWS.find((view) => view.id === id)?.id ?? 'learn'
}
