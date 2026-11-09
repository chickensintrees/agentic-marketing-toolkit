// Fork-editable constants. See SPEC.md §2.1.
//
// If you fork this project, change REPO_URL to your fork so that every
// GitHub link in the app (footer, Home, contribution guides) points to your
// repository. Nothing else needs to change.

export const PRODUCT_NAME = 'Agentic Marketing Toolkit'

export const REPO_URL = 'https://github.com/chickensintrees/agentic-marketing-toolkit'

/** The branch the GitHub links below point at. */
const DEFAULT_BRANCH = 'main'

/** A file in the repository, as a link to view it on GitHub. */
export function repoFileUrl(path: string): string {
  return `${REPO_URL}/blob/${DEFAULT_BRANCH}/${path}`
}

export const CONTRIBUTING_URL = repoFileUrl('CONTRIBUTING.md')

/** How to propose and build a new tool (Home, "Help build the next tool"). */
export const BUILD_A_TOOL_URL = repoFileUrl('docs/students/build-a-tool.md')

export const DISCLAIMER =
  'These tools are teaching aids. Example data is illustrative, not verified market research.'
