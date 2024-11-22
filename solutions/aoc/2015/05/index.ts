// Advent of Code | 2015 | Day 5 | Doesn't He Have Intern-Elves For This?
// https://adventofcode.com/2015/day/5
// https://adventofcode.com/2015/day/5/input

import { testData, puzzleData } from './data'

export const displayName = "AOC | 2015 | Day 5 | Doesn't He Have Intern-Elves For This?"
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

const hasThreeVowels = (word: string) => {
  return word.split('').filter(l => 'aeiou'.includes(l)).length >= 3
}

const hasDoubleLetter = (word: string) => {
  const letters = word.split('')
  let doubleLetter = false
  for (let l = 0; l < letters.length - 1; l++) {
    if (letters[l] === letters[l + 1]) {
      doubleLetter = true
      break
    }
  }
  return doubleLetter
}

const hasNoBadPairs = (word: string) => {
  const badPairs = ['ab', 'cd', 'pq', 'xy']
  return badPairs.reduce((result, pair) => {
    return result && !word.includes(pair)
  }, true)
}

const hasDuplicatePairs = (word: string) => {
  const letters = word.split('')
  let hasDuplicatePair = false
  for (let l = 0; l < letters.length - 3; l++) {
    for (let i = l + 2; i < letters.length - 1; i++) {
      if (letters.slice(l, l + 2).join('') === letters.slice(i, i + 2).join('')) {
        hasDuplicatePair = true
        break
      }
    }
    if (hasDuplicatePair) {
      break
    }
  }
  return hasDuplicatePair
}

const hasSingleLetterSeparatedDuplicate = (word: string) => {
  const letters = word.split('')
  let hasDuplicateSpacedLetter = false
  for (let l = 0; l < letters.length - 2; l++) {
    if (letters[l] === letters[l + 2]) {
      hasDuplicateSpacedLetter = true
      break
    }
  }
  return hasDuplicateSpacedLetter
}

export const solutionOne = () => {
  return data.reduce((count, word) => {
    return count + (hasThreeVowels(word) && hasDoubleLetter(word) && hasNoBadPairs(word) ? 1 : 0)
  }, 0)
}

export const solutionTwo = () => {
  return data.reduce((count, word) => {
    return count + (hasDuplicatePairs(word) && hasSingleLetterSeparatedDuplicate(word) ? 1 : 0)
  }, 0)
}
