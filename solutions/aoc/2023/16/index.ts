// Advent of Code | 2023 | Day 16 | The Floor Will Be Lava
// https://adventofcode.com/2023/day/16
// https://adventofcode.com/2023/day/16/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2023 | Day 16 | The Floor Will Be Lava'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

type Trajectory = 'up' | 'right' | 'down' | 'left'

const slashMirrorLookup: { [key: string]: Trajectory } = {
  right: 'up',
  up: 'right',
  down: 'left',
  left: 'down',
}

const backslashMirrorLookup: { [key: string]: Trajectory } = {
  right: 'down',
  up: 'left',
  down: 'right',
  left: 'up',
}

interface Mover {
  x: number
  y: number
  traj: Trajectory
}

class GridSquare {
  squareType: string
  x: number
  y: number
  energized: boolean
  visitors: Trajectory[]

  constructor(squareType: string, x: number, y: number) {
    this.squareType = squareType
    this.x = x
    this.y = y
    this.energized = false
    this.visitors = []
  }
}

class Grid {
  squares: GridSquare[]
  movers: Mover[]
  gridWidth: number
  gridHeight: number

  constructor(gridData: string[], startMover: Mover) {
    this.squares = []
    for (let y = 0; y < gridData.length; y++) {
      for (let x = 0; x < gridData[y].length; x++) {
        this.squares.push(new GridSquare(gridData[y][x], x, y))
      }
    }
    this.gridHeight = gridData.length
    this.gridWidth = gridData[0].length
    this.movers = [startMover]
    const startSquare = this.squares.find(
      square => square.x === startMover.x && square.y === startMover.y,
    ) as GridSquare
    startSquare.energized = true
    this.changeMovers()
  }

  moveMovers = () => {
    this.movers.forEach(mover => {
      switch (mover.traj) {
        case 'up':
          mover.y--
          break
        case 'right':
          mover.x++
          break
        case 'down':
          mover.y++
          break
        case 'left':
          mover.x--
          break
      }
      this.movers = this.movers.filter(m => m.x >= 0 && m.x < this.gridWidth && m.y >= 0 && m.y < this.gridHeight)
    })
  }

  changeMovers = () => {
    const destroyMovers: Mover[] = []
    const newMovers: Mover[] = []
    this.movers.forEach(m => {
      const square = this.squares.find(square => square.x === m.x && square.y === m.y) as GridSquare
      square.energized = true
      if (square.visitors.includes(m.traj)) {
        destroyMovers.push(m)
      } else {
        square.visitors.push(m.traj)
        switch (square.squareType) {
          case '/':
            m.traj = slashMirrorLookup[m.traj]
            break
          case '?': // '\'
            m.traj = backslashMirrorLookup[m.traj]
            break
          case '|':
            if (m.traj === 'left' || m.traj === 'right') {
              destroyMovers.push(m)
              newMovers.push({ x: m.x, y: m.y, traj: 'up' })
              newMovers.push({ x: m.x, y: m.y, traj: 'down' })
            }
            break
          case '-':
            if (m.traj === 'up' || m.traj === 'down') {
              destroyMovers.push(m)
              newMovers.push({ x: m.x, y: m.y, traj: 'left' })
              newMovers.push({ x: m.x, y: m.y, traj: 'right' })
            }
            break
        }
      }
    })
    this.movers = this.movers.filter(m => !destroyMovers.includes(m))
    this.movers.push(...newMovers)
  }

  step = () => {
    this.moveMovers()
    this.changeMovers()
  }
}

export const solutionOne = () => {
  const grid = new Grid(data, { x: 0, y: 0, traj: 'right' })
  do {
    grid.step()
  } while (grid.movers.length)
  return grid.squares.filter(s => s.energized).length
}

export const solutionTwo = () => {
  const gridData = data
  const movers: Mover[] = []
  for (let x = 0; x < gridData[0].length; x++) {
    movers.push({ x, y: 0, traj: 'down' })
    movers.push({ x, y: gridData.length - 1, traj: 'up' })
  }
  for (let y = 0; y < gridData.length; y++) {
    movers.push({ x: 0, y, traj: 'right' })
    movers.push({ x: gridData[y].length - 1, y, traj: 'left' })
  }

  const scores: number[] = []
  movers.forEach(mover => {
    const grid = new Grid(gridData, mover)
    do {
      grid.step()
    } while (grid.movers.length)
    scores.push(grid.squares.filter(s => s.energized).length)
  })
  return Math.max(...scores)
}
