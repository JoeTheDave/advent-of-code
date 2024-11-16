// Advent of Code | 2015 | Day 2 | I Was Told There Would Be No Math
// https://adventofcode.com/2015/day/2
// https://adventofcode.com/2015/day/2/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2015 | Day 2 | I Was Told There Would Be No Math'
export const complete = true

const useTestData = false

const data = useTestData ? testData : puzzleData

export const solutionOne = () => {
  return data.reduce((total, box) => {
    const dimensions = box.split('x').map(v => parseInt(v))
    const sides = [dimensions[0] * dimensions[1], dimensions[1] * dimensions[2], dimensions[0] * dimensions[2]]
    const smallSide = Math.min(...sides)
    const packageRequirement = sides[0] * 2 + sides[1] * 2 + sides[2] * 2 + smallSide
    return total + packageRequirement
  }, 0)
}

export const solutionTwo = () => {
  return data.reduce((total, box) => {
    const dimensions = box.split('x').map(v => parseInt(v))
    const largestDimension = Math.max(...dimensions)
    const largestDimensionIdx = dimensions.findIndex(d => d === largestDimension)
    const bowRequirement = dimensions[0] * dimensions[1] * dimensions[2]
    dimensions.splice(largestDimensionIdx, 1)
    const perimeter = (dimensions[0] + dimensions[1]) * 2
    const packageRequirement = perimeter + bowRequirement
    return total + packageRequirement
  }, 0)
}
