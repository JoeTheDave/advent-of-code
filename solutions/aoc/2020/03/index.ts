// Advent of Code | 2020 | Day 3 | Toboggan Trajectory
// https://adventofcode.com/2020/day/3
// https://adventofcode.com/2020/day/3/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2020 | Day 3 | Toboggan Trajectory'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

const treeEncountersFromSlope = (slope: number[]) => {
  let encounters = 0
  const [rise, run] = slope
  for (let r = 0; r < data.length / rise; r++) {
    if (data[r * rise][(r * run) % data[r * rise].length] === '#') {
      encounters++
    }
  }
  return encounters
}

export const solutionOne = () => {
  return treeEncountersFromSlope([1, 3])
}

export const solutionTwo = () => {
  const slopes = [
    [1, 1],
    [1, 3],
    [1, 5],
    [1, 7],
    [2, 1],
  ]
  return slopes.map(slope => treeEncountersFromSlope(slope)).reduce((product, val) => product * val, 1)
}
