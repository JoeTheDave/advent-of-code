// Advent of Code | 2021 | Day 6 | Lanternfish
// https://adventofcode.com/2021/day/6
// https://adventofcode.com/2021/day/6/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2021 | Day 6 | Lanternfish'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

export const extrapolateFishAfterGenerations = (data: number[], generations: number) => {
  let fish = new Array(9).fill(0)
  data.forEach(d => fish[d]++)
  for (let i = 0; i < generations; i++) {
    fish = [fish[1], fish[2], fish[3], fish[4], fish[5], fish[6], fish[7] + fish[0], fish[8], fish[0]]
  }
  return fish.reduce((sum, num) => sum + num)
}

export const solutionOne = () => {
  return extrapolateFishAfterGenerations(data, 80)
}

export const solutionTwo = () => {
  return extrapolateFishAfterGenerations(data, 256)
}
