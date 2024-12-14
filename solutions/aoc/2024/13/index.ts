// Advent of Code | 2024 | Day 13 | Claw Contraption
// https://adventofcode.com/2024/day/13
// https://adventofcode.com/2024/day/13/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2024 | Day 13 | Claw Contraption'
export const complete = [false, false]

const useTestData = true

const rawData = useTestData ? testData : puzzleData

type Coordinates = {
  x: number
  y: number
}

type MachineInfo = {
  a: Coordinates
  b: Coordinates
  prize: Coordinates
}

const compileMachineData = (data: string[]) => {
  const machines: MachineInfo[] = []
  for (let i = 0; i < data.length; i += 4) {
    const machine = { a: {}, b: {}, prize: {} } as MachineInfo
    const buttonA = data[i].match(/X\+(\d+), Y\+(\d+)/)

    // const buttonA = data[i].replace('Button A: ', '').replace('X+', '').replace('Y+', '').split(', ')
    const buttonB = data[i + 1].replace('Button B: ', '').replace('X+', '').replace('Y+', '').split(', ')
    const prize = data[i + 2].replace('Prize: ', '')
    console.log(buttonA)
    console.log(buttonB)
    console.log(prize)
  }
}

export const solutionOne = () => {
  const machines: MachineInfo[] = compileMachineData(rawData)
  return machines
}

export const solutionTwo = () => {
  return null
}
