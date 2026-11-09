// Hash-based view navigation. See SPEC.md §2.1.

export type View = 'learn' | 'analyze' | 'summary'

export const VIEWS: { id: View; label: string }[] = [
  { id: 'learn', label: 'Learn' },
  { id: 'analyze', label: 'Analyze' },
  { id: 'summary', label: 'Summary' },
]

/** "#analyze" → "analyze". Unknown or missing hash → "learn". */
export function viewFromHash(hash: string): View {
  const id = hash.replace(/^#/, '').toLowerCase()
  const match = VIEWS.find((v) => v.id === id)
  return match ? match.id : 'learn'
}
