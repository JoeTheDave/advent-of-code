// Advent of Code | 2022 | Day 14 | Regolith Reservoir
// https://adventofcode.com/2022/day/14
// https://adventofcode.com/2022/day/14/input

import { flatten } from 'lodash'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2022 | Day 14 | Regolith Reservoir'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

export const solutionOne = () => {
  const xVals = flatten(data.map(l => l.split(' -> '))).map(i => parseInt(i.split(',')[0]))
  const yVals = flatten(data.map(l => l.split(' -> '))).map(i => parseInt(i.split(',')[1]))
  const minX = Math.min(...xVals) - 1
  const maxX = Math.max(...xVals) + 1
  const maxY = Math.max(...yVals) + 1
  const width = maxX - minX + 1

  const map: number[][] = []
  for (let y = 0; y <= maxY; y++) {
    const row = []
    for (let x = 0; x < width; x++) {
      row.push(0)
    }
    map.push(row)
  }
  data.forEach(line => {
    const points = line.split(' -> ')
    for (let i = 0; i < points.length - 1; i++) {
      const [p1x, p1y] = points[i].split(',').map(c => parseInt(c))
      const [p2x, p2y] = points[i + 1].split(',').map(c => parseInt(c))
      if (p1x === p2x) {
        for (let y = p1y; p1y < p2y ? y <= p2y : y >= p2y; p1y < p2y ? y++ : y--) {
          map[y][p1x - minX] = -1
        }
      }
      if (p1y === p2y) {
        for (let x = p1x; p1x < p2x ? x <= p2x : x >= p2x; p1x < p2x ? x++ : x--) {
          map[p1y][x - minX] = -1
        }
      }
    }
  })

  // Drop Sand
  let s = 0
  let continueSand = true
  while (continueSand) {
    s++
    const currentPosition = { x: 500 - minX, y: 0 }
    let endLoop = false
    while (!endLoop) {
      if (currentPosition.y < maxY) {
        if (map[currentPosition.y + 1][currentPosition.x] === 0) {
          currentPosition.y++
        } else if (map[currentPosition.y + 1][currentPosition.x - 1] === 0) {
          currentPosition.y++
          currentPosition.x--
        } else if (map[currentPosition.y + 1][currentPosition.x + 1] === 0) {
          currentPosition.y++
          currentPosition.x++
        } else {
          map[currentPosition.y][currentPosition.x] = 1
          endLoop = true
        }
      } else {
        endLoop = true
        continueSand = false
      }
    }
  }

  return s - 1
}

export const solutionTwo = () => {
  const xVals = flatten(data.map(l => l.split(' -> '))).map(i => parseInt(i.split(',')[0]))
  const yVals = flatten(data.map(l => l.split(' -> '))).map(i => parseInt(i.split(',')[1]))
  const maxY = Math.max(...yVals) + 2
  const minX = Math.min(...xVals) - maxY
  const maxX = Math.max(...xVals) + maxY

  const width = maxX - minX + 1

  const map: number[][] = []
  for (let y = 0; y <= maxY; y++) {
    const row = []
    for (let x = 0; x < width; x++) {
      row.push(0)
    }
    map.push(row)
  }
  data.forEach(line => {
    const points = line.split(' -> ')
    for (let i = 0; i < points.length - 1; i++) {
      const [p1x, p1y] = points[i].split(',').map(c => parseInt(c))
      const [p2x, p2y] = points[i + 1].split(',').map(c => parseInt(c))
      if (p1x === p2x) {
        for (let y = p1y; p1y < p2y ? y <= p2y : y >= p2y; p1y < p2y ? y++ : y--) {
          map[y][p1x - minX] = -1
        }
      }
      if (p1y === p2y) {
        for (let x = p1x; p1x < p2x ? x <= p2x : x >= p2x; p1x < p2x ? x++ : x--) {
          map[p1y][x - minX] = -1
        }
      }
    }
  })
  map[map.length - 1] = map[map.length - 1].map(p => -1)

  // Drop Sand
  let s = 0
  let continueSand = true
  while (continueSand) {
    s++
    const currentPosition = { x: 500 - minX, y: 0 }
    let endLoop = false
    while (!endLoop) {
      if (map[currentPosition.y + 1][currentPosition.x] === 0) {
        currentPosition.y++
      } else if (map[currentPosition.y + 1][currentPosition.x - 1] === 0) {
        currentPosition.y++
        currentPosition.x--
      } else if (map[currentPosition.y + 1][currentPosition.x + 1] === 0) {
        currentPosition.y++
        currentPosition.x++
      } else {
        map[currentPosition.y][currentPosition.x] = 1
        endLoop = true
        if (currentPosition.x === 500 - minX && currentPosition.y === 0) {
          continueSand = false
        }
      }
    }
  }

  return s
}
