// Copy text to the clipboard. Shared by every tool. See SPEC.md §3.4.

/**
 * Copy `text` to the clipboard. Resolves to true on success and false on
 * failure; it never throws.
 *
 * Uses the asynchronous Clipboard API where it is available. Browsers only
 * offer that API on secure pages (https or localhost), so elsewhere, such as
 * a dev server opened by IP address, it falls back to the older
 * select-and-copy technique.
 */
export async function copyText(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // Permission denied or the page is not focused: try the fallback.
    }
  }
  return legacyCopy(text)
}

function legacyCopy(text: string): boolean {
  if (typeof document.execCommand !== 'function') return false
  const previousFocus = document.activeElement
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.append(textarea)
  try {
    textarea.select()
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    textarea.remove()
    if (previousFocus instanceof HTMLElement) previousFocus.focus()
  }
}
