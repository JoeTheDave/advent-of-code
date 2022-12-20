// https://adventofcode.com/2022/day/9
// https://adventofcode.com/2022/day/9/input

import { puzzleData, testData1, testData2 } from './data'

const ropeBridge = () => {
  const useTestData = false
  const data1 = useTestData ? testData1 : puzzleData
  const data2 = useTestData ? testData2 : puzzleData

  return [part1(data1), part2(data2)]
}

const part1 = (data: string[]) => {
  const head = [0, 0]
  const tail = [0, 0]
  const tailPath = new Set()
  data.forEach(instruction => {
    const [direction, magnitude] = instruction.split(' ')
    for (let step = 1; step <= parseInt(magnitude); step++) {
      head[idxMap[direction as Direction]] += dirMap[direction as Direction]
      moveFollower(head, tail)

      tailPath.add(tail.join('|'))
    }
  })
  return tailPath.size
}

const part2 = (data: string[]) => {
  const knots: number[][] = []
  for (let i = 1; i <= 10; i++) {
    knots.push([0, 0])
  }
  const tailPath = new Set()
  data.forEach(instruction => {
    const [direction, magnitude] = instruction.split(' ')
    for (let step = 1; step <= parseInt(magnitude); step++) {
      knots[0][idxMap[direction as Direction]] += dirMap[direction as Direction]
      for (let k = 1; k < knots.length; k++) {
        moveFollower(knots[k - 1], knots[k])
      }
      tailPath.add(knots[9].join('|'))
    }
  })
  return tailPath.size
}

export default ropeBridge

export const solutionData = {
  puzzleData,
  testData1,
  testData2,
}

export type Direction = 'R' | 'L' | 'U' | 'D'
export const dirMap = { R: 1, L: -1, U: 1, D: -1 }
export const idxMap = { R: 0, L: 0, U: 1, D: 1 }

const distanceBetween = (head: number[], tail: number[]) =>
  Math.sqrt((tail[0] - head[0]) ** 2 + (tail[1] - head[1]) ** 2)

const moveFollower = (head: number[], tail: number[]) => {
  const moveTailX =
    (Math.abs(head[0] - tail[0]) > (head[1] === tail[1] ? 1 : 0) ? 1 : 0) *
    (head[0] > tail[0] ? 1 : -1)
  const moveTailY =
    (Math.abs(head[1] - tail[1]) > (head[0] === tail[0] ? 1 : 0) ? 1 : 0) *
    (head[1] > tail[1] ? 1 : -1)
  if (distanceBetween(head, tail) >= 2) {
    tail[0] += moveTailX
    tail[1] += moveTailY
  }
}
