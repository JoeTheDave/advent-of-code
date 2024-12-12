// Advent of Code | 2024 | Day 11 | Plutonian Pebbles
// https://adventofcode.com/2024/day/11
// https://adventofcode.com/2024/day/11/input

import { testDataShort, puzzleData } from './data'

export const displayName = 'AOC | 2024 | Day 11 | Plutonian Pebbles'
export const complete = [true, true]

const useTestData = false

const rawData = useTestData ? testDataShort : puzzleData

type Stones = { [key: string]: number }

const blink = (stones: Stones) => {
  const newStones: Stones = {}
  Object.keys(stones).forEach(key => {
    if (key === '0') {
      newStones['1'] = (newStones['1'] || 0) + stones[key]
    } else if (key.length % 2 === 0) {
      const stone1 = `${parseInt(key.substring(0, key.length / 2))}`
      newStones[stone1] = (newStones[stone1] || 0) + stones[key]
      const stone2 = `${parseInt(key.substring(key.length / 2, key.length))}`
      newStones[stone2] = (newStones[stone2] || 0) + stones[key]
    } else {
      const stone = `${parseInt(key) * 2024}`
      newStones[stone] = (newStones[stone] || 0) + stones[key]
    }
  })
  return newStones
}

export const solutionOne = () => {
  let stones = rawData.split(' ').reduce((stones, stone) => {
    stones[stone] = 1
    return stones
  }, {} as Stones)
  for (let i = 1; i <= 25; i++) {
    stones = blink(stones)
  }
  return Object.keys(stones).reduce((sum, key) => sum + stones[key], 0)
}

export const solutionTwo = () => {
  let stones = rawData.split(' ').reduce((stones, stone) => {
    stones[stone] = 1
    return stones
  }, {} as Stones)
  for (let i = 1; i <= 75; i++) {
    stones = blink(stones)
  }
  return Object.keys(stones).reduce((sum, key) => sum + stones[key], 0)
}
