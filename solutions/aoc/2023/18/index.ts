// Advent of Code | 2023 | Day 18 | Lavaduct Lagoon
// https://adventofcode.com/2023/day/18
// https://adventofcode.com/2023/day/18/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2023 | Day 18 | Lavaduct Lagoon'
export const complete = [true, false]

const useTestData = false

const data = useTestData ? testData : puzzleData

const addColumnRight = (grid: string[][]) => grid.map(line => line.push('.'))

const addColumnLeft = (grid: string[][]) => grid.map(line => line.unshift('.'))

const addRowTop = (grid: string[][]) => grid.unshift(new Array(grid[0].length).fill('.'))

const addRowBottom = (grid: string[][]) => grid.push(new Array(grid[0].length).fill('.'))

export const solutionOne = () => {
  const instructions = data.map(line => line.split(' '))
  const grid = [
    ['.', '.', '.'],
    ['.', '*', '.'],
    ['.', '.', '.'],
  ]
  let xPos = 1
  let yPos = 1
  instructions.forEach(instruction => {
    const [direction, num] = instruction
    const iterations = parseInt(num)
    for (let i = 1; i <= iterations; i++) {
      switch (direction) {
        case 'U':
          yPos -= 1
          break
        case 'D':
          yPos += 1
          break
        case 'L':
          xPos -= 1
          break
        case 'R':
          xPos += 1
          break
      }
      grid[yPos][xPos] = '*'

      if (grid[yPos - 1] === undefined) {
        addRowTop(grid)
        yPos++
      }
      if (grid[yPos + 1] === undefined) {
        addRowBottom(grid)
      }
      if (grid[yPos][xPos - 1] === undefined) {
        addColumnLeft(grid)
        xPos++
      }
      if (grid[yPos][xPos + 1] === undefined) {
        addColumnRight(grid)
      }
    }
  })

  const eliminationQueue: string[] = ['0|0']
  do {
    const next = eliminationQueue.shift() as string
    const [xPos, yPos] = next.split('|').map(coord => parseInt(coord))
    grid[yPos][xPos] = '-'

    if (grid[yPos - 1] && grid[yPos - 1][xPos] === '.') {
      const coordKey = `${xPos}|${yPos - 1}`
      if (!eliminationQueue.includes(coordKey)) {
        eliminationQueue.push(coordKey)
      }
    }
    if (grid[yPos + 1] && grid[yPos + 1][xPos] === '.') {
      const coordKey = `${xPos}|${yPos + 1}`
      if (!eliminationQueue.includes(coordKey)) {
        eliminationQueue.push(coordKey)
      }
    }
    if (grid[yPos][xPos - 1] === '.') {
      const coordKey = `${xPos - 1}|${yPos}`
      if (!eliminationQueue.includes(coordKey)) {
        eliminationQueue.push(coordKey)
      }
    }
    if (grid[yPos][xPos + 1] === '.') {
      const coordKey = `${xPos + 1}|${yPos}`
      if (!eliminationQueue.includes(coordKey)) {
        eliminationQueue.push(coordKey)
      }
    }
  } while (eliminationQueue.length > 0)

  return grid
    .map(line => line.join(''))
    .join('')
    .split('')
    .filter(c => c !== '-').length
}

export const solutionTwo = () => {
  return null
}
