// Advent of Code | 2021 | Day 7 | The Treachery of Whales
// https://adventofcode.com/2021/day/7
// https://adventofcode.com/2021/day/7/input

import { range } from 'lodash'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2021 | Day 7 | The Treachery of Whales'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

export const solutionOne = () => {
  return range(Math.min(...data), Math.max(...data) + 1).reduce((leastFuel, horizontalPosition) => {
    return Math.min(
      leastFuel,
      data.reduce(
        (fuelConsumption, currentPosition) => fuelConsumption + Math.abs(currentPosition - horizontalPosition),
        0,
      ),
    )
  }, Number.MAX_SAFE_INTEGER)
}

export const solutionTwo = () => {
  return range(Math.min(...data), Math.max(...data) + 1).reduce((leastFuel, horizontalPosition) => {
    return Math.min(
      leastFuel,
      data.reduce(
        (fuelConsumption, currentPosition) =>
          fuelConsumption +
          range(1, Math.abs(currentPosition - horizontalPosition) + 1).reduce((fuelSum, step) => fuelSum + step, 0),
        0,
      ),
    )
  }, Number.MAX_SAFE_INTEGER)
}
