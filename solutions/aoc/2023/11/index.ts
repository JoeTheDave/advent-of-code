// Advent of Code | 2023 | Day 11 | Cosmic Expansion
// https://adventofcode.com/2023/day/11
// https://adventofcode.com/2023/day/11/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2023 | Day 11 | Cosmic Expansion'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

const getGalaxyCoordinatesList = (spaceData: string[]) => {
  const galaxyCoords: number[][] = []
  spaceData.forEach((dataRow, y) => {
    dataRow.split('').forEach((pixel, x) => {
      if (pixel === '#') {
        galaxyCoords.push([x, y])
      }
    })
  })
  return galaxyCoords
}

const getEmptySpaceInfo = (spaceData: string[]) => {
  const emptyRows = []
  const emptyCols = []
  for (let i = 0; i < spaceData.length; i++) {
    if (!spaceData[i].includes('#')) {
      emptyRows.push(i)
    }
  }
  for (let i = 0; i < spaceData[0].length; i++) {
    if (!spaceData.map(dataRow => dataRow[i]).includes('#')) {
      emptyCols.push(i)
    }
  }
  return { emptyRows, emptyCols }
}

export const solutionOne = () => {
  const dataset = data
  const galaxyList = getGalaxyCoordinatesList(dataset)
  const { emptyRows, emptyCols } = getEmptySpaceInfo(dataset)
  galaxyList.forEach(galaxy => {
    galaxy[0] += emptyCols.filter(col => col < galaxy[0]).length
    galaxy[1] += emptyRows.filter(row => row < galaxy[1]).length
  })
  let distanceSum = 0
  for (let g1 = 0; g1 < galaxyList.length - 1; g1++) {
    for (let g2 = g1 + 1; g2 < galaxyList.length; g2++) {
      distanceSum += Math.abs(galaxyList[g2][0] - galaxyList[g1][0])
      distanceSum += Math.abs(galaxyList[g2][1] - galaxyList[g1][1])
    }
  }
  return distanceSum
}

export const solutionTwo = () => {
  const dataset = data
  const galaxyList = getGalaxyCoordinatesList(dataset)
  const { emptyRows, emptyCols } = getEmptySpaceInfo(dataset)
  galaxyList.forEach(galaxy => {
    galaxy[0] += emptyCols.filter(col => col < galaxy[0]).length * 999999
    galaxy[1] += emptyRows.filter(row => row < galaxy[1]).length * 999999
  })
  let distanceSum = 0
  for (let g1 = 0; g1 < galaxyList.length - 1; g1++) {
    for (let g2 = g1 + 1; g2 < galaxyList.length; g2++) {
      distanceSum += Math.abs(galaxyList[g2][0] - galaxyList[g1][0])
      distanceSum += Math.abs(galaxyList[g2][1] - galaxyList[g1][1])
    }
  }
  return distanceSum
}
