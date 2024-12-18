// Advent of Code | 2024 | Day 17 | Chronospatial Computer
// https://adventofcode.com/2024/day/17
// https://adventofcode.com/2024/day/17/input

import { testData, testDataPart2, puzzleData } from './data'

export const displayName = 'AOC | 2024 | Day 17 | Chronospatial Computer'
export const complete = [true, false]

const useTestData = false

const bigIntXOR = (a: bigint, b: bigint) => {
  const binA = a.toString(2)
  const binB = b.toString(2)
  const maxLength = Math.max(binA.length, binB.length)
  const paddedA = binA.padStart(maxLength, '0')
  const paddedB = binB.padStart(maxLength, '0')
  let result = ''
  for (let i = 0; i < maxLength; i++) {
    result += paddedA[i] === paddedB[i] ? '0' : '1'
  }
  return BigInt('0b' + result)
}

class ChronospatialComputer {
  registerA: bigint
  registerB: bigint
  registerC: bigint
  instructionPointer: number
  instructions: number[]
  out: number[]

  constructor(data: string[]) {
    this.registerA = BigInt(data[0].split(' ')[2])
    this.registerB = BigInt(data[1].split(' ')[2])
    this.registerC = BigInt(data[2].split(' ')[2])
    this.instructionPointer = 0
    this.instructions = data[4]
      .split(' ')[1]
      .split(',')
      .map(n => parseInt(n))
    this.out = []
  }

  getLiteralOperand = () => this.instructions[this.instructionPointer + 1]

  getComboOperand = () => {
    const operand = this.getLiteralOperand()
    let combo: bigint = 0n
    if (operand < 0 || operand > 7) {
      throw `Invalid operand: ${operand} does not fall in valid range 1-7.`
    } else if (operand >= 0 && operand <= 3) {
      combo = BigInt(operand)
    } else if (operand === 4) {
      combo = this.registerA
    } else if (operand === 5) {
      combo = this.registerB
    } else if (operand === 6) {
      combo = this.registerC
    } else if (operand === 7) {
      throw `operand 7 should not occur in a valid program.`
    }
    return combo
  }

  nextInstruction = () => {
    const instruction = this.instructions[this.instructionPointer]
    switch (instruction) {
      case 0:
        // adv
        this.registerA = this.registerA / 2n ** this.getComboOperand()
        this.instructionPointer += 2
        break
      case 1:
        // bxl
        this.registerB = bigIntXOR(this.registerB, BigInt(this.getLiteralOperand()))
        this.instructionPointer += 2
        break
      case 2:
        // bst
        this.registerB = this.getComboOperand() % 8n
        this.instructionPointer += 2
        break
      case 3:
        // jnz
        if (this.registerA === 0n) {
          this.instructionPointer += 2
        } else {
          this.instructionPointer = this.getLiteralOperand()
        }
        break
      case 4:
        // bxc
        this.registerB = bigIntXOR(this.registerB, this.registerC)
        this.instructionPointer += 2
        break
      case 5:
        // out
        this.out.push(parseInt(`${this.getComboOperand() % 8n}`))
        this.instructionPointer += 2
        break
      case 6:
        // bdv
        this.registerB = this.registerA / 2n ** this.getComboOperand()
        this.instructionPointer += 2
        break
      case 7:
        // cdv
        const combo = this.getComboOperand()
        this.registerC = this.registerA / 2n ** this.getComboOperand()
        this.instructionPointer += 2
        break
      default:
        throw 'Invalid instruction.'
    }
  }

  execute = () => {
    while (this.instructionPointer >= 0 && this.instructionPointer < this.instructions.length) {
      this.nextInstruction()
    }
    return this.out.join(',')
  }
}

const compare = (a: number[], b: number[]) => {
  let match = 0
  if (a.length !== b.length) {
    return match
  }
  for (let i = a.length - 1; i >= 0; i--) {
    if (a[i] === b[i]) {
      match++
    } else {
      break
    }
  }
  return match
}

const narrowSearchBetween = (data: string[], min: number, max: number) => {
  const steps = 100
  let step = Math.floor((max - min) / steps) || 1
  const results: { input: number; match: number; idx: number }[] = []

  for (let i = 0; min + i * step <= max; i++) {
    let attemptedValue = min + i * step
    const computer = new ChronospatialComputer(data)
    computer.registerA = BigInt(attemptedValue)
    computer.execute()
    const match = compare(computer.out, computer.instructions)
    results.push({ input: attemptedValue, match, idx: i })
  }
  const bestMatch = results.reduce((highest, obj) => Math.max(highest, obj.match), 0)
  const bestMatchList = results.filter(r => r.match === bestMatch)
  const firstIdx = bestMatchList.reduce((lowest, obj) => Math.min(lowest, obj.idx), steps)
  const lastIdx = bestMatchList.reduce((highest, obj) => Math.max(highest, obj.idx), 0)
  const newLow = results.find(r => r.idx === firstIdx - 1)?.input
  const newHigh = results.find(r => r.idx === lastIdx + 1)?.input
  if (!newLow || !newHigh) {
    throw 'unable to determine new search range'
  } else {
    return [newLow, newHigh]
  }
}

export const solutionOne = () => {
  const rawData = useTestData ? testData : puzzleData
  const computer = new ChronospatialComputer(rawData)
  return computer.execute()
}

export const solutionTwo = () => {
  const rawData = useTestData ? testDataPart2 : puzzleData

  let low = 2 ** 45
  let high = 2 ** 48

  while (high - low > 100000) {
    const [newLow, newHigh] = narrowSearchBetween(rawData, low, high)
    low = newLow
    high = newHigh
  }

  let result = 0
  for (let i = low; i <= high * 2; i++) {
    let attemptedValue = i
    const computer = new ChronospatialComputer(rawData)
    computer.registerA = BigInt(attemptedValue)
    computer.execute()
    const match = compare(computer.out, computer.instructions)
    console.log(`${attemptedValue} - [${computer.out.join(',')}] - ${match}`)
    if (computer.out.join(',') === computer.instructions.join(',')) {
      result = i
      break
    }
  }
  return result
}
