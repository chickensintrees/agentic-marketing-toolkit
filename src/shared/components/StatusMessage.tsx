import type { ReactNode } from 'react'

export type StatusTone = 'info' | 'success' | 'warning' | 'error'

const ICONS: Record<StatusTone, string> = {
  info: 'ⓘ',
  success: '✓',
  warning: '⚠',
  error: '⚠',
}

interface StatusMessageProps {
  tone?: StatusTone
  /** The message to announce. Nothing is shown while it is null. */
  children?: ReactNode
  className?: string
}

/**
 * A polite live region. It stays in the page even when empty, so screen
 * readers announce each new message. The icon means the tone never relies
 * on color alone.
 */
export function StatusMessage({ tone = 'info', children, className }: StatusMessageProps) {
  const hasMessage = children !== null && children !== undefined && children !== false
  return (
    <div role="status" aria-live="polite" className={['status-region', className].filter(Boolean).join(' ')}>
      {hasMessage ? (
        <p className={`notice notice-${tone}`}>
          <span className="notice-icon" aria-hidden="true">
            {ICONS[tone]}
          </span>
          <span>{children}</span>
        </p>
      ) : null}
    </div>
  )
}
