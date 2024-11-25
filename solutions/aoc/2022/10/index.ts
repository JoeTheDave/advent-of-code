// Advent of Code | 2022 | Day 10 | Cathode-Ray Tube
// https://adventofcode.com/2022/day/10
// https://adventofcode.com/2022/day/10/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2022 | Day 10 | Cathode-Ray Tube'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

export const solutionOne = () => {
  let xReg = 1
  const cycleValues = []
  let signalStrenthSum = 0
  for (let i = 0; i < data.length; i++) {
    if (data[i] === 'noop') {
      cycleValues.push(xReg)
    } else {
      cycleValues.push(xReg)
      cycleValues.push(xReg)
      xReg += parseInt(data[i].split(' ')[1])
    }
  }
  for (let i = 20; i <= 220; i += 40) {
    signalStrenthSum += cycleValues[i - 1] * i
  }
  return signalStrenthSum
}

export const solutionTwo = () => {
  let cursorPosition = 1
  const cycleValues = []
  const output = []
  for (let i = 0; i < data.length; i++) {
    if (data[i] === 'noop') {
      cycleValues.push(cursorPosition)
    } else {
      cycleValues.push(cursorPosition)
      cycleValues.push(cursorPosition)
      cursorPosition += parseInt(data[i].split(' ')[1])
    }
  }
  for (let c = 0; c < cycleValues.length; c++) {
    if (cycleValues[c] - 1 <= c % 40 && c % 40 <= cycleValues[c] + 1) {
      output.push('#')
    } else {
      output.push('.')
    }
  }
  const screen = []
  for (let i = 0; i < 240 / 40; i++) {
    screen.push(output.slice(i * 40, i * 40 + 40).join(''))
  }
  return screen
}
