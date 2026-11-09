import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// jsdom does not implement scrolling; the shell scrolls to the top on page changes.
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo

afterEach(() => {
  cleanup()
  localStorage.clear()
  // Every test starts on Home with a clean title.
  window.history.replaceState(null, '', window.location.pathname)
  document.title = ''
  vi.restoreAllMocks()
})
