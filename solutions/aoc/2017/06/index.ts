// Advent of Code | 2017 | Day 6 | Memory Reallocation
// https://adventofcode.com/2017/day/6
// https://adventofcode.com/2017/day/6/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2017 | Day 6 | Memory Reallocation'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

const getLargestMemoryBank = () => {
  const largestValue = Math.max(...data)
  return data.findIndex(val => val === largestValue)
}

const redistribute = (targetIdx: number) => {
  let amount = data[targetIdx]
  data[targetIdx] = 0
  let focusIdx = targetIdx + 1
  for (amount; amount > 0; amount--) {
    if (focusIdx > data.length - 1) {
      focusIdx = 0
    }
    data[focusIdx]++
    focusIdx++
  }
}

export const solutionOne = () => {
  const memoryStates: { [key: string]: number } = {}
  let exitCondition = false
  let iterations = -1

  do {
    iterations++
    const key = data.join('|')
    if (key in memoryStates) {
      exitCondition = true
    } else {
      memoryStates[key] = iterations
    }
    redistribute(getLargestMemoryBank())
  } while (!exitCondition)
  return iterations
}

export const solutionTwo = () => {
  const memoryStates: { [key: string]: number } = {}
  let exitCondition = false
  let iterations = -1
  let loopSize = 0

  do {
    iterations++
    const key = data.join('|')
    if (key in memoryStates) {
      exitCondition = true
      loopSize = iterations - memoryStates[key]
    } else {
      memoryStates[key] = iterations
    }
    redistribute(getLargestMemoryBank())
  } while (!exitCondition)
  return loopSize
}
