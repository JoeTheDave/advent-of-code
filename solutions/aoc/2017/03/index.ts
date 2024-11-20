// Advent of Code | 2017 | Day 3 | Spiral Memory
// https://adventofcode.com/2017/day/3
// https://adventofcode.com/2017/day/3/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2017 | Day 3 | Spiral Memory'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

type Direction = 'U' | 'D' | 'L' | 'R'

const nextDirection = {
  D: 'R',
  R: 'U',
  U: 'L',
  L: 'D',
} as { [key in Direction]: Direction }

export const solutionOne = () => {
  let xPos = 0
  let yPos = 0
  let steps = 0
  let stepsTarget = 0
  let increaseTarget = true
  let direction: Direction = 'D'

  for (let i = 2; i <= data; i++) {
    if (steps === stepsTarget) {
      steps = 0
      direction = nextDirection[direction]
      if (increaseTarget) {
        stepsTarget++
        increaseTarget = false
      } else {
        increaseTarget = true
      }
    }
    if (direction === 'U') {
      yPos++
    }
    if (direction === 'D') {
      yPos--
    }
    if (direction === 'L') {
      xPos--
    }
    if (direction === 'R') {
      xPos++
    }
    steps++
  }
  return Math.abs(xPos) + Math.abs(yPos)
}

export const solutionTwo = () => {
  let xPos = 0
  let yPos = 0
  let steps = 0
  let stepsTarget = 0
  let increaseTarget = true
  let direction: Direction = 'D'

  const numberGrid: { [key: string]: number } = {
    '0,0': 1,
  }

  const evaluateSquare = (x: number, y: number) => {
    let val = 0
    let key = `${x},${y}`
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (!(i === 0 && j === 0)) {
          const key = `${x + i},${y + j}`
          val += numberGrid[key] || 0
        }
      }
    }
    numberGrid[key] = val
    return val
  }

  let printedVal = 1
  do {
    if (steps === stepsTarget) {
      steps = 0
      direction = nextDirection[direction]
      if (increaseTarget) {
        stepsTarget++
        increaseTarget = false
      } else {
        increaseTarget = true
      }
    }
    if (direction === 'U') {
      yPos++
    }
    if (direction === 'D') {
      yPos--
    }
    if (direction === 'L') {
      xPos--
    }
    if (direction === 'R') {
      xPos++
    }
    steps++
    printedVal = evaluateSquare(xPos, yPos)
  } while (printedVal <= data)
  return printedVal
}
