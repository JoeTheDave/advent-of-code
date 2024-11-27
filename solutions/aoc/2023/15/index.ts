// Advent of Code | 2023 | Day 15 | Lens Library
// https://adventofcode.com/2023/day/15
// https://adventofcode.com/2023/day/15/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2023 | Day 15 | Lens Library'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

export interface Lense {
  label: string
  focalLength: number
}

export const hashWord = (word: string) => {
  let score = 0
  for (let i = 0; i < word.length; i++) {
    score += word.charCodeAt(i)
    score *= 17
    score %= 256
  }
  return score
}

export const generateBoxList = () => {
  const boxes: Lense[][] = []
  for (let i = 0; i < 256; i++) {
    boxes[i] = []
  }
  return boxes
}

export const calculateLenseStrength = (boxes: Lense[][]) => {
  return boxes
    .map((box, boxId) => {
      return box
        .map((lense, lenseId) => (boxId + 1) * (lenseId + 1) * lense.focalLength)
        .reduce((sum, num) => sum + num, 0)
    })
    .reduce((sum, num) => sum + num, 0)
}

export const solutionOne = () => {
  const sequenceSteps = data[0].split(',')
  return sequenceSteps.map(sequenceStep => hashWord(sequenceStep)).reduce((sum, num) => sum + num, 0)
}

export const solutionTwo = () => {
  const boxes = generateBoxList()
  data[0].split(',').forEach(operation => {
    if (operation.includes('=')) {
      const [label, num] = operation.split('=')
      const boxId = hashWord(label)
      const existingLense = boxes[boxId].find(l => l.label === label)
      if (existingLense) {
        existingLense.focalLength = parseInt(num)
      } else {
        boxes[boxId].push({
          label,
          focalLength: parseInt(num),
        })
      }
    } else {
      const [label] = operation.split('-')
      const boxId = hashWord(label)
      const existingLense = boxes[boxId].find(l => l.label === label)
      if (existingLense) {
        const lenseIdx = boxes[boxId].indexOf(existingLense)
        boxes[boxId].splice(lenseIdx, 1)
      }
    }
  })
  return calculateLenseStrength(boxes)
}
