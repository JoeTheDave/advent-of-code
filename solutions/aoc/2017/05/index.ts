// Advent of Code | 2017 | Day 5 | A Maze of Twisty Trampolines, All Alike
// https://adventofcode.com/2017/day/5
// https://adventofcode.com/2017/day/5/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2017 | Day 5 | A Maze of Twisty Trampolines, All Alike'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

export const solutionOne = () => {
  let idx = 0
  let jumps = 0
  const maze = [...data]
  do {
    jumps++
    const jumpTo = idx + maze[idx]
    maze[idx]++
    idx = jumpTo
  } while (idx >= 0 && idx < maze.length)
  return jumps
}

export const solutionTwo = () => {
  let idx = 0
  let jumps = 0
  const maze = [...data]
  do {
    jumps++
    const jumpTo = idx + maze[idx]
    if (maze[idx] >= 3) {
      maze[idx]--
    } else {
      maze[idx]++
    }
    idx = jumpTo
  } while (idx >= 0 && idx < maze.length)
  return jumps
}
