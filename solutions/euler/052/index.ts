// Project Euler | Problem 52 | Permuted Multiples
// https://projecteuler.net/problem=52

export const displayName = 'EULER | Problem 52 | Permuted Multiples'
export const complete = true

export const solution = () => {
  for (let i = 1; i < 1000000; i++) {
    const sorted = i.toString().split('').sort().join('')
    let isMatch = true
    for (let j = 2; j <= 6; j++) {
      if (sorted !== (i * j).toString().split('').sort().join('')) {
        isMatch = false
        break
      }
    }
    if (isMatch) {
      return i
    }
  }
  return null
}
