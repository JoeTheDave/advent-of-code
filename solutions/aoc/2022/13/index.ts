// Advent of Code | 2022 | Day 13 | Distress Signal
// https://adventofcode.com/2022/day/13
// https://adventofcode.com/2022/day/13/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2022 | Day 13 | Distress Signal'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

const compValues = (left: any, right: any) => {
  if (typeof left === 'number' && typeof right === 'number') {
    if (left < right) {
      return 1
    } else if (right < left) {
      return -1
    } else {
      return 0
    }
  }

  const leftArray = typeof left === 'object' ? left : [left]
  const rightArray = typeof right === 'object' ? right : [right]

  for (let i = 0; i < Math.max(leftArray.length, rightArray.length); i++) {
    if (leftArray[i] === undefined) {
      return 1
    }
    if (rightArray[i] === undefined) {
      return -1
    }
    let compResult = compValues(leftArray[i], rightArray[i]) as number
    if (compResult !== 0) {
      return compResult
    }
  }
  return 0
}

export const solutionOne = () => {
  const pairs = []
  for (let i = 0; i < data.length; i += 3) {
    pairs.push({ left: JSON.parse(data[i]), right: JSON.parse(data[i + 1]) })
  }
  const correctPairIdxs: number[] = []
  pairs.forEach(({ left, right }, idx) => {
    if (compValues(left, right) === 1) {
      correctPairIdxs.push(idx + 1)
    }
  })
  return correctPairIdxs.reduce((sum, num) => sum + num)
}

export const solutionTwo = () => {
  const lines = [JSON.parse('[[2]]'), JSON.parse('[[6]]')]
  data.forEach(line => {
    if (line) {
      lines.push(JSON.parse(line))
    }
  })
  const orderdLines = lines
    .sort((a, b) => compValues(a, b))
    .reverse()
    .map(l => JSON.stringify(l))
  return (orderdLines.indexOf('[[2]]') + 1) * (orderdLines.indexOf('[[6]]') + 1)
}
