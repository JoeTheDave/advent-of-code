// Advent of Code | 2024 | Day 19 | Linen Layout
// https://adventofcode.com/2024/day/19
// https://adventofcode.com/2024/day/19/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2024 | Day 19 | Linen Layout'
export const complete = [false, false]

const useTestData = true

const rawData = useTestData ? testData : puzzleData

class Evaluator {
  towels: string[]
  patterns: string[]

  constructor(data: string[]) {
    this.towels = data[0].split(', ')
    this.patterns = data.splice(2)
  }

  evaluate = () => {}
}

export const solutionOne = () => {
  const evaluator = new Evaluator(rawData)
  evaluator.evaluate()

  patterns.forEach(pattern => {
    const options = towels.filter(towel => pattern.indexOf(towel) === 0)
    console.log(options)
  })

  return null
}

export const solutionTwo = () => {
  return null
}
