// Advent of Code | 2022 | Day 1 | Calorie Counting
// https://adventofcode.com/2022/day/1
// https://adventofcode.com/2022/day/1/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2022 | Day 1 | Calorie Counting'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

const calculateTotals = (data: string[]) => {
  const results = [0]
  data.forEach(snack => {
    const calories = parseInt(snack)
    if (isNaN(calories)) {
      results.push(0)
    } else {
      results[results.length - 1] = results[results.length - 1] + calories
    }
  })

  return results.sort((a, b) => b - a)
}

export const solutionOne = () => {
  return calculateTotals(data)[0]
}

export const solutionTwo = () => {
  return calculateTotals(data)
    .slice(0, 3)
    .reduce((sum, val) => sum + val, 0)
}
