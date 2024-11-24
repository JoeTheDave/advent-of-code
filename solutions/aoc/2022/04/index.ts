// Advent of Code | 2022 | Day 4 | Camp Cleanup
// https://adventofcode.com/2022/day/4
// https://adventofcode.com/2022/day/4/input

import { range, intersection } from 'lodash'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2022 | Day 4 | Camp Cleanup'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

const prepareData = (data: string[]) => {
  return data.map(pair => pair.split(',').map(assignment => assignment.split('-').map(section => parseInt(section))))
}

export const solutionOne = () => {
  let target = 0
  const pairs = prepareData(data)
  pairs.forEach(pair => {
    const [assignment1, assignment2] = pair

    if (
      (assignment1[0] <= assignment2[0] && assignment1[1] >= assignment2[1]) ||
      (assignment2[0] <= assignment1[0] && assignment2[1] >= assignment1[1])
    ) {
      target++
    }
  })
  return target
}

export const solutionTwo = () => {
  const pairs = prepareData(data)
  let target = 0
  pairs.forEach(pair => {
    const [assignment1, assignment2] = pair
    const range1 = range(assignment1[0], assignment1[1] + 1)
    const range2 = range(assignment2[0], assignment2[1] + 1)
    if (intersection(range1, range2).length) {
      target++
    }
  })
  return target
}
