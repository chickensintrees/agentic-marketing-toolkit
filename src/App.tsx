// The suite shell: header, hash routing, main content, footer. See SPEC.md §2.

import { useCallback, useEffect, useRef, type MouseEvent } from 'react'
import { PRODUCT_NAME } from './config'
import { Home } from './shell/Home'
import { SiteFooter } from './shell/SiteFooter'
import { SiteHeader } from './shell/SiteHeader'
import { documentTitle, formatHash, pageKey, parseHash } from './shell/router'
import { useHash } from './shell/useHash'
import { TOOLS, findTool } from './tools'

const TOOL_IDS = TOOLS.map((tool) => tool.id)
const MAIN_ID = 'main-content'

/** Focus the page's main heading, making it focusable first if needed. */
function focusMainHeading() {
  const heading = document.querySelector<HTMLElement>(`#${MAIN_ID} h1`)
  if (!heading) return
  if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1')
  heading.focus()
}

export default function App() {
  const route = parseHash(useHash(), TOOL_IDS)
  const tool = route.kind === 'tool' ? findTool(route.toolId) : undefined
  const subpath = route.kind === 'tool' ? route.subpath : ''
  const toolId = tool?.id
  const page = pageKey(route)

  useEffect(() => {
    document.title = documentTitle(PRODUCT_NAME, tool?.name)
  }, [tool])

  // Moving between Home and a tool (not between a tool's own views) moves
  // keyboard focus to the new main heading and scrolls to the top.
  const previousPage = useRef(page)
  useEffect(() => {
    if (previousPage.current === page) return
    previousPage.current = page
    window.scrollTo(0, 0)
    focusMainHeading()
  }, [page])

  const navigate = useCallback(
    (next: string) => {
      if (toolId) window.location.hash = formatHash({ kind: 'tool', toolId, subpath: next })
    },
    [toolId],
  )

  // The skip link must not change the hash, because the hash is the route.
  const skipToMain = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    document.getElementById(MAIN_ID)?.focus()
  }

  return (
    <>
      <a className="skip-link" href={`#${MAIN_ID}`} onClick={skipToMain}>
        Skip to main content
      </a>
      <SiteHeader toolName={tool?.name} />
      <main id={MAIN_ID} className="site-main" tabIndex={-1}>
        <div className="container">
          {tool ? <tool.Component key={tool.id} subpath={subpath} navigate={navigate} /> : <Home />}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
