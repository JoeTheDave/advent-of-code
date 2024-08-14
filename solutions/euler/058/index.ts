// Project Euler | Problem 58 | Spiral Primes
// https://projecteuler.net/problem=58

import { isPrime } from '@/lib/primes'

export const displayName = 'EULER | Problem 58 | Spiral Primes'
export const complete = true

export const solution = () => {
  let addends = [2, 4, 6]
  let squareSize = 1
  let corners = [1, 1, 1]
  let primeCount = 0
  let compositCount = 1
  let primeCoverage = 1.0

  while (primeCoverage >= 0.1) {
    squareSize += 2
    corners = corners.map((n, idx) => n + addends[idx])
    addends = addends.map(n => n + 8)
    corners.forEach(n => {
      if (isPrime(n)) {
        primeCount++
      } else {
        compositCount++
      }
    })
    compositCount++
    primeCoverage = primeCount / (primeCount + compositCount)
    // console.log(`size:${squareSize}, primeCoverage: ${primeCoverage}`)
  }

  return squareSize
}
