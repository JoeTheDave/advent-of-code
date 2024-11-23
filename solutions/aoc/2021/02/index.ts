// Advent of Code | 2021 | Day 2 | Dive!
// https://adventofcode.com/2021/day/2
// https://adventofcode.com/2021/day/2/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2021 | Day 2 | Dive!'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

export const solutionOne = () => {
  const position = data.reduce(
    (position, move) => {
      const [direction, magnitude] = move.split(' ')
      if (direction === 'forward') {
        position.distance += parseInt(magnitude)
      } else if (direction === 'down') {
        position.depth += parseInt(magnitude)
      } else if (direction === 'up') {
        position.depth -= parseInt(magnitude)
      }
      return position
    },
    { distance: 0, depth: 0 },
  )
  return position.distance * position.depth
}

export const solutionTwo = () => {
  const position = data.reduce(
    (position, move) => {
      const [direction, magnitude] = move.split(' ')
      if (direction === 'forward') {
        position.distance += parseInt(magnitude)
        position.depth += position.aim * parseInt(magnitude)
      } else if (direction === 'down') {
        position.aim += parseInt(magnitude)
      } else if (direction === 'up') {
        position.aim -= parseInt(magnitude)
      }
      return position
    },
    { distance: 0, depth: 0, aim: 0 },
  )
  return position.distance * position.depth
}
