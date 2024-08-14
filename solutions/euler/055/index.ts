// Project Euler | Problem 55 | Lychrel Numbers
// https://projecteuler.net/problem=55

import { isPalindrome } from '@/lib/sequence'

export const displayName = 'EULER | Problem 55 | Lychrel Numbers'
export const complete = true

export const solution = () => {
  const tenThousand = 10000
  const lychrelNumbers: number[] = []

  for (let n = 1; n <= tenThousand; n++) {
    let root = BigInt(n)
    let isLychrel = true
    for (let i = 1; i < 50; i++) {
      root = root + BigInt(root.toString().split('').reverse().join(''))
      if (isPalindrome(root.toString())) {
        isLychrel = false
        break
      }
    }
    if (isLychrel) {
      lychrelNumbers.push(n)
    }
  }

  return lychrelNumbers.length
}
