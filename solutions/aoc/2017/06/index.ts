// Advent of Code | 2017 | Day 6 | Memory Reallocation
// https://adventofcode.com/2017/day/6
// https://adventofcode.com/2017/day/6/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2017 | Day 6 | Memory Reallocation'
export const complete = [true, false]

const useTestData = true

const data = useTestData ? testData : puzzleData

export const solutionOne = () => {
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

  const memoryStates: { [key: string]: boolean } = {}

  let exitCondition = false
  let iterations = 0
  redistribute(getLargestMemoryBank())
  do {
    const key = data.join('|')
    if (key in memoryStates) {
      exitCondition = true
    } else {
      memoryStates[key] = true
      console.log(key)
    }
    iterations++
  } while (!exitCondition)
  return iterations
}

export const solutionTwo = () => {
  return null
}
