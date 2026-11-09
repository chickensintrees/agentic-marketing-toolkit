import { CONTRIBUTING_URL, DISCLAIMER, REPO_URL } from '../config'

/** Colophon: the disclaimer, the repository and the Contribute link. SPEC §2.1. */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-disclaimer">{DISCLAIMER}</p>
        <ul className="footer-links">
          <li>
            <a href={REPO_URL}>GitHub repository</a>
          </li>
          <li>
            <a href={CONTRIBUTING_URL}>Contribute</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
