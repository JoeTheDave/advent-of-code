// https://adventofcode.com/2015/day/6
// https://adventofcode.com/2015/day/6/input

import { puzzleData, testData } from './data'

const probablyAFireHazard = () => {
  const useTestData = false
  const data = useTestData ? testData : puzzleData
  return [part1(data), part2(data)]
}

const generateLightGrid = () => {
  const grid: number[][] = []
  for (let x = 0; x < 1000; x++) {
    grid[x] = []
    for (let y = 0; y < 1000; y++) {
      grid[x][y] = 0
    }
  }
  return grid
}

const prepareInstruction = (line: string) => {
  const instruction = line
    .replace('turn ', 'turn-')
    .replace(' through ', ' ')
    .split(' ')
  const [xStart, yStart] = instruction[1].split(',').map(val => parseInt(val))
  const [xEnd, yEnd] = instruction[2].split(',').map(val => parseInt(val))
  return {
    operation: instruction[0],
    xStart,
    xEnd,
    yStart,
    yEnd,
  }
}

const evaluateGrid = (grid: number[][]) => {
  let count = 0
  grid.forEach(row =>
    row.forEach(val => {
      if (val) {
        count += val
      }
    }),
  )
  return count
}

const part1 = (data: string[]) => {
  const grid = generateLightGrid()
  data.forEach((dataLine: string) => {
    const instruction = prepareInstruction(dataLine)
    for (let x = instruction.xStart; x <= instruction.xEnd; x++) {
      for (let y = instruction.yStart; y <= instruction.yEnd; y++) {
        if (instruction.operation === 'turn-on') {
          grid[x][y] = 1
        } else if (instruction.operation === 'turn-off') {
          grid[x][y] = 0
        } else if (instruction.operation === 'toggle') {
          grid[x][y] = grid[x][y] === 0 ? 1 : 0
        }
      }
    }
  })
  return evaluateGrid(grid)
}

const part2 = (data: string[]) => {
  const grid = generateLightGrid()
  data.forEach((dataLine: string) => {
    const instruction = prepareInstruction(dataLine)
    for (let x = instruction.xStart; x <= instruction.xEnd; x++) {
      for (let y = instruction.yStart; y <= instruction.yEnd; y++) {
        if (instruction.operation === 'turn-on') {
          grid[x][y] += 1
        } else if (instruction.operation === 'turn-off') {
          grid[x][y] = Math.max(grid[x][y] - 1, 0)
        } else if (instruction.operation === 'toggle') {
          grid[x][y] += 2
        }
      }
    }
  })
  return evaluateGrid(grid)
}

export default probablyAFireHazard

export const solutionData = {
  puzzleData,
  testData,
}
