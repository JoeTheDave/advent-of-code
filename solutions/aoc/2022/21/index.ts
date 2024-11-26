// Advent of Code | 2022 | Day 21 | Monkey Math
// https://adventofcode.com/2022/day/21
// https://adventofcode.com/2022/day/21/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2022 | Day 21 | Monkey Math'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

class Monkey {
  name: string
  num: number | null
  operation: string | null
  deps: string[] | null
  parent: Monkey | null
  children: Monkey[] | null
  onHumnPath: boolean

  constructor(monkeyInfo: string) {
    const [name, operation] = monkeyInfo.split(': ')
    const operationInfo = operation.split(' ')
    if (operationInfo.length === 1) {
      this.num = parseInt(operationInfo[0])
      this.operation = null
      this.deps = null
    } else {
      this.num = null
      this.operation = operationInfo[1]
      this.deps = [operationInfo[0], operationInfo[2]]
    }
    this.name = name
    this.parent = null
    this.children = null
    this.onHumnPath = false
  }

  findHumanNumber(targetNumber: number): number {
    if (this.name === 'humn') {
      return targetNumber
    }
    const child1 = (this.children as Monkey[])[0]
    const child2 = (this.children as Monkey[])[1]
    if (child1.onHumnPath) {
      // Left child is variable
      if (this.operation === '+') {
        return child1.findHumanNumber(targetNumber - (child2.num as number))
      }
      if (this.operation === '-') {
        return child1.findHumanNumber(targetNumber + (child2.num as number))
      }
      if (this.operation === '*') {
        return child1.findHumanNumber(targetNumber / (child2.num as number))
      }
      if (this.operation === '/') {
        return child1.findHumanNumber(targetNumber * (child2.num as number))
      }
    } else {
      // Right child is variable
      if (this.operation === '+') {
        return child2.findHumanNumber(targetNumber - (child1.num as number))
      }
      if (this.operation === '-') {
        return child2.findHumanNumber((child1.num as number) - targetNumber)
      }
      if (this.operation === '*') {
        return child2.findHumanNumber(targetNumber / (child1.num as number))
      }
      if (this.operation === '/') {
        return child2.findHumanNumber((child1.num as number) / targetNumber)
      }
    }
    return 0
  }
}

class MonkeyBarrel {
  monkeys: Monkey[]
  root: Monkey

  constructor(data: string[]) {
    this.monkeys = data.map(dataRow => new Monkey(dataRow))
    this.root = this.monkeys.find(m => m.name === 'root') as Monkey
    this.monkeys.forEach(monkey => {
      if (monkey.deps) {
        monkey.children = [
          this.monkeys.find(m => m.name === (monkey.deps as string[])[0]) as Monkey,
          this.monkeys.find(m => m.name === (monkey.deps as string[])[1]) as Monkey,
        ]
      }
      if (monkey.name !== 'root') {
        monkey.parent = this.monkeys.find(m => m.deps !== null && m.deps.includes(monkey.name)) as Monkey
      }
    })
    let monkeyRef = this.monkeys.find(m => m.name === 'humn') as Monkey
    monkeyRef.onHumnPath = true
    do {
      monkeyRef = monkeyRef.parent as Monkey
      monkeyRef.onHumnPath = true
    } while (monkeyRef.name !== 'root')
  }

  rollCall() {
    do {
      this.monkeys
        .filter(m => m.num === null && m.children?.every(c => c.num !== null))
        .forEach(monkey => {
          const num1 = ((monkey.children as Monkey[])[0] as Monkey).num as number
          const num2 = ((monkey.children as Monkey[])[1] as Monkey).num as number
          if (monkey.operation === '+') {
            monkey.num = num1 + num2
          } else if (monkey.operation === '-') {
            monkey.num = num1 - num2
          } else if (monkey.operation === '*') {
            monkey.num = num1 * num2
          } else if (monkey.operation === '/') {
            monkey.num = num1 / num2
          }
        })
    } while (this.root.num === null)
    return this.root.num
  }

  findHumanNumber() {
    let humanPathMonkey = this.root.children?.find(m => m.onHumnPath) as Monkey
    let targetNumber = this.root.children?.find(m => !m.onHumnPath)?.num as number
    return humanPathMonkey.findHumanNumber(targetNumber)
  }
}

export const solutionOne = () => {
  const monkeyBarrel = new MonkeyBarrel(data)
  const res = monkeyBarrel.rollCall()
  return res
}

export const solutionTwo = () => {
  const monkeyBarrel = new MonkeyBarrel(data)
  monkeyBarrel.rollCall()
  const humanNumber = monkeyBarrel.findHumanNumber()
  return humanNumber
}
