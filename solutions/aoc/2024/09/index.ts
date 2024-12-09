// Advent of Code | 2024 | Day 9 | Disk Fragmenter
// https://adventofcode.com/2024/day/9
// https://adventofcode.com/2024/day/9/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2024 | Day 9 | Disk Fragmenter'
export const complete = [false, false]

const useTestData = true

const data = useTestData ? testData : puzzleData

export const solutionOne = () => {
  const memoryBlock: (number | null)[] = []
  data.split('').map((digit, idx) => {
    const count = parseInt(digit)
    for (let i = 0; i < count; i++) {
      memoryBlock.push(idx % 2 === 0 ? idx / 2 : null)
    }
  })

  console.log(memoryBlock.map(n => (n === null ? '.' : n)).join(''))
  console.log(memoryBlock.indexOf(null))
  console.log(memoryBlock.map(n => (n === null ? '.' : n)).join(''))

  // return memoryBlock.map(n => (n === null ? '.' : n)).join('')
}

export const solutionTwo = () => {
  return null
}
