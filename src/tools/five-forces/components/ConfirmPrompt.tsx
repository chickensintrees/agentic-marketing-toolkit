import { useEffect, useRef } from 'react'
import { Button } from '../../../shared/components/Button'

interface ConfirmPromptProps {
  question: string
  confirmLabel: string
  cancelLabel: string
  onConfirm: () => void
  onCancel: () => void
}

/** An in-page confirmation (the app never uses window.confirm). Focus moves to it. SPEC §2.3. */
export function ConfirmPrompt({ question, confirmLabel, cancelLabel, onConfirm, onCancel }: ConfirmPromptProps) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    ref.current?.focus()
  }, [])
  return (
    <div ref={ref} className="confirm" role="alertdialog" aria-label={question} aria-modal="false" tabIndex={-1}>
      <p className="confirm-question">{question}</p>
      <div className="button-row">
        <Button variant="primary" onClick={onConfirm}>
          {confirmLabel}
        </Button>
        <Button variant="quiet" onClick={onCancel}>
          {cancelLabel}
        </Button>
      </div>
    </div>
  )
}
