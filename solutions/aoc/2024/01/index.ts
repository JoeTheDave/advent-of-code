// Advent of Code | 2024 | Day 1 | Historian Hysteria
// https://adventofcode.com/2024/day/1
// https://adventofcode.com/2024/day/1/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2024 | Day 1 | Historian Hysteria'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

const prepareData = (data: string[]) => {
  return data
    .map(dataRow =>
      dataRow
        .split(' ')
        .filter(v => v !== '')
        .map(n => parseInt(n)),
    )
    .reduce(
      (lists, row) => {
        lists[0].push(row[0])
        lists[1].push(row[1])
        return lists
      },
      [[], []] as number[][],
    )
}

export const solutionOne = () => {
  const dataSet = prepareData(data)
  dataSet[0].sort()
  dataSet[1].sort()
  return dataSet[0].map((val, idx) => Math.abs(dataSet[1][idx] - val)).reduce((sum, num) => sum + num, 0)
}

export const solutionTwo = () => {
  const dataSet = prepareData(data)
  return dataSet[0].map((val, idx) => val * dataSet[1].filter(v => v === val).length).reduce((sum, num) => sum + num, 0)
}
