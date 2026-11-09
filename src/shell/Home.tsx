import { BUILD_A_TOOL_URL, CONTRIBUTING_URL, PRODUCT_NAME } from '../config'
import { TOOLS } from '../tools'
import { WANTED_TOOLS } from '../tools/wanted'
import { formatHash } from './router'

/** Home: hero, one card per registered tool, and the wanted-tools list. SPEC §2.3. */
export function Home() {
  return (
    <div className="home">
      <section className="hero" aria-labelledby="home-heading">
        <p className="eyebrow">Free and open source</p>
        <h1 id="home-heading">{PRODUCT_NAME}</h1>
        <p className="hero-lead">
          Small, practical tools that help MBA students learn the classic frameworks of
          marketing and strategy, and apply them to real markets.
        </p>
        <p className="hero-sub">
          It is built by a class: each student works with a coding agent and adds to the
          toolkit through GitHub pull requests.{' '}
          <a href={CONTRIBUTING_URL}>See how to contribute</a>.
        </p>
      </section>

      <section className="home-section" aria-labelledby="tools-heading">
        <h2 id="tools-heading">Tools</h2>
        <ul className="tool-cards">
          {TOOLS.map((tool) => (
            <li key={tool.id}>
              <article className="card tool-card">
                <h3>{tool.name}</h3>
                {tool.framework ? (
                  <p className="tool-framework">
                    <span className="visually-hidden">Framework: </span>
                    {tool.framework}
                  </p>
                ) : null}
                <p className="tool-tagline">{tool.tagline}</p>
                <a
                  className="button button-primary"
                  href={formatHash({ kind: 'tool', toolId: tool.id, subpath: '' })}
                >
                  Open <span className="visually-hidden">{tool.name}</span>
                  <span aria-hidden="true"> →</span>
                </a>
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-section" aria-labelledby="wanted-heading">
        <h2 id="wanted-heading">Help build the next tool</h2>
        <p className="section-lead">
          These are the tools the class wants next. Pick one, write a short proposal, and
          build it with your coding agent. Every tool follows the same simple pattern, so
          you never have to understand the whole codebase.
        </p>
        <ul className="wanted-list">
          {WANTED_TOOLS.map((wanted) => (
            <li key={wanted.id} className="wanted-item">
              <h3 className="wanted-name">{wanted.name}</h3>
              <p className="wanted-pitch">{wanted.pitch}</p>
            </li>
          ))}
        </ul>
        <p className="wanted-cta">
          <a className="button button-secondary" href={BUILD_A_TOOL_URL}>
            How to propose and build a tool
          </a>
        </p>
      </section>
    </div>
  )
}
