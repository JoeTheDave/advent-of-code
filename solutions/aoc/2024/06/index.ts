// Advent of Code | 2024 | Day 6 | Guard Gallivant
// https://adventofcode.com/2024/day/6
// https://adventofcode.com/2024/day/6/input

import { cloneDeep } from 'lodash'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2024 | Day 6 | Guard Gallivant'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

const getStartCoords = (grid: string[]) => {
  const row = grid.find(r => r.includes('^')) as string
  const y = grid.indexOf(row)
  const x = row.indexOf('^')
  return [x, y]
}

const getNextCoords = (grid: string[], location: number[], dir: number) => {
  let nextCoord = location
  if (dir === 0) {
    // up
    nextCoord = [nextCoord[0], nextCoord[1] - 1]
  } else if (dir === 1) {
    // right
    nextCoord = [nextCoord[0] + 1, nextCoord[1]]
  } else if (dir === 2) {
    // down
    nextCoord = [nextCoord[0], nextCoord[1] + 1]
  } else if (dir === 3) {
    // left
    nextCoord = [nextCoord[0] - 1, nextCoord[1]]
  }
  if (nextCoord[1] < 0 || nextCoord[1] >= grid.length || nextCoord[0] < 0 || nextCoord[0] > grid[0].length) {
    return { location: null, dir }
  }
  if (grid[nextCoord[1]][nextCoord[0]] === '#') {
    dir = dir === 3 ? 0 : dir + 1
    return getNextCoords(grid, location, dir)
  }
  return { location: nextCoord, dir }
}

export const solutionOne = () => {
  const coordsList: { [key: string]: number } = {}
  let location = getStartCoords(data)
  let dir = 0
  let exitCondition = false
  while (!exitCondition) {
    const coordsKey = `${location[0]}|${location[1]}`
    coordsList[coordsKey] = coordsList[coordsKey] ? coordsList[coordsKey] + 1 : 1
    const { location: nextLocation, dir: nextDir } = getNextCoords(data, location, dir)
    if (nextLocation === null) {
      exitCondition = true
    } else {
      location = nextLocation
      dir = nextDir
    }
  }
  return Object.keys(coordsList).length
}

// Note: This solution takes nearly 17 seconds to run.
export const solutionTwo = () => {
  let validObstructionPlacements = 0
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      if (data[y][x] === '.') {
        const grid = cloneDeep(data).map((row, rowIdx) =>
          row
            .split('')
            .map((l, lIdx) => (rowIdx === y && lIdx === x ? '#' : l))
            .join(''),
        )
        const coordsList: { [key: string]: boolean } = {}
        let location = getStartCoords(grid)
        let dir = 0
        let exitCondition = false
        while (!exitCondition) {
          const coordsKey = `${location[0]}|${location[1]}|${dir}`
          if (coordsList[coordsKey]) {
            validObstructionPlacements++
            exitCondition = true
          } else {
            coordsList[coordsKey] = true
          }
          const { location: nextLocation, dir: nextDir } = getNextCoords(grid, location, dir)
          if (nextLocation === null) {
            exitCondition = true
          } else {
            location = nextLocation
            dir = nextDir
          }
        }
      }
    }
  }
  return validObstructionPlacements
}
