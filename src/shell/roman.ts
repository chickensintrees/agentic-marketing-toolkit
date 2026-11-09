// Plate numbers on Home (SPEC.md §2.3).

const ROMAN: [number, string][] = [
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
]

/** 1 → "I", 14 → "XIV". Plates are numbered like a book's figures. */
export function roman(n: number): string {
  let out = ''
  let rest = n
  for (const [value, numeral] of ROMAN) {
    while (rest >= value) {
      out += numeral
      rest -= value
    }
  }
  return out
}
