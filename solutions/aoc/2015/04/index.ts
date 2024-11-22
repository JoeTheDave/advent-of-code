// Advent of Code | 2015 | Day 4 | The Ideal Stocking Stuffer
// https://adventofcode.com/2015/day/4
// https://adventofcode.com/2015/day/4/input

import { createHash } from 'crypto'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2015 | Day 4 | The Ideal Stocking Stuffer'
export const complete = [true, false]

const useTestData = false

const data = useTestData ? testData : puzzleData

const generateMD5Hash = (input: string): string => {
  const hash = createHash('md5')
  hash.update(input)
  return hash.digest('hex')
}

export const solutionOne = () => {
  let i = 0
  let exitCondition = false
  do {
    i++
    if (generateMD5Hash(`${data[0]}${i}`).substring(0, 5) === '00000') {
      exitCondition = true
    }
  } while (!exitCondition)
  return i
}

export const solutionTwo = () => {
  return null
}
