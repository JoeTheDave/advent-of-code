// Advent of Code | 2023 | Day 8 | Haunted Wasteland
// https://adventofcode.com/2023/day/8
// https://adventofcode.com/2023/day/8/input

import { lcm } from '@/lib/mathUtils'
import { testData1, testData2, puzzleData } from './data'

export const displayName = 'AOC | 2023 | Day 8 | Haunted Wasteland'
export const complete = [true, true]

const useTestData = false

interface NetworkNode {
  id: string
  left: NetworkNode
  right: NetworkNode
}

const prepareDataStructures = (data: string[]) => {
  const instructionLoop = data[0]
  const networkLines = data.slice(2, data.length)
  const network: NetworkNode[] = []
  networkLines.forEach(line => {
    network.push({
      id: line.slice(0, 3),
      left: null as unknown as NetworkNode,
      right: null as unknown as NetworkNode,
    })
  })
  networkLines.forEach(line => {
    const [node, leftPath, rightPath] = line.match(/[A-Z0-9]+/g)!.map(id => network.find(n => n.id === id))
    if (node) {
      node.left = leftPath as NetworkNode
      node.right = rightPath as NetworkNode
    }
  })
  return { instructionLoop, network }
}

export const solutionOne = () => {
  const data = useTestData ? testData1 : puzzleData
  const { instructionLoop, network } = prepareDataStructures(data)
  let node = network.find(n => n.id === 'AAA') as NetworkNode
  let steps = 0
  do {
    node = instructionLoop[steps % instructionLoop.length] === 'L' ? node.left : node.right
    steps++
  } while (node.id !== 'ZZZ')
  return steps
}

export const solutionTwo = () => {
  const data = useTestData ? testData2 : puzzleData
  const { instructionLoop, network } = prepareDataStructures(data)
  return network
    .filter(n => n.id[2] === 'A')
    .map(node => {
      let steps = 0
      do {
        node = instructionLoop[steps % instructionLoop.length] === 'L' ? node.left : node.right
        steps++
      } while (node.id[2] !== 'Z')
      return steps
    })
    .reduce((multiple, val) => lcm(multiple, val), 1)
}
