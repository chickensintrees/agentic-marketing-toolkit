import { useState } from 'react'
import { buildMarkdown, markdownFileName } from '../lib/markdown'
import type { Analysis } from '../types'

interface ExportPanelProps {
  analysis: Analysis
}

interface Status {
  kind: 'success' | 'error'
  text: string
}

/** Copy as Markdown, download a .md file, or print. */
export function ExportPanel({ analysis }: ExportPanelProps) {
  const [status, setStatus] = useState<Status | null>(null)

  const copy = async () => {
    const markdown = buildMarkdown(analysis, new Date())
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(markdown)
      setStatus({ kind: 'success', text: 'Copied the Markdown to your clipboard.' })
    } catch {
      setStatus({
        kind: 'error',
        text: 'Could not copy to the clipboard in this browser. Try “Download .md” instead.',
      })
    }
  }

  const download = () => {
    const now = new Date()
    const fileName = markdownFileName(analysis, now)
    try {
      const blob = new Blob([buildMarkdown(analysis, now)], {
        type: 'text/markdown;charset=utf-8',
      })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.append(link)
      link.click()
      link.remove()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
      setStatus({ kind: 'success', text: `Downloaded ${fileName}.` })
    } catch {
      setStatus({ kind: 'error', text: 'Could not create the download in this browser.' })
    }
  }

  return (
    <section className="card export-panel no-print" aria-labelledby="export-heading">
      <h3 id="export-heading">Export</h3>
      <p>
        Copy your analysis as Markdown to paste into a document or discussion post,
        download it as a file, or print it.
      </p>
      <div className="button-row">
        <button type="button" className="button button-primary" onClick={copy}>
          Copy as Markdown
        </button>
        <button type="button" className="button button-secondary" onClick={download}>
          Download .md
        </button>
        <button type="button" className="button button-secondary" onClick={() => window.print()}>
          Print
        </button>
      </div>
      <div role="status" aria-live="polite" className="status-region">
        {status ? (
          <p className={status.kind === 'success' ? 'notice notice-success' : 'notice notice-error'}>
            <span aria-hidden="true">{status.kind === 'success' ? '✓ ' : '⚠ '}</span>
            {status.text}
          </p>
        ) : null}
      </div>
    </section>
  )
}
