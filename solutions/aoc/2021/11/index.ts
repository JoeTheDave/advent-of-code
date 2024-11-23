// Advent of Code | 2021 | Day 11 | Dumbo Octopus
// https://adventofcode.com/2021/day/11
// https://adventofcode.com/2021/day/11/input

import { flatten } from 'lodash'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2021 | Day 11 | Dumbo Octopus'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

class Cell {
  energy: number
  neighbors: Cell[]
  flashed: boolean

  constructor(energyLevel: number) {
    this.energy = energyLevel
    this.neighbors = []
    this.flashed = false
  }

  flash() {
    this.neighbors.forEach(cell => {
      cell.energy++
    })
    this.flashed = true
  }
}

class Grid {
  cells: Cell[][]
  flatCells: Cell[]
  flashCount: number

  constructor(data: string[]) {
    this.cells = data.reduce((gridRows, dataRow) => {
      gridRows.push(dataRow.split('').map(c => new Cell(parseInt(c))))
      return gridRows
    }, [] as Cell[][])
    for (let y = 0; y < this.cells.length; y++) {
      for (let x = 0; x < this.cells[y].length; x++) {
        const top = y === 0
        const bottom = y === this.cells.length - 1
        const left = x === 0
        const right = x === this.cells[y].length - 1
        const neighbors = []
        if (!top && !left) {
          neighbors.push(this.cells[y - 1][x - 1])
        }
        if (!top) {
          neighbors.push(this.cells[y - 1][x])
        }
        if (!top && !right) {
          neighbors.push(this.cells[y - 1][x + 1])
        }
        if (!left) {
          neighbors.push(this.cells[y][x - 1])
        }
        if (!right) {
          neighbors.push(this.cells[y][x + 1])
        }
        if (!bottom && !left) {
          neighbors.push(this.cells[y + 1][x - 1])
        }
        if (!bottom) {
          neighbors.push(this.cells[y + 1][x])
        }
        if (!bottom && !right) {
          neighbors.push(this.cells[y + 1][x + 1])
        }
        this.cells[y][x].neighbors = neighbors
      }
    }
    this.flatCells = flatten(this.cells)
    this.flashCount = 0
  }

  executeStep() {
    this.flatCells.forEach(cell => {
      cell.energy++
    })
    let pendingFlashCells = []
    do {
      pendingFlashCells = this.flatCells.filter(cell => cell.energy > 9 && !cell.flashed)
      if (pendingFlashCells.length) {
        pendingFlashCells[0].flash()
        this.flashCount++
      }
    } while (pendingFlashCells.length)
    this.resetFlashedCells()
  }

  resetFlashedCells() {
    this.flatCells
      .filter(cell => cell.flashed)
      .forEach(cell => {
        cell.energy = 0
        cell.flashed = false
      })
  }

  isSimultaneousFlash() {
    return this.flatCells.every(cell => cell.energy === 0)
  }
}

export const solutionOne = () => {
  const grid = new Grid(data)
  for (let x = 0; x < 100; x++) {
    grid.executeStep()
  }
  return grid.flashCount
}

export const solutionTwo = () => {
  const grid = new Grid(data)
  let step = 0
  for (step = 1; true; step++) {
    grid.executeStep()
    if (grid.isSimultaneousFlash()) {
      break
    }
  }
  return step
}
