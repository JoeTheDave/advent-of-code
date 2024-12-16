// Advent of Code | 2024 | Day 13 | Claw Contraption
// https://adventofcode.com/2024/day/13
// https://adventofcode.com/2024/day/13/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2024 | Day 13 | Claw Contraption'
export const complete = [true, true]

const useTestData = false

const rawData = useTestData ? testData : puzzleData

type Coordinates = {
  x: bigint
  y: bigint
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
    const buttonA = data[i].match(/X\+(\d+), Y\+(\d+)/) as RegExpMatchArray
    const buttonB = data[i + 1].match(/X\+(\d+), Y\+(\d+)/) as RegExpMatchArray
    const prize = data[i + 2].match(/X\=(\d+), Y\=(\d+)/) as RegExpMatchArray
    machine.a.x = BigInt(parseInt(buttonA[1]))
    machine.a.y = BigInt(parseInt(buttonA[2]))
    machine.b.x = BigInt(parseInt(buttonB[1]))
    machine.b.y = BigInt(parseInt(buttonB[2]))
    machine.prize.x = BigInt(parseInt(prize[1]))
    machine.prize.y = BigInt(parseInt(prize[2]))
    machines.push(machine)
  }
  return machines
}

export const solutionOne = () => {
  const machines: MachineInfo[] = compileMachineData(rawData)
  return machines
    .map(m => {
      const a = (m.prize.x * m.b.y - m.prize.y * m.b.x) / (m.a.x * m.b.y - m.a.y * m.b.x)
      const aWhole = (m.prize.x * m.b.y - m.prize.y * m.b.x) % (m.a.x * m.b.y - m.a.y * m.b.x) === 0n
      const b = (m.prize.x - m.a.x * a) / m.b.x
      const bWhole = (m.prize.x - m.a.x * a) % m.b.x === 0n
      return aWhole && bWhole ? 3n * a + b : 0n
    })
    .reduce((sum, num) => BigInt(sum) + BigInt(num), 0n)
}

export const solutionTwo = () => {
  const machines: MachineInfo[] = compileMachineData(rawData)
  return machines
    .map(m => {
      m.prize.x += BigInt(10000000000000)
      m.prize.y += BigInt(10000000000000)
      const a = (m.prize.x * m.b.y - m.prize.y * m.b.x) / (m.a.x * m.b.y - m.a.y * m.b.x)
      const aWhole = (m.prize.x * m.b.y - m.prize.y * m.b.x) % (m.a.x * m.b.y - m.a.y * m.b.x) === 0n
      const b = (m.prize.x - m.a.x * a) / m.b.x
      const bWhole = (m.prize.x - m.a.x * a) % m.b.x === 0n
      return aWhole && bWhole ? 3n * a + b : 0n
    })
    .reduce((sum, num) => BigInt(sum) + BigInt(num), 0n)
}
