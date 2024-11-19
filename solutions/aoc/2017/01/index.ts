// Advent of Code | 2017 | Day 1 | Inverse Captcha
// https://adventofcode.com/2017/day/1
// https://adventofcode.com/2017/day/1/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2017 | Day 1 | Inverse Captcha'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData[0] : puzzleData[0]

export const solutionOne = () => {
  let result = 0
  let dataLoop = data + data
  for (let i = 0; i < data.length; i++) {
    if (dataLoop[i] === dataLoop[i + 1]) {
      result += parseInt(data[i])
    }
  }
  return result
}

export const solutionTwo = () => {
  let result = 0
  let dataLoop = data + data
  for (let i = 0; i < data.length; i++) {
    if (dataLoop[i] === dataLoop[i + data.length / 2]) {
      result += parseInt(data[i])
    }
  }
  return result
}
