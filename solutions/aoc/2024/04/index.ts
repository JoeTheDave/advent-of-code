// Advent of Code | 2024 | Day 4 | Ceres Search
// https://adventofcode.com/2024/day/4
// https://adventofcode.com/2024/day/4/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2024 | Day 4 | Ceres Search'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

export const solutionOne = () => {
  let count = 0
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      for (let yy = -1; yy <= 1; yy++) {
        for (let xx = -1; xx <= 1; xx++) {
          const cantUp = yy === -1 && y < 3
          const cantLeft = xx === -1 && x < 3
          const cantDown = yy === 1 && y > data.length - 4
          const cantRight = xx === 1 && x > data[y].length - 4
          if (!(cantUp || cantLeft || cantDown || cantRight)) {
            let l1 = data[y][x]
            let l2 = data[y + yy * 1][x + xx * 1]
            let l3 = data[y + yy * 2][x + xx * 2]
            let l4 = data[y + yy * 3][x + xx * 3]
            const test = `${l1}${l2}${l3}${l4}`
            if (test === 'XMAS') {
              count++
            }
          }
        }
      }
    }
  }
  return count
}

export const solutionTwo = () => {
  let count = 0
  for (let y = 0; y < data.length - 2; y++) {
    for (let x = 0; x < data[y].length - 2; x++) {
      const w1 = `${data[y][x]}${data[y + 1][x + 1]}${data[y + 2][x + 2]}`
      const w2 = `${data[y + 2][x]}${data[y + 1][x + 1]}${data[y][x + 2]}`
      if (
        (w1 === 'MAS' && w2 === 'MAS') ||
        (w1.split('').reverse().join('') === 'MAS' && w2 === 'MAS') ||
        (w1 === 'MAS' && w2.split('').reverse().join('') === 'MAS') ||
        (w1.split('').reverse().join('') === 'MAS' && w2.split('').reverse().join('') === 'MAS')
      ) {
        count++
      }
    }
  }
  return count
}
