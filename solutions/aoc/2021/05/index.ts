// Advent of Code | 2021 | Day 5 | Hydrothermal Venture
// https://adventofcode.com/2021/day/5
// https://adventofcode.com/2021/day/5/input

import { flatten, range } from 'lodash'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2021 | Day 5 | Hydrothermal Venture'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

export const produceCoordinateSet = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => {
  let xs = range(x1, x2 + (x1 <= x2 ? 1 : -1))
  let ys = range(y1, y2 + (y1 <= y2 ? 1 : -1))
  const segmentLength = Math.max(xs.length, ys.length)
  if (xs.length !== segmentLength) {
    for (let i = 0; i < segmentLength - 1; i++) {
      xs.push(xs[0])
    }
  }
  if (ys.length !== segmentLength) {
    for (let i = 0; i < segmentLength - 1; i++) {
      ys.push(ys[0])
    }
  }
  return xs.map((x, idx) => `${x}|${ys[idx]}`)
}

export const findOverlappingCoords = (data: string[], includeDiags: boolean = false) => {
  let coords = data
    .map(d => flatten(d.split(' -> ').map(c => c.split(','))).map(n => parseInt(n)))
    .map(([x1, y1, x2, y2]) => ({ x1, y1, x2, y2 }))
  if (!includeDiags) {
    coords = coords.filter(coord => coord.x1 === coord.x2 || coord.y1 === coord.y2)
  }
  let coordsCount = flatten(coords.map(coord => produceCoordinateSet(coord))).reduce((counter, coord) => {
    if (counter[coord]) {
      counter[coord]++
    } else {
      counter[coord] = 1
    }
    return counter
  }, {} as { [key: string]: number })
  return Object.keys(coordsCount).filter(key => coordsCount[key] > 1).length
}

export const solutionOne = () => {
  return findOverlappingCoords(data)
}

export const solutionTwo = () => {
  return findOverlappingCoords(data, true)
}
