// Project Euler | Problem 44 | Pentagon Numbers
// https://projecteuler.net/problem=44

export const displayName = 'EULER | Problem 44 | Pentagon Numbers'
export const complete = true

const pentagonalNumber = (n: number) => (n * (3 * n - 1)) / 2

export const solution = () => {
  const maxAttemptedPentagonal = 10000
  const pentagonalDictionary: { [key: string]: number } = {}
  const inverseDictionary: { [key: string]: number } = {}
  for (let n = 1; n <= maxAttemptedPentagonal; n++) {
    pentagonalDictionary[`${n}`] = pentagonalNumber(n)
    inverseDictionary[`${pentagonalDictionary[`${n}`]}`] = n
  }

  let minDiff = Infinity
  for (let k = 2; k <= maxAttemptedPentagonal; k++) {
    for (let j = 1; j < k; j++) {
      const sum = pentagonalDictionary[k] + pentagonalDictionary[j]
      const diff = pentagonalDictionary[k] - pentagonalDictionary[j]
      const sumIsP = !!inverseDictionary[sum]
      const diffIsP = !!inverseDictionary[diff]
      if (sumIsP && diffIsP && diff < minDiff) {
        minDiff = diff
      }
    }
  }
  return minDiff
}
