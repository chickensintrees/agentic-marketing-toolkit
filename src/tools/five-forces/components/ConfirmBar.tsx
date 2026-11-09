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
  // The control that opened the bar (an emblem or Start over), read before focus moves.
  const opener = useRef(typeof document === 'undefined' ? null : document.activeElement)
  useEffect(() => {
    cancelRef.current?.focus()
    const returnTo = opener.current
    return () => {
      // When the bar closes, focus goes back to its opener unless something else took it.
      const lost = document.activeElement === null || document.activeElement === document.body
      if (lost && returnTo instanceof HTMLElement && returnTo.isConnected) returnTo.focus()
    }
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
