// Download text as a file. Shared by every tool. See SPEC.md §3.4.

/**
 * Turn arbitrary text into a safe file-name slug:
 * "U.S. passenger airlines" → "u-s-passenger-airlines".
 */
export function slugify(text: string, maxLength = 60): string {
  return text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, maxLength)
    .replace(/-+$/g, '')
}

/**
 * Offer `text` to the user as a downloaded file. Returns true when the
 * download was started, and false (it never throws) when the browser refused.
 */
export function downloadTextFile(
  fileName: string,
  text: string,
  mimeType = 'text/plain;charset=utf-8',
): boolean {
  if (typeof URL.createObjectURL !== 'function') return false
  try {
    const url = URL.createObjectURL(new Blob([text], { type: mimeType }))
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    link.hidden = true
    document.body.append(link)
    link.click()
    link.remove()
    // Give the browser a moment to start the download before releasing it.
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    return true
  } catch {
    return false
  }
}
