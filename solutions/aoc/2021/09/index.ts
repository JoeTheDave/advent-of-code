// Advent of Code | 2021 | Day 9 | Smoke Basin
// https://adventofcode.com/2021/day/9
// https://adventofcode.com/2021/day/9/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2021 | Day 9 | Smoke Basin'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

export interface GridSquare {
  id: number
  x: number
  y: number
  elevation: number
  nN: GridSquare | null
  eN: GridSquare | null
  sN: GridSquare | null
  wN: GridSquare | null
  basinId: number | null
}

export const propagateBasinId = (gridSquare: GridSquare) => {
  const neighbors = [gridSquare.nN, gridSquare.eN, gridSquare.sN, gridSquare.wN]
  neighbors.forEach(neighboringSquare => {
    if (neighboringSquare && neighboringSquare.elevation !== 9 && neighboringSquare.basinId === null) {
      neighboringSquare.basinId = gridSquare.basinId
      propagateBasinId(neighboringSquare)
    }
  })
}

export const constructGridSquaresArray = (data: string[]) => {
  const gridSquares: GridSquare[] = []
  for (let y = 0; y < data.length; y++) {
    const row = data[y].split('').map(i => parseInt(i))
    for (let x = 0; x < data[y].split('').length; x++) {
      gridSquares.push({
        id: y * row.length + x,
        x,
        y,
        elevation: row[x],
        nN: null,
        eN: null,
        sN: null,
        wN: null,
        basinId: null,
      })
    }
  }
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].split('').length; x++) {
      const gridSquare = gridSquares.find(gs => gs.x === x && gs.y === y) as GridSquare
      gridSquare.nN = gridSquares.find(gs => gs.x === x && gs.y === y - 1) || null
      gridSquare.eN = gridSquares.find(gs => gs.x === x + 1 && gs.y === y) || null
      gridSquare.sN = gridSquares.find(gs => gs.x === x && gs.y === y + 1) || null
      gridSquare.wN = gridSquares.find(gs => gs.x === x - 1 && gs.y === y) || null
    }
  }
  return gridSquares
}

export const solutionOne = () => {
  const gridSquares = constructGridSquaresArray(data)
  let riskLevel = gridSquares.reduce(
    (riskLevel, gridSquare) =>
      riskLevel +
      ((!gridSquare.nN || gridSquare.nN.elevation > gridSquare.elevation) &&
      (!gridSquare.eN || gridSquare.eN.elevation > gridSquare.elevation) &&
      (!gridSquare.sN || gridSquare.sN.elevation > gridSquare.elevation) &&
      (!gridSquare.wN || gridSquare.wN.elevation > gridSquare.elevation)
        ? gridSquare.elevation + 1
        : 0),
    0,
  )
  return riskLevel
}

export const solutionTwo = () => {
  const gridSquares = constructGridSquaresArray(data)
  gridSquares.forEach(gridSquare => {
    if (gridSquare.elevation !== 9 && gridSquare.basinId === null) {
      gridSquare.basinId = gridSquare.id
      propagateBasinId(gridSquare)
    }
  })
  const basinInfo = gridSquares.reduce((basins, gridSquare) => {
    if (gridSquare.basinId !== null) {
      basins[gridSquare.basinId] = (basins[gridSquare.basinId] || 0) + 1
    }
    return basins
  }, {} as { [key: number]: number })

  return (Object.values(basinInfo) as number[])
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((product, num) => product * num)
}
