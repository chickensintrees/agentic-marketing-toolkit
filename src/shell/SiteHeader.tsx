import { PRODUCT_NAME } from '../config'
import { HOME, formatHash } from './router'

interface SiteHeaderProps {
  /** The open tool's name, or undefined on Home. */
  toolName?: string
}

/** Product name (links to Home) and, inside a tool, the tool's name. SPEC §2.1. */
export function SiteHeader({ toolName }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="container">
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumb">
            <li>
              <a className="brand" href={formatHash(HOME)}>
                <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
                  <polygon points="16,3 28.4,12 23.6,26.5 8.4,26.5 3.6,12" />
                  <polygon className="brand-mark-inner" points="16,10 21.7,14.1 19.5,20.9 12.5,20.9 10.3,14.1" />
                </svg>
                <span>{PRODUCT_NAME}</span>
              </a>
            </li>
            {toolName ? (
              <li>
                <span className="breadcrumb-separator" aria-hidden="true">
                  /
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
