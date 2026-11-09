import { useState } from 'react'
import { BUILD_A_TOOL_URL, PRODUCT_NAME } from '../config'
import { TOOLS } from '../tools'
import { WANTED_TOOLS } from '../tools/wanted'
import { PlateThumbnail } from './plates'
import { roman } from './roman'
import { formatHash } from './router'

/**
 * Home: a contents page of plates (SPEC §2.3). Each registered tool is a
 * drawn plate with an Open link; each wanted tool is a draft plate on the
 * shelf. Taglines and pitches show on demand, in one caption line.
 */
export function Home() {
  const [caption, setCaption] = useState<string | null>(null)
  const show = (text: string) => ({
    onMouseEnter: () => setCaption(text),
    onMouseLeave: () => setCaption(null),
    onFocus: () => setCaption(text),
    onBlur: () => setCaption(null),
  })

  return (
    <div className="home">
      <h1 id="home-heading" className="home-title">
        {PRODUCT_NAME}
      </h1>

      <div className="home-grid">
        <section className="home-tools" aria-labelledby="tools-heading">
          <h2 id="tools-heading" className="visually-hidden">
            Tools
          </h2>
          <ul className="tool-plates">
            {TOOLS.map((tool, i) => (
              <li key={tool.id}>
                <article className="tool-plate" aria-labelledby={`tool-${tool.id}`}>
                  <a
                    className="tool-plate-link"
                    href={formatHash({ kind: 'tool', toolId: tool.id, subpath: '' })}
                    aria-describedby={`tool-${tool.id}-tagline`}
                    {...show(tool.tagline)}
                  >
                    <span className="plate-frame">
                      <PlateThumbnail id={tool.id} />
                    </span>
                    <span className="visually-hidden">Open {tool.name}</span>
                  </a>
                  <div className="plate-caption">
                    <h3 id={`tool-${tool.id}`}>
                      <span className="plate-no" aria-hidden="true">Plate {roman(i + 1)}.</span> {tool.name}
                    </h3>
                    {tool.framework ? (
                      <p className="plate-framework">
                        <span className="visually-hidden">Framework: </span>
                        {tool.framework}
                      </p>
                    ) : null}
                  </div>
                  <p id={`tool-${tool.id}-tagline`} className="visually-hidden">
                    {tool.tagline}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section className="home-shelf" aria-labelledby="wanted-heading">
          <h2 id="wanted-heading" className="shelf-heading">
            Plates in preparation
          </h2>
          <ul className="shelf">
            {WANTED_TOOLS.map((wanted, i) => (
              <li key={wanted.id}>
                <a
                  className="shelf-item"
                  href={BUILD_A_TOOL_URL}
                  aria-describedby={`wanted-${wanted.id}`}
                  {...show(wanted.pitch)}
                >
                  <PlateThumbnail id={wanted.id} draft />
                  <h3 className="shelf-name">
                    <span className="plate-no" aria-hidden="true">{roman(TOOLS.length + i + 1)}.</span> {wanted.name}
                  </h3>
                </a>
                <p id={`wanted-${wanted.id}`} className="visually-hidden">
                  {wanted.pitch}
                </p>
              </li>
            ))}
          </ul>
          <p className="shelf-caption" aria-hidden="true">
            {caption ?? ' '}
          </p>
          <p className="shelf-cta">
            <a href={BUILD_A_TOOL_URL}>How to propose and build a tool</a>
          </p>
        </section>
      </div>
    </div>
  )
}
