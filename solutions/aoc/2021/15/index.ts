// Advent of Code | 2021 | Day 15 | Chiton
// https://adventofcode.com/2021/day/15
// https://adventofcode.com/2021/day/15/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2021 | Day 15 | Chiton'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

const createMapData = (data: string[]) => {
  const expandedData: string[] = new Array(data.length * 5).fill('')
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      for (let r = 0; r < data.length; r++) {
        const row = data[r].split('').map(i => parseInt(i))
        for (let i = 0; i < row.length; i++) {
          expandedData[y * data.length + r] += row[i] + y + x > 9 ? row[i] + y + x - 9 : row[i] + y + x
        }
      }
    }
  }
  return expandedData
}

class Cell {
  x: number
  y: number
  value: number
  distance: number | null
  nN: Cell | null
  eN: Cell | null
  sN: Cell | null
  wN: Cell | null

  constructor({ val, x, y }: { val: string; x: number; y: number }) {
    this.x = x
    this.y = y
    this.value = parseInt(val)
    this.distance = null
    this.nN = null
    this.eN = null
    this.sN = null
    this.wN = null
  }
}

class Grid {
  cells: Cell[]

  constructor(data: string[]) {
    this.cells = []
    let xMax = 0
    let yMax = 0
    for (let y = 0; y < data.length; y++) {
      yMax = y
      const row = data[y].split('')
      for (let x = 0; x < row.length; x++) {
        this.cells.push(new Cell({ x, y, val: row[x] }))
        xMax = x
      }
    }
    this.cells.forEach((cell, i) => {
      cell.nN = this.cells.find(c => c.x === cell.x && c.y === cell.y - 1) || null
      cell.eN = this.cells.find(c => c.x === cell.x + 1 && c.y === cell.y) || null
      cell.sN = this.cells.find(c => c.x === cell.x && c.y === cell.y + 1) || null
      cell.wN = this.cells.find(c => c.x === cell.x - 1 && c.y === cell.y) || null
    })
    const endCell = this.cells.find(c => c.x === xMax && c.y === yMax) as Cell
    endCell.distance = endCell.value

    let changes = 1
    while (changes > 0) {
      changes = 0
      this.cells.forEach(cell => {
        const distanceOptions = []
        if (cell.nN && cell.nN.distance) {
          distanceOptions.push(cell.value + cell.nN.distance)
        }
        if (cell.eN && cell.eN.distance) {
          distanceOptions.push(cell.value + cell.eN.distance)
        }
        if (cell.sN && cell.sN.distance) {
          distanceOptions.push(cell.value + cell.sN.distance)
        }
        if (cell.wN && cell.wN.distance) {
          distanceOptions.push(cell.value + cell.wN.distance)
        }
        if (cell.distance) {
          distanceOptions.push(cell.distance)
        }

        if (distanceOptions.length > 0) {
          const lowestOption = Math.min(...distanceOptions)
          if (lowestOption !== cell.distance) {
            cell.distance = lowestOption
            changes++
          }
        }
      })
    }
  }
}

export const solutionOne = () => {
  const grid = new Grid(data)
  const startCell = grid.cells.find(c => c.x === 0 && c.y === 0) as Cell
  return (startCell.distance || 0) - startCell.value
}

// WARNING: Soltuion 2 takes upwards of 3 minutes
export const solutionTwo = () => {
  const expandedData = createMapData(data)
  const grid = new Grid(expandedData)
  const startCell = grid.cells.find(c => c.x === 0 && c.y === 0) as Cell
  return (startCell.distance || 0) - startCell.value
}
