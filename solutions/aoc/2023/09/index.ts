// Advent of Code | 2023 | Day 9 | Mirage Maintenance
// https://adventofcode.com/2023/day/9
// https://adventofcode.com/2023/day/9/input

import { cloneDeep } from 'lodash'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2023 | Day 9 | Mirage Maintenance'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

export const constructSequenceList = (baseSequence: number[]) => {
  const sequenceList = [baseSequence]
  do {
    const sequence = sequenceList.slice(-1)[0]
    const next = []
    for (let i = 0; i < sequence.length - 1; i++) {
      next.push(sequence[i + 1] - sequence[i])
    }
    sequenceList.push(next)
  } while (!sequenceList.slice(-1)[0].every(n => n === 0))
  return sequenceList
}

export const iterateSequenceList = (sequenceList: number[][], backwards: boolean) => {
  const list = cloneDeep(sequenceList)
  list.slice(-1)[0].push(0)
  for (let i = list.length - 2; i >= 0; i--) {
    if (backwards) {
      list[i].unshift(list[i][0] - list[i + 1][0])
    } else {
      list[i].push(list[i].slice(-1)[0] + list[i + 1].slice(-1)[0])
    }
  }
  return list
}

export const mapDataSequence = (line: string) => line.split(' ').map(i => parseInt(i))

export const solutionOne = () => {
  return data
    .map(dataLine => mapDataSequence(dataLine))
    .map(baseSequence => iterateSequenceList(constructSequenceList(baseSequence), false)[0].slice(-1)[0])
    .reduce((sum, num) => sum + num, 0)
}

export const solutionTwo = () => {
  return data
    .map(dataLine => mapDataSequence(dataLine))
    .map(baseSequence => iterateSequenceList(constructSequenceList(baseSequence), true)[0][0])
    .reduce((sum, num) => sum + num, 0)
}
