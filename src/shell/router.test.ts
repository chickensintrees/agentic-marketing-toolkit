import { describe, expect, it } from 'vitest'
import { HOME, documentTitle, formatHash, pageKey, parseHash } from './router'

const IDS = ['five-forces', 'swot-builder']

describe('parseHash (SPEC §2.2)', () => {
  it.each(['', '#', '#/', '#//'])('treats %j as Home', (hash) => {
    expect(parseHash(hash, IDS)).toEqual(HOME)
  })

  it('opens a tool at its default view', () => {
    expect(parseHash('#/five-forces', IDS)).toEqual({
      kind: 'tool',
      toolId: 'five-forces',
      subpath: '',
    })
  })

  it('ignores a trailing slash after the tool id', () => {
    expect(parseHash('#/five-forces/', IDS)).toEqual({
      kind: 'tool',
      toolId: 'five-forces',
      subpath: '',
    })
  })

  it('passes the subpath to the tool', () => {
    expect(parseHash('#/five-forces/summary', IDS)).toEqual({
      kind: 'tool',
      toolId: 'five-forces',
      subpath: 'summary',
    })
  })

  it('ignores trailing and repeated slashes in the subpath', () => {
    expect(parseHash('#/five-forces/summary/', IDS)).toMatchObject({ subpath: 'summary' })
    expect(parseHash('#//five-forces//a//b/', IDS)).toMatchObject({
      toolId: 'five-forces',
      subpath: 'a/b',
    })
  })

  it('accepts a hash without the leading "#"', () => {
    expect(parseHash('/swot-builder', IDS)).toMatchObject({ toolId: 'swot-builder' })
  })

  it.each(['#/unknown', '#/unknown/summary', '#/Five-Forces', '#summary'])(
    'shows Home for an unknown tool id (%j)',
    (hash) => {
      expect(parseHash(hash, IDS)).toEqual(HOME)
    },
  )
})

describe('formatHash', () => {
  it('formats Home and tool routes', () => {
    expect(formatHash(HOME)).toBe('#/')
    expect(formatHash({ kind: 'tool', toolId: 'five-forces', subpath: '' })).toBe('#/five-forces')
    expect(formatHash({ kind: 'tool', toolId: 'five-forces', subpath: 'summary' })).toBe(
      '#/five-forces/summary',
    )
  })

  it('drops stray slashes around the subpath', () => {
    expect(formatHash({ kind: 'tool', toolId: 'five-forces', subpath: '/summary/' })).toBe(
      '#/five-forces/summary',
    )
  })

  it('round-trips through parseHash', () => {
    const route = { kind: 'tool' as const, toolId: 'five-forces', subpath: 'analyze' }
    expect(parseHash(formatHash(route), IDS)).toEqual(route)
  })
})

describe('pageKey and documentTitle', () => {
  it('gives every view of a tool the same page key', () => {
    const learn = parseHash('#/five-forces', IDS)
    const summary = parseHash('#/five-forces/summary', IDS)
    expect(pageKey(learn)).toBe(pageKey(summary))
    expect(pageKey(learn)).not.toBe(pageKey(HOME))
  })

  it('formats the document title', () => {
    expect(documentTitle('Agentic Marketing Toolkit')).toBe('Agentic Marketing Toolkit')
    expect(documentTitle('Agentic Marketing Toolkit', 'Five Forces Explorer')).toBe(
      'Five Forces Explorer · Agentic Marketing Toolkit',
    )
  })
})
