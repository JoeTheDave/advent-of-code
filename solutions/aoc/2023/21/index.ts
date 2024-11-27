// Advent of Code | 2023 | Day 21 | Step Counter
// https://adventofcode.com/2023/day/21
// https://adventofcode.com/2023/day/21/input

import { range, flatten } from 'lodash'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2023 | Day 21 | Step Counter'
export const complete = [true, false]

const useTestData = false

const data = useTestData ? testData : puzzleData

export const getBigData = () => {
  const size = 7
  const dataSet = data.map(d =>
    range(size)
      .map(() => d)
      .join('')
      .split('S')
      .join('.'),
  )
  return flatten(range(size).map(() => dataSet))
}

export interface GridSquare {
  x: number
  y: number
  up: GridSquare | null
  down: GridSquare | null
  left: GridSquare | null
  right: GridSquare | null
  stepable: boolean
  occupied: boolean
  transition: boolean[]
}

// export const bigStepsCount = 26501365
export const bigStepsCount = 327

export class GridMapper {
  grid: GridSquare[]
  lookup: { [key: string]: GridSquare }

  constructor(gridData: string[]) {
    this.grid = []
    this.lookup = {}
    for (let y = 0; y < gridData.length; y++) {
      for (let x = 0; x < gridData[y].length; x++) {
        const dataSquare = gridData[y][x]
        const gridSquare: GridSquare = {
          x,
          y,
          up: null,
          down: null,
          left: null,
          right: null,
          stepable: dataSquare === '.' || dataSquare === 'S',
          occupied: dataSquare === 'S',
          transition: [],
        }
        this.grid.push(gridSquare)
        this.lookup[`${x}|${y}`] = gridSquare
      }
    }
    this.grid.forEach(gridSquare => {
      gridSquare.up = this.lookup[`${gridSquare.x}|${gridSquare.y - 1}`] || null
      gridSquare.down = this.lookup[`${gridSquare.x}|${gridSquare.y + 1}`] || null
      gridSquare.left = this.lookup[`${gridSquare.x - 1}|${gridSquare.y}`] || null
      gridSquare.right = this.lookup[`${gridSquare.x + 1}|${gridSquare.y}`] || null
    })
  }

  step = () => {
    this.grid
      .filter(gridSquare => gridSquare.occupied)
      .forEach(gridSquare => {
        gridSquare.transition.push(false)
        if (gridSquare.up && gridSquare.up.stepable) {
          gridSquare.up.transition.push(true)
        }
        if (gridSquare.down && gridSquare.down.stepable) {
          gridSquare.down.transition.push(true)
        }
        if (gridSquare.left && gridSquare.left.stepable) {
          gridSquare.left.transition.push(true)
        }
        if (gridSquare.right && gridSquare.right.stepable) {
          gridSquare.right.transition.push(true)
        }
      })
    this.grid
      .filter(gridSquare => gridSquare.transition.length)
      .forEach(gridSquare => {
        gridSquare.occupied = gridSquare.transition.includes(true)
        gridSquare.transition = []
      })
  }

  getCount = () => this.grid.filter(_ => _.occupied).length
}

export const getGridCountProfile = (x: number, y: number) => {
  const processor = new GridMapper(data)
  processor.lookup['65|65'].occupied = false
  const newStart = processor.lookup[`${x}|${y}`]
  if (newStart) {
    newStart.occupied = true
  }
  const profile: { [key: number]: number } = {}
  let iteration = 1
  let loopCondition = true
  profile[iteration] = processor.getCount()
  do {
    iteration++
    processor.step()
    const count = processor.getCount()
    profile[iteration] = count
    const tl = processor.lookup[`0|0`].occupied
    const tr = processor.lookup[`130|0`].occupied
    const bl = processor.lookup[`0|130`].occupied
    const br = processor.lookup[`130|130`].occupied
    if (tl && tr && bl && br) {
      loopCondition = false
    }
  } while (loopCondition)
  return profile
}

export const solutionOne = () => {
  const processor = new GridMapper(data)
  for (let i = 1; i <= 64; i++) {
    processor.step()
  }
  return processor.grid.filter(s => s.occupied).length
}

export const solutionTwo = () => {
  // const topLeft = getGridCountProfile(0, 0)
  // const topCenter = getGridCountProfile(65, 0)
  // const topRight = getGridCountProfile(130, 0)
  // const middleLeft = getGridCountProfile(0, 65)
  // const middleCenter = getGridCountProfile(65, 65)
  // const middleRight = getGridCountProfile(130, 65)
  // const bottomLeft = getGridCountProfile(0, 130)
  // const bottomCenter = getGridCountProfile(65, 130)
  // const bottomRight = getGridCountProfile(130, 130)
  // const edgeToEdge = data.length
  // const centerToEdge = Math.floor(data.length / 2)
  // console.log('topLeft', Object.keys(topLeft).length)
  // console.log('topCenter', Object.keys(topCenter).length)
  // // console.log('topRight', Object.keys(topRight).length)
  // // console.log('middleLeft', Object.keys(middleLeft).length)
  // // console.log('middleCenter', Object.keys(middleCenter).length)
  // // console.log('middleRight', Object.keys(middleRight).length)
  // // console.log('bottomLeft', Object.keys(bottomLeft).length)
  // // console.log('bottomCenter', Object.keys(bottomCenter).length)
  // // console.log('bottomRight', Object.keys(bottomRight).length)
  // // console.log(topCenter)
  // console.log('centerToEdge', centerToEdge)
  // console.log('edgeToEdge', edgeToEdge)
  // const fullCoverageSquares = Math.floor((bigStepsCount - 65) / edgeToEdge) - 1
  // const reaminder = (bigStepsCount - 65) % edgeToEdge
  // console.log('fullCoverageSquares', fullCoverageSquares)
  // console.log('reaminder', reaminder)
  // console.log('xxxxx')
  // console.log(middleCenter)
  // return null
}
