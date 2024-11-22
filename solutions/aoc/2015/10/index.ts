// Advent of Code | 2015 | Day 10 | Elves Look, Elves Say
// https://adventofcode.com/2015/day/10
// https://adventofcode.com/2015/day/10/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2015 | Day 10 | Elves Look, Elves Say'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

const evaluateTerm = (term: string) => {
  let currentDigit = ''
  let currentDigitCount = 0
  let newTerm = ''

  const transitionDigit = (digit: string) => {
    if (currentDigit) {
      newTerm += `${currentDigitCount}${currentDigit}`
    }
    currentDigit = digit
    currentDigitCount = 1
  }

  for (let i = 0; i < term.length; i++) {
    if (term[i] !== currentDigit) {
      transitionDigit(term[i])
    } else {
      currentDigitCount++
    }
  }
  transitionDigit('')
  return newTerm
}

export const solutionOne = () => {
  let term = data
  for (let i = 0; i < 40; i++) {
    term = evaluateTerm(term)
  }
  return term.length
}

export const solutionTwo = () => {
  let term = data
  for (let i = 0; i < 50; i++) {
    term = evaluateTerm(term)
  }
  return term.length
}
