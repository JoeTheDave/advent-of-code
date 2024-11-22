// Advent of Code | 2015 | Day 11 | Corporate Policy
// https://adventofcode.com/2015/day/11
// https://adventofcode.com/2015/day/11/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2015 | Day 11 | Corporate Policy'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

const digits = 'abcdefghijklmnopqrstuvwxyz'

const incrementTerm = (term: string) => {
  if (!term) {
    return 'a'
  } else {
    for (let i = term.length - 1; i >= 0; i--) {
      let termDigits = term.split('')
      if (term[i] === 'z') {
        termDigits.splice(i, 1, 'a')
        if (i === 0) {
          termDigits.unshift('a')
        }
        term = termDigits.join('')
      } else {
        const currentDigit = term[i]
        const currentDigitIndex = digits.indexOf(currentDigit)
        termDigits.splice(i, 1, digits[currentDigitIndex + 1])
        term = termDigits.join('')
        break
      }
    }
    return term
  }
}

const hasIncrementingStrait = (term: string) => {
  const quantityList = term.split('').map(digit => digits.indexOf(digit))
  let result = false
  let incrementCount = 1
  for (let i = 1; i <= quantityList.length; i++) {
    if (quantityList[i] === quantityList[i - 1] + 1) {
      incrementCount++
    } else {
      incrementCount = 1
    }
    if (incrementCount === 3) {
      result = true
      break
    }
  }
  return result
}

const hasNoIllegalCharacters = (term: string) => {
  return 'iol'.split('').reduce((result, character) => result && !term.includes(character), true)
}

const hasNonOverlappingPairs = (term: string) => {
  const pairOrigins: number[] = []
  for (let i = 1; i <= term.length; i++) {
    if (term[i] === term[i - 1] && !pairOrigins.some(idx => Math.abs(idx - (i - 1)) < 2)) {
      pairOrigins.push(i - 1)
      if (pairOrigins.length > 1) {
        break
      }
    }
  }
  return pairOrigins.length > 1
}

const isValidTerm = (term: string) => {
  return hasIncrementingStrait(term) && hasNoIllegalCharacters(term) && hasNonOverlappingPairs(term)
}

const findNextValidPassword = (term: string) => {
  do {
    term = incrementTerm(term)
  } while (!isValidTerm(term))
  return term
}

export const solutionOne = () => {
  return findNextValidPassword(data)
}

export const solutionTwo = () => {
  return findNextValidPassword(findNextValidPassword(data))
}
