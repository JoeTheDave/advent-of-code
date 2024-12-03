// Advent of Code | 2024 | Day 3 | Mull It Over
// https://adventofcode.com/2024/day/3
// https://adventofcode.com/2024/day/3/input

import { testData1, testData2, puzzleData } from './data'

export const displayName = 'AOC | 2024 | Day 3 | Mull It Over'
export const complete = [true, true]

const useTestData = false

export const solutionOne = () => {
  const rawdata = useTestData ? testData1 : puzzleData
  const data = rawdata.split('\n').join('')
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g
  const matches = [...data.matchAll(regex)]
  return matches.reduce((sum, match) => {
    const multiplicands = match[0]
      .slice(4, -1)
      .split(',')
      .map(n => parseInt(n))
    return sum + multiplicands[0] * multiplicands[1]
  }, 0)
}

export const solutionTwo = () => {
  const rawdata = useTestData ? testData2 : puzzleData
  const data = rawdata.split('\n').join('')
  const regex = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g
  const matches = [...data.matchAll(regex)]
  let enabled = true
  let sum = 0
  matches
    .map(m => m[0])
    .forEach(match => {
      if (match === `do()`) {
        enabled = true
      } else if (match === `don't()`) {
        enabled = false
      } else {
        if (enabled) {
          const multiplicands = match
            .slice(4, -1)
            .split(',')
            .map(n => parseInt(n))
          sum += multiplicands[0] * multiplicands[1]
        }
      }
    })
  return sum
}
