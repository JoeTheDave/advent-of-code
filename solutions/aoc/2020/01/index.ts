// Advent of Code | 2020 | Day 1 | Report Repair
// https://adventofcode.com/2020/day/1
// https://adventofcode.com/2020/day/1/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2020 | Day 1 | Report Repair'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

export const solutionOne = () => {
  let result = 0
  for (let a = 0; a < data.length - 1; a++) {
    for (let b = a + 1; b < data.length; b++) {
      if (data[a] + data[b] === 2020) {
        console.log(data[a], data[b])
        result = data[a] * data[b]
        break
      }
    }
    if (result) {
      break
    }
  }
  return result
}

export const solutionTwo = () => {
  let result = 0
  for (let a = 0; a < data.length - 2; a++) {
    for (let b = a + 1; b < data.length - 1; b++) {
      for (let c = b + 1; c < data.length; c++) {
        if (data[a] + data[b] + data[c] === 2020) {
          console.log(data[a], data[b], data[c])
          result = data[a] * data[b] * data[c]
          break
        }
      }
      if (result) {
        break
      }
    }
    if (result) {
      break
    }
  }
  return result
}
