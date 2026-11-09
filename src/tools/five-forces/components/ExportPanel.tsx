import { useState } from 'react'
import { Button } from '../../../shared/components/Button'
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
        ? { tone: 'success', text: 'Copied the Markdown to your clipboard.' }
        : {
            tone: 'error',
            text: 'Could not copy to the clipboard in this browser. Try “Download .md” instead.',
          },
    )
  }

  const download = () => {
    const now = new Date()
    const fileName = markdownFileName(analysis, now)
    const ok = downloadTextFile(fileName, buildMarkdown(analysis, now), 'text/markdown;charset=utf-8')
    setStatus(
      ok
        ? { tone: 'success', text: `Downloaded ${fileName}.` }
        : { tone: 'error', text: 'Could not create the download in this browser.' },
    )
  }

  return (
    <section className="export-panel no-print" aria-labelledby="export-heading">
      <h3 id="export-heading" className="visually-hidden">
        Export
      </h3>
      <div className="button-row">
        <Button variant="primary" onClick={copy}>
          Copy as Markdown
        </Button>
        <Button onClick={download}>Download .md</Button>
        <Button onClick={() => window.print()}>Print</Button>
      </div>
      <StatusMessage tone={status?.tone}>{status?.text ?? null}</StatusMessage>
    </section>
  )
}
