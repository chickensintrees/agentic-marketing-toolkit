import { describe, expect, it } from 'vitest'
import { roman } from './roman'

describe('roman (Home plate numbers)', () => {
  it('numbers plates like a book', () => {
    expect([1, 2, 4, 9, 10, 11, 14].map(roman)).toEqual(['I', 'II', 'IV', 'IX', 'X', 'XI', 'XIV'])
  })
})
