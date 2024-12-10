// Advent of Code | 2022 | Day 11 | Monkey in the Middle
// https://adventofcode.com/2022/day/11
// https://adventofcode.com/2022/day/11/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2022 | Day 11 | Monkey in the Middle'
export const complete = [true, false]

const useTestData = true

const data = useTestData ? testData : puzzleData

interface Monkey {
  id: number
  items: number[]
  operation: string
  test: number
  trueMonkey: number
  falseMonkey: number
  inspectionCount: number
}

const contructMonekies = (data: string[]) => {
  let monkeys: Monkey[] = []
  for (let m = 0; m < data.length; m += 7) {
    monkeys.push({
      id: parseInt(data[m].split(' ')[1][0]),
      items: data[m + 1]
        .trim()
        .replace('Starting items: ', '')
        .split(', ')
        .map(n => parseInt(n)),
      operation: data[m + 2].trim().replace('Operation: new = ', ''),
      test: parseInt(data[m + 3].trim().replace('Test: divisible by ', '')),
      trueMonkey: parseInt(data[m + 4].trim().replace('If true: throw to monkey ', '')),
      falseMonkey: parseInt(data[m + 5].trim().replace('If false: throw to monkey ', '')),
      inspectionCount: 0,
    })
  }
  return monkeys
}

export const evaluateOperation = (item: number, operation: string) => {
  const op = operation.split(' ')
  const num1 = op[0] === 'old' ? item : parseInt(op[0])
  const num2 = op[2] === 'old' ? item : parseInt(op[2])
  return op[1] === '+' ? num1 + num2 : num1 * num2
}

export const solutionOne = () => {
  const monkeys = contructMonekies(data)
  for (let round = 0; round < 20; round++) {
    monkeys.forEach(monkey => {
      monkey.items.forEach(item => {
        const newValue = Math.floor(evaluateOperation(item, monkey.operation) / 3)
        monkeys[newValue % monkey.test === 0 ? monkey.trueMonkey : monkey.falseMonkey].items.push(newValue)
      })
      monkey.inspectionCount += monkey.items.length
      monkey.items = []
    })
  }
  return monkeys
    .map(m => m.inspectionCount)
    .sort((a, b) => a - b)
    .slice(-2)
    .reduce((product, num) => product * num, 1)
}

export const solutionTwo = () => {
  const monkeys = contructMonekies(data)
  for (let round = 0; round < 1000; round++) {
    monkeys.forEach(monkey => {
      monkey.items.forEach(item => {
        const newValue = evaluateOperation(item, monkey.operation)
        monkeys[newValue % monkey.test === 0 ? monkey.trueMonkey : monkey.falseMonkey].items.push(newValue)
      })
      monkey.inspectionCount += monkey.items.length
      monkey.items = []
    })
  }
  return monkeys
    .map(m => m.inspectionCount)
    .sort((a, b) => a - b)
    .slice(-2)
    .reduce((product, num) => product * num, 1)
}
