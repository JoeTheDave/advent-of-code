// Advent of Code | 2022 | Day 12 | Hill Climbing Algorithm
// https://adventofcode.com/2022/day/12
// https://adventofcode.com/2022/day/12/input

import { compact } from 'lodash'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2022 | Day 12 | Hill Climbing Algorithm'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

class GridCell {
  id: number
  x: number
  y: number
  alpha: string
  elevation: number
  nN: GridCell | null
  eN: GridCell | null
  sN: GridCell | null
  wN: GridCell | null
  isStart: boolean
  isGoal: boolean
  region: string | null
  step: number | null

  constructor({ id, x, y, alpha }: { id: number; x: number; y: number; alpha: string }) {
    this.id = id
    this.x = x
    this.y = y
    this.alpha = alpha.replace('S', 'a').replace('E', 'z')
    this.elevation = 'abcdefghijklmnopqrstuvwxyz'.indexOf(this.alpha)
    this.nN = null
    this.eN = null
    this.sN = null
    this.wN = null
    this.isStart = alpha === 'S'
    this.isGoal = alpha === 'E'
    this.region = null
    this.step = null
  }

  neighbors() {
    return compact([this.nN, this.eN, this.sN, this.wN])
  }

  propagateRegionToNeighbors() {
    if (this.region) {
      this.neighbors()
        .filter(n => n.elevation === this.elevation && !n.region)
        .forEach(n => {
          n.region = this.region
          n.propagateRegionToNeighbors()
        })
    }
  }
}

class Grid {
  xDimension: number
  yDimension: number
  cells: GridCell[]

  constructor(data: string[]) {
    this.xDimension = data[0].length
    this.yDimension = data.length
    this.cells = []

    // Build GridCells
    for (let y = 0; y < data.length; y++) {
      for (let x = 0; x < data[y].length; x++) {
        this.cells.push(
          new GridCell({
            id: y * this.xDimension + x,
            x,
            y,
            alpha: data[y][x],
          }),
        )
      }
    }

    // Establish Neighbor Relationships
    this.cells.forEach(gridCell => {
      gridCell.nN = this.cells.find(gc => gc.y === gridCell.y - 1 && gc.x === gridCell.x) || null
      gridCell.eN = this.cells.find(gc => gc.x === gridCell.x + 1 && gc.y === gridCell.y) || null
      gridCell.sN = this.cells.find(gc => gc.y === gridCell.y + 1 && gc.x === gridCell.x) || null
      gridCell.wN = this.cells.find(gc => gc.x === gridCell.x - 1 && gc.y === gridCell.y) || null
    })

    // Assign Regions
    let nextRegionId = 0
    this.cells.forEach(gridCell => {
      if (!gridCell.region) {
        gridCell.region = nextRegionId.toString(16)
        nextRegionId++
        gridCell.propagateRegionToNeighbors()
      }
    })

    const startStep = this.cells.find(c => c.isStart) as GridCell
    startStep.step = 0
  }

  getGoalStep() {
    return this.cells.find(c => c.isGoal)?.step
  }

  advanceTowardsSummit() {
    const highestStep = Math.max(...this.cells.map(c => c.step || 0))
    this.cells
      .filter(c => c.step === highestStep)
      .forEach(cell => {
        cell
          .neighbors()
          .filter(n => n.step === null && cell.elevation + 1 >= n.elevation)
          .forEach(neighbor => (neighbor.step = highestStep + 1))
      })
  }

  descendFromSummit() {
    const highestStep = Math.max(...this.cells.map(c => c.step || 0))
    this.cells
      .filter(c => c.step === highestStep)
      .forEach(cell => {
        cell
          .neighbors()
          .filter(n => n.step === null && cell.elevation - 1 <= n.elevation)
          .forEach(neighbor => (neighbor.step = highestStep + 1))
      })
  }

  clearGridSteps() {
    this.cells.forEach(c => {
      c.step = null
    })
  }
}

export const solutionOne = () => {
  const grid = new Grid(data)
  const goalSpace = grid.cells.find(c => c.isGoal) as GridCell
  while (goalSpace.step === null) {
    grid.advanceTowardsSummit()
  }
  return goalSpace.step
}

export const solutionTwo = () => {
  const grid = new Grid(data)
  grid.clearGridSteps()
  const goalSpace = grid.cells.find(c => c.isGoal) as GridCell
  goalSpace.step = 0
  let shortestPath = 0
  for (let i = 0; true; i++) {
    grid.descendFromSummit()
    const lowestPointCells = grid.cells.filter(c => c.elevation === 0 && c.step !== null)
    if (lowestPointCells.length > 0) {
      shortestPath = lowestPointCells[0].step as number
      break
    }
  }
  return shortestPath
}
