// URL-hash routing for the suite shell. Pure functions, no React and no
// window access, so every rule is unit-tested. See SPEC.md §2.2.
//
//   ''  '#'  '#/'                → Home
//   '#/<tool-id>'                → that tool, subpath ''
//   '#/<tool-id>/<subpath>'      → that tool, with <subpath>
//   anything else (unknown id)   → Home

export type Route = { kind: 'home' } | { kind: 'tool'; toolId: string; subpath: string }

export const HOME: Route = { kind: 'home' }

/** Split a path into its non-empty segments, so extra or trailing slashes are ignored. */
function segments(path: string): string[] {
  return path.split('/').filter((segment) => segment !== '')
}

/** Read a URL hash (with or without the leading '#') as a route. */
export function parseHash(hash: string, toolIds: readonly string[]): Route {
  const [toolId, ...rest] = segments(hash.replace(/^#/, ''))
  if (toolId === undefined || !toolIds.includes(toolId)) return HOME
  return { kind: 'tool', toolId, subpath: rest.join('/') }
}

/** The hash for a route: '#/', '#/<tool-id>', or '#/<tool-id>/<subpath>'. */
export function formatHash(route: Route): string {
  if (route.kind === 'home') return '#/'
  const subpath = segments(route.subpath).join('/')
  return subpath === '' ? `#/${route.toolId}` : `#/${route.toolId}/${subpath}`
}

/**
 * Which "page" a route shows: 'home' or a tool id. Keyboard focus moves to
 * the new main heading only when this changes, not when a tool changes its
 * own view.
 */
export function pageKey(route: Route): string {
  return route.kind === 'home' ? 'home' : `tool:${route.toolId}`
}

/** `document.title` for a page: "<Tool name> · <Product>" or just the product name. */
export function documentTitle(productName: string, toolName?: string): string {
  return toolName ? `${toolName} · ${productName}` : productName
}
