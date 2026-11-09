import { useState } from 'react'
import { BUILD_A_TOOL_URL, CONTRIBUTING_URL, PRODUCT_NAME } from '../config'
import { Circled, Underline } from '../shared/components/Marker'
import { TOOLS } from '../tools'
import { WANTED_TOOLS } from '../tools/wanted'
import { formatHash } from './router'
import { ToolSketch, WantedSketch } from './sketches'

/** Home: a sketch of each tool, then a "Next up" shelf of wanted tools. SPEC §2.3. */
export function Home() {
  const [openWanted, setOpenWanted] = useState<string | null>(null)
  const wanted = WANTED_TOOLS.find((item) => item.id === openWanted)

  return (
    <div className="home">
      <div className="home-top">
        <h1 id="home-heading" className="home-title visually-hidden">
          {PRODUCT_NAME}
        </h1>
        <a className="home-contribute" href={CONTRIBUTING_URL}>
          How to contribute
        </a>
      </div>

      <ul className="home-tools" aria-label="Tools">
        {TOOLS.map((tool) => (
          <li key={tool.id}>
            <a
              className="home-tool"
              href={formatHash({ kind: 'tool', toolId: tool.id, subpath: '' })}
              aria-label={`Open ${tool.name}`}
              aria-describedby={`tagline-${tool.id}`}
            >
              <ToolSketch id={tool.id} name={tool.name} />
              <span className="home-tool-text">
                <h2 className="home-tool-name">{tool.name}</h2>
                {tool.framework ? <span className="home-tool-framework">{tool.framework}</span> : null}
                <span id={`tagline-${tool.id}`} className="visually-hidden">
                  {tool.tagline}
                </span>
                <span className="home-tool-open" aria-hidden="true">
                  Open the board <span className="home-arrow">→</span>
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <section className="shelf" aria-labelledby="wanted-heading">
        <div className="shelf-head">
          <h2 id="wanted-heading">Next up</h2>
          <a href={BUILD_A_TOOL_URL}>How to propose and build a tool</a>
        </div>
        <ul className="shelf-tray">
          {WANTED_TOOLS.map((item) => {
            const open = item.id === openWanted
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className="shelf-item"
                  aria-expanded={open}
                  aria-controls="wanted-pitch"
                  onClick={() => setOpenWanted(open ? null : item.id)}
                >
                  <WantedSketch id={item.id} name={item.name} />
                  <span className="shelf-name">{item.name}</span>
                  {open ? <Circled seed={`shelf-${item.id}`} /> : null}
                </button>
              </li>
            )
          })}
        </ul>
        <div className="shelf-ledge" aria-hidden="true">
          <Underline seed="ledge" width={3} />
        </div>
        <p id="wanted-pitch" className="shelf-pitch" aria-live="polite">
          {wanted ? (
            <>
              <strong className="hand">{wanted.name}:</strong> {wanted.pitch}
            </>
          ) : null}
        </p>
      </section>
    </div>
  )
}
