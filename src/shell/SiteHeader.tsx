import { PRODUCT_NAME } from '../config'
import { HOME, formatHash } from './router'

interface SiteHeaderProps {
  /** The open tool's name, or undefined on Home. */
  toolName?: string
}

/** The running head: product name (links to Home) and, inside a tool, the tool's name. SPEC §2.1. */
export function SiteHeader({ toolName }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="container">
        <nav aria-label="Breadcrumb" className="running-head">
          <ol className="breadcrumb">
            <li>
              <a className="brand" href={formatHash(HOME)}>
                {PRODUCT_NAME}
              </a>
            </li>
            {toolName ? (
              <li>
                <span className="breadcrumb-separator" aria-hidden="true">
                  ·
                </span>
                <span className="breadcrumb-current" aria-current="page">
                  {toolName}
                </span>
              </li>
            ) : null}
          </ol>
        </nav>
      </div>
    </header>
  )
}
