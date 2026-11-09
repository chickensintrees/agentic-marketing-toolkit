import { useState } from 'react'
import { StatusMessage, type StatusTone } from '../../../shared/components/StatusMessage'
import { copyText } from '../../../shared/clipboard'
import { downloadTextFile } from '../../../shared/download'
import { buildMarkdown, markdownFileName } from '../lib/markdown'
import type { Analysis } from '../types'

interface ExportPanelProps {
  analysis: Analysis
}

interface Status {
  tone: StatusTone
  text: string
}

/** Copy as Markdown, download a .md file, or print. See SPEC §2.4–§2.5. */
export function ExportPanel({ analysis }: ExportPanelProps) {
  const [status, setStatus] = useState<Status | null>(null)

  const copy = async () => {
    const ok = await copyText(buildMarkdown(analysis, new Date()))
    setStatus(
      ok
        ? { tone: 'success', text: 'Copied the Markdown.' }
        : { tone: 'error', text: 'This browser blocked the clipboard. Try “Download .md”.' },
    )
  }

  const download = () => {
    const now = new Date()
    const fileName = markdownFileName(analysis, now)
    const ok = downloadTextFile(fileName, buildMarkdown(analysis, now), 'text/markdown;charset=utf-8')
    setStatus(
      ok
        ? { tone: 'success', text: `Downloaded ${fileName}.` }
        : { tone: 'error', text: 'This browser blocked the download.' },
    )
  }

  return (
    <section className="export-panel no-print" aria-label="Export">
      <div className="button-row">
        <button type="button" className="button button-primary" onClick={copy}>
          Copy as Markdown
        </button>
        <button type="button" className="button" onClick={download}>
          Download .md
        </button>
        <button type="button" className="button" onClick={() => window.print()}>
          Print
        </button>
      </div>
      <StatusMessage tone={status?.tone}>{status?.text ?? null}</StatusMessage>
    </section>
  )
}
