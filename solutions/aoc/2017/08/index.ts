// Advent of Code | 2017 | Day 8 | I Heard You Like Registers
// https://adventofcode.com/2017/day/8
// https://adventofcode.com/2017/day/8/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2017 | Day 8 | I Heard You Like Registers'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

let registers: { [key: string]: number } = {}
let maxValue = 0

const resetRegisters = () => {
  registers = {}
}

const getRegisterValue = (key: string) => {
  if (key in registers) {
    return registers[key]
  } else {
    registers[key] = 0
    return registers[key]
  }
}

const setRegisterValue = (key: string, value: number) => {
  const currentValue = getRegisterValue(key)
  const newValue = currentValue + value
  maxValue = Math.max(maxValue, newValue)
  registers[key] = newValue
}

const comparisonOperation = (register: string, operation: string, value: string) => {
  const val1 = getRegisterValue(register)
  const val2 = parseInt(value)
  switch (operation) {
    case '<':
      return val1 < val2
    case '<=':
      return val1 <= val2
    case '==':
      return val1 == val2
    case '>=':
      return val1 >= val2
    case '>':
      return val1 > val2
    case '!=':
      return val1 != val2
    default:
      console.log('Unrecognized Operation')
      return false
  }
}

const runInstructionSet = (data: string[]) => {
  data.forEach(row => {
    const instruction = row.split(' ')
    if (comparisonOperation(instruction[4], instruction[5], instruction[6])) {
      const register = instruction[0]
      const val = parseInt(instruction[2]) * (instruction[1] === 'inc' ? 1 : -1)
      setRegisterValue(register, val)
    }
  })
}

export const solutionOne = () => {
  resetRegisters()
  runInstructionSet(data)
  return Object.keys(registers).reduce((max, key) => Math.max(max, registers[key]), 0)
}

export const solutionTwo = () => {
  resetRegisters()
  runInstructionSet(data)
  return maxValue
}
