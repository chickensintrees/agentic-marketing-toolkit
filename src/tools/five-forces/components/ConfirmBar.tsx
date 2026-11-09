import { useEffect, useRef } from 'react'

interface ConfirmBarProps {
  message: string
  confirmLabel: string
  onConfirm: () => void
  onCancel: () => void
}

/** An on-page confirmation (SPEC §2.3): no browser dialog, keyboard first. */
export function ConfirmBar({ message, confirmLabel, onConfirm, onCancel }: ConfirmBarProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    cancelRef.current?.focus()
  }, [])
  return (
    <div className="confirm-bar" role="alertdialog" aria-labelledby="confirm-message" aria-modal="false">
      <p id="confirm-message">{message}</p>
      <div className="button-row">
        <button type="button" className="button button-primary" onClick={onConfirm}>
          {confirmLabel}
        </button>
        <button type="button" className="button" ref={cancelRef} onClick={onCancel}>
          Keep editing
        </button>
      </div>
    </div>
  )
}
