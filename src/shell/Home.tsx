import { Disclosure } from '../shared/components/Disclosure'
import { BUILD_A_TOOL_URL, CONTRIBUTING_URL, PRODUCT_NAME } from '../config'
import { TOOLS } from '../tools'
import { WANTED_TOOLS } from '../tools/wanted'
import { formatHash } from './router'
import { ToolVisual } from './ToolVisual'
import { WantedMark } from './WantedMark'

const number = (n: number) => String(n).padStart(2, '0')

/** Home: the product name, one numbered entry per tool, and the "Build next" grid. SPEC §2.3. */
export function Home() {
  return (
    <div className="home">
      <div className="home-title">
        <h1 id="home-heading">{PRODUCT_NAME}</h1>
        <a className="mono" href={CONTRIBUTING_URL}>
          Contribute
        </a>
      </div>

      <section aria-labelledby="tools-heading">
        <h2 id="tools-heading" className="visually-hidden">
          Tools
        </h2>
        <ol className="tool-list">
          {TOOLS.map((tool, i) => {
            const href = formatHash({ kind: 'tool', toolId: tool.id, subpath: '' })
            return (
              <li key={tool.id} className="tool-entry">
                <div className="tool-entry-text">
                  <p className="tool-number mono">
                    <span className="tool-index">{number(i + 1)}</span>
                    {tool.framework ? (
                      <span>
                        <span className="visually-hidden">Framework: </span>
                        {tool.framework}
                      </span>
                    ) : null}
                  </p>
                  <h3 className="tool-name">{tool.name}</h3>
                  <p className="tool-tagline">{tool.tagline}</p>
                  <a className="button button-primary" href={href}>
                    Open <span className="visually-hidden">{tool.name}</span>
                    <span aria-hidden="true"> →</span>
                  </a>
                </div>
                <a className="tool-entry-visual" href={href} tabIndex={-1} aria-hidden="true">
                  <ToolVisual toolId={tool.id} />
                </a>
              </li>
            )
          })}
        </ol>
      </section>

      <section className="build-next" aria-labelledby="wanted-heading">
        <div className="build-next-head">
          <h2 id="wanted-heading" className="mono">
            Build next
          </h2>
          <a className="mono" href={BUILD_A_TOOL_URL}>
            How to propose and build a tool
          </a>
        </div>
        <ul className="wanted-grid">
          {WANTED_TOOLS.map((wanted, i) => (
            <li key={wanted.id} className="wanted-item">
              <WantedMark id={wanted.id} />
              <Disclosure summary={wanted.name} headingLevel={3} className="wanted-disclosure">
                <p className="wanted-pitch">{wanted.pitch}</p>
              </Disclosure>
              <span className="wanted-number mono muted" aria-hidden="true">
                {number(TOOLS.length + i + 1)} · to build
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
