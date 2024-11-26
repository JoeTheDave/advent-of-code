// Advent of Code | 2022 | Day 22 | Monkey Map
// https://adventofcode.com/2022/day/22
// https://adventofcode.com/2022/day/22/input

import { orderBy, flatten } from 'lodash'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2022 | Day 22 | Monkey Map'
export const complete = [true, false]

const useTestData = false

const data = useTestData ? testData : puzzleData

export const prepareData = (data: string[]) => {
  const dataClone = [...data]
  const dataRows = dataClone.splice(0, dataClone.indexOf(''))
  const maxLength = Math.max(...dataRows.map(i => i.length))
  dataRows.forEach((row, i) => {
    dataRows[i] = row.padEnd(maxLength, ' ')
  })
  const instructionData = dataClone[1]
  const instructions: (number | string)[] = []
  let numAccumulator = ''
  for (let i = 0; i <= instructionData.length; i++) {
    let char = instructionData[i]
    if (char === 'L' || char === 'R') {
      if (numAccumulator.length) {
        instructions.push(parseInt(numAccumulator))
        numAccumulator = ''
      }
      instructions.push(char)
    } else {
      numAccumulator += char
    }
  }
  if (numAccumulator.length) {
    instructions.push(parseInt(numAccumulator))
  }
  return { dataRows, instructions }
}

export class GridSquare {
  type: string
  x: number
  y: number
  nN: GridSquare | null
  eN: GridSquare | null
  sN: GridSquare | null
  wN: GridSquare | null

  constructor({ type, x, y }: { type: string; x: number; y: number }) {
    this.type = type
    this.x = x
    this.y = y
    this.nN = null
    this.eN = null
    this.sN = null
    this.wN = null
  }
}

export class Grid {
  gridSquares: GridSquare[][]
  flatSquares: GridSquare[]
  currentLocation: GridSquare
  currentDir: number

  constructor(data: string[]) {
    this.gridSquares = data.map((row, y) => row.split('').map((type, x) => new GridSquare({ type, x, y })))
    this.flatSquares = flatten(this.gridSquares)
    this.establishEastWestRelationships()
    this.establishNorthSouthRelationships()
    this.flatSquares = this.flatSquares.filter(s => s.type !== ' ')
    this.currentLocation = this.flatSquares[0]
    this.currentDir = 0
    this.setStartLocation()
  }

  establishEastWestRelationships() {
    for (let row = 0; row < this.gridSquares.length; row++) {
      const significantSquares = orderBy(
        this.flatSquares.filter(s => s.y === row && s.type !== ' '),
        s => s.x,
      )

      for (let i = 0; i < significantSquares.length; i++) {
        if (i === 0) {
          significantSquares[i].eN = significantSquares[i + 1]
          significantSquares[i].wN = significantSquares[significantSquares.length - 1]
        } else if (i === significantSquares.length - 1) {
          significantSquares[i].eN = significantSquares[0]
          significantSquares[i].wN = significantSquares[i - 1]
        } else {
          significantSquares[i].eN = significantSquares[i + 1]
          significantSquares[i].wN = significantSquares[i - 1]
        }
      }
    }
  }

  establishNorthSouthRelationships() {
    for (let col = 0; col < this.gridSquares[0].length; col++) {
      const significantSquares = orderBy(
        this.flatSquares.filter(s => s.x === col && s.type !== ' '),
        s => s.y,
      )
      for (let i = 0; i < significantSquares.length; i++) {
        if (i === 0) {
          significantSquares[i].sN = significantSquares[i + 1]
          significantSquares[i].nN = significantSquares[significantSquares.length - 1]
        } else if (i === significantSquares.length - 1) {
          significantSquares[i].sN = significantSquares[0]
          significantSquares[i].nN = significantSquares[i - 1]
        } else {
          significantSquares[i].sN = significantSquares[i + 1]
          significantSquares[i].nN = significantSquares[i - 1]
        }
      }
    }
  }

  setStartLocation() {
    for (let i = 0; i < this.gridSquares[0].length; i++) {
      if (this.gridSquares[0][i].type === '.') {
        this.currentLocation = this.gridSquares[0][i]
        break
      }
    }
  }

  executeInstruction(instruction: string | number) {
    if (typeof instruction === 'string') {
      let modifier = instruction === 'R' ? 1 : -1
      this.currentDir += modifier
      if (this.currentDir === 4) {
        this.currentDir = 0
      }
      if (this.currentDir === -1) {
        this.currentDir = 3
      }
    } else {
      for (let i = 1; i <= instruction; i++) {
        if (this.currentDir === 0) {
          // right
          if (this.currentLocation.eN?.type === '.') {
            this.currentLocation = this.currentLocation.eN
          }
        } else if (this.currentDir === 1) {
          // down
          if (this.currentLocation.sN?.type === '.') {
            this.currentLocation = this.currentLocation.sN
          }
        } else if (this.currentDir === 2) {
          // left
          if (this.currentLocation.wN?.type === '.') {
            this.currentLocation = this.currentLocation.wN
          }
        } else if (this.currentDir === 3) {
          // up
          if (this.currentLocation.nN?.type === '.') {
            this.currentLocation = this.currentLocation.nN
          }
        }
      }
    }
  }
}

export const solutionOne = () => {
  const { dataRows, instructions } = prepareData(data)
  const grid = new Grid(dataRows)
  instructions.forEach(instruction => {
    grid.executeInstruction(instruction)
  })
  const { x, y } = grid.currentLocation
  return (y + 1) * 1000 + (x + 1) * 4 + grid.currentDir
}

export const solutionTwo = () => {
  return null
}
