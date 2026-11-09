import { afterEach, describe, expect, it, vi } from 'vitest'
import { copyText } from './clipboard'
import { downloadTextFile, slugify } from './download'

afterEach(() => {
  vi.restoreAllMocks()
})

function stubClipboard(writeText: (text: string) => Promise<void>) {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
  })
}

describe('copyText', () => {
  afterEach(() => {
    Reflect.deleteProperty(navigator, 'clipboard')
    Reflect.deleteProperty(document, 'execCommand')
  })

  it('uses the Clipboard API when it is available', async () => {
    const writeText = vi.fn(() => Promise.resolve())
    stubClipboard(writeText)
    await expect(copyText('hello')).resolves.toBe(true)
    expect(writeText).toHaveBeenCalledWith('hello')
  })

  it('falls back to select-and-copy when the Clipboard API rejects', async () => {
    stubClipboard(() => Promise.reject(new Error('denied')))
    const execCommand = vi.fn(() => true)
    Object.defineProperty(document, 'execCommand', { value: execCommand, configurable: true })
    await expect(copyText('hello')).resolves.toBe(true)
    expect(execCommand).toHaveBeenCalledWith('copy')
    expect(document.querySelector('textarea')).toBeNull()
  })

  it('resolves to false, without throwing, when nothing works', async () => {
    stubClipboard(() => Promise.reject(new Error('denied')))
    Object.defineProperty(document, 'execCommand', {
      value: () => {
        throw new Error('unsupported')
      },
      configurable: true,
    })
    await expect(copyText('hello')).resolves.toBe(false)
  })
})

describe('slugify', () => {
  it('makes a safe, readable file-name slug', () => {
    expect(slugify('U.S. passenger airlines')).toBe('u-s-passenger-airlines')
    expect(slugify('  Café & Bar — Morgantown!  ')).toBe('cafe-bar-morgantown')
    expect(slugify('???')).toBe('')
  })

  it('limits the length without leaving a trailing dash', () => {
    const slug = slugify('word '.repeat(40), 12)
    expect(slug.length).toBeLessThanOrEqual(12)
    expect(slug.endsWith('-')).toBe(false)
  })
})

describe('downloadTextFile', () => {
  // jsdom does not implement object URLs, so each test provides its own.
  const setObjectUrlApi = (create: unknown, revoke: unknown) => {
    Object.defineProperty(URL, 'createObjectURL', { value: create, configurable: true })
    Object.defineProperty(URL, 'revokeObjectURL', { value: revoke, configurable: true })
  }
  afterEach(() => setObjectUrlApi(undefined, undefined))

  it('creates a file link, clicks it, and cleans up', () => {
    vi.useFakeTimers()
    const createObjectURL = vi.fn(() => 'blob:test')
    const revokeObjectURL = vi.fn()
    setObjectUrlApi(createObjectURL, revokeObjectURL)
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})

    expect(downloadTextFile('notes.md', '# Hi', 'text/markdown')).toBe(true)
    expect(createObjectURL).toHaveBeenCalledTimes(1)
    expect(click).toHaveBeenCalledTimes(1)
    const link = click.mock.contexts[0] as HTMLAnchorElement
    expect(link.download).toBe('notes.md')
    expect(document.querySelector('a[download]')).toBeNull()

    vi.runAllTimers()
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:test')
    vi.useRealTimers()
  })

  it('returns false when the browser cannot create a file', () => {
    setObjectUrlApi(undefined, undefined)
    expect(downloadTextFile('notes.md', '# Hi')).toBe(false)
  })
})
