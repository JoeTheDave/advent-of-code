// Advent of Code | 2022 | Day 6 | Tuning Trouble
// https://adventofcode.com/2022/day/6
// https://adventofcode.com/2022/day/6/input

import { uniq } from 'lodash'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2022 | Day 6 | Tuning Trouble'
export const complete = [true, true]

const useTestData = false

const data = (useTestData ? testData : puzzleData)[0]

export const solutionOne = () => {
  let result = 0
  for (let i = 4; i <= data.length; i++) {
    if (uniq(data.slice(i - 4, i)).length === 4) {
      result = i
      break
    }
  }
  return result
}

export const solutionTwo = () => {
  let result = 0
  for (let i = 14; i <= data.length; i++) {
    if (uniq(data.slice(i - 14, i)).length === 14) {
      result = i
      break
    }
  }
  return result
}
