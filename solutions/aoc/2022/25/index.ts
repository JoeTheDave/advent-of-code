// Advent of Code | 2022 | Day 25 | Full of Hot Air
// https://adventofcode.com/2022/day/25
// https://adventofcode.com/2022/day/25/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2022 | Day 25 | Full of Hot Air'
export const complete = [true, false]

const useTestData = false

const data = useTestData ? testData : puzzleData

const snafuToDecimalDigitMap: { [key: string]: number } = {
  '=': -2,
  '-': -1,
  '0': 0,
  '1': 1,
  '2': 2,
}

const snafuToDecimal = (snafuNum: string) => {
  const digits = snafuNum.split('').reverse()
  let sum = 0
  digits.forEach((digit, i) => {
    sum += snafuToDecimalDigitMap[digit] * 5 ** i
  })
  return sum
}

const findSignificantDigitCount = (num: number) => {
  let significantDigits = 0
  for (let x = 1; x <= 100; x++) {
    if (num > Math.floor(5 ** (x - 1) / 2) && num <= Math.floor(5 ** x / 2)) {
      significantDigits = x
      break
    }
  }
  return significantDigits || 1
}

const decimalToSnafu = (num: number) => {
  const significantDigits = findSignificantDigitCount(num)
  let snafu = ''
  let remainder = num
  for (let i = significantDigits - 1; i >= 0; i--) {
    const placeVal = 5 ** i
    let digit = '0'
    if (Math.floor(placeVal * 2.5) >= remainder && remainder >= Math.ceil(placeVal * 1.5)) {
      digit = '2'
    } else if (Math.floor(placeVal * 1.5) >= remainder && remainder >= Math.ceil(placeVal * 0.5)) {
      digit = '1'
    } else if (Math.floor(placeVal * 1.5) * -1 <= remainder && remainder <= Math.ceil(placeVal * 0.5) * -1) {
      digit = '-'
    } else if (Math.floor(placeVal * 2.5) * -1 <= remainder && remainder <= Math.ceil(placeVal * 1.5) * -1) {
      digit = '='
    }
    const digitAmount = snafuToDecimalDigitMap[digit] * placeVal
    remainder -= digitAmount
    snafu += digit
  }
  return snafu
}

export const solutionOne = () => {
  const summation = data.reduce((sum, num) => sum + snafuToDecimal(num), 0)
  return decimalToSnafu(summation)
}

export const solutionTwo = () => {
  return null
}
