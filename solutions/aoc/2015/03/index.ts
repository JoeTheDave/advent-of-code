// Advent of Code | 2015 | Day 3 | Perfectly Spherical Houses in a Vacuum
// https://adventofcode.com/2015/day/3
// https://adventofcode.com/2015/day/3/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2015 | Day 3 | Perfectly Spherical Houses in a Vacuum'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

export const solutionOne = () => {
  const positionPresents = {} as { [key: string]: number }
  const position = [0, 0]
  const deliverPresent = (pos: number[]) => {
    const key = `${pos[0]}|${pos[1]}`
    positionPresents[key] = (positionPresents[key] || 0) + 1
  }
  deliverPresent(position)

  data[0].split('').forEach(direction => {
    if (direction === '^') {
      position[0]++
    } else if (direction === 'v') {
      position[0]--
    } else if (direction === '<') {
      position[1]--
    } else if (direction === '>') {
      position[1]++
    }
    deliverPresent(position)
  })
  return Object.keys(positionPresents).length
}

export const solutionTwo = () => {
  const positionPresents = {} as { [key: string]: number }
  const santaPosition = [0, 0]
  const roboSantaPosition = [0, 0]

  const deliverPresent = (pos: number[]) => {
    const key = `${pos[0]}|${pos[1]}`
    positionPresents[key] = (positionPresents[key] || 0) + 1
  }
  deliverPresent(santaPosition)
  deliverPresent(roboSantaPosition)

  data[0].split('').forEach((direction, i) => {
    const position = i % 2 === 0 ? santaPosition : roboSantaPosition
    if (direction === '^') {
      position[0]++
    } else if (direction === 'v') {
      position[0]--
    } else if (direction === '<') {
      position[1]--
    } else if (direction === '>') {
      position[1]++
    }
    deliverPresent(position)
  })
  return Object.keys(positionPresents).length
}
