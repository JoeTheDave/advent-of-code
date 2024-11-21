// Advent of Code | 2017 | Day 10 | Knot Hash
// https://adventofcode.com/2017/day/10
// https://adventofcode.com/2017/day/10/input

import { testData, puzzleData } from './data'
import { range } from 'lodash'

export const displayName = 'AOC | 2017 | Day 10 | Knot Hash'
export const complete = [true, false]

const useTestData = true

const data = useTestData ? testData : puzzleData

const loopSize = useTestData ? 5 : 256

const getLengthIndexSelection = (position: number, segmentSize: number) =>
  range(position, position + segmentSize).map(i => (i >= loopSize ? i - loopSize : i))

export const solutionOne = () => {
  const numberLoop = range(loopSize)
  let position = 0
  let skipSize = 0

  data.forEach(segmentLength => {
    const idxSelection = getLengthIndexSelection(position, segmentLength)
    const selection = idxSelection.map(idx => numberLoop[idx])
    selection.reverse()
    idxSelection.forEach((loopIdx, idx) => (numberLoop[loopIdx] = selection[idx]))
    position += segmentLength + skipSize
    position = position % loopSize
    skipSize++
  })

  return numberLoop[0] * numberLoop[1]
}

export const solutionTwo = () => {
  const numberLoop = range(loopSize)
  let position = 0
  let skipSize = 0

  const lenthSuffixValues = [17, 31, 73, 47, 23]
  const segments = [
    ...data
      .join(',')
      .split('')
      .map(char => char.charCodeAt(0)),
    ...lenthSuffixValues,
  ]

  for (let i = 1; i <= 64; i++) {
    segments.forEach(segmentLength => {
      const idxSelection = getLengthIndexSelection(position, segmentLength)
      const selection = idxSelection.map(idx => numberLoop[idx])
      selection.reverse()
      idxSelection.forEach((loopIdx, idx) => (numberLoop[loopIdx] = selection[idx]))
      position += segmentLength + skipSize
      position = position % loopSize
      skipSize++
    })
  }

  console.log(numberLoop)

  return null
}
