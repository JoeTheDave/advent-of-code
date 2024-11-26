// Advent of Code | 2023 | Day 8 | Haunted Wasteland
// https://adventofcode.com/2023/day/8
// https://adventofcode.com/2023/day/8/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2023 | Day 8 | Haunted Wasteland'
export const complete = [true, false]

const useTestData = false

const data = useTestData ? testData : puzzleData

interface NetworkNode {
  id: string
  left: NetworkNode
  right: NetworkNode
}

const prepareDataStructures = () => {
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
    const [node, leftPath, rightPath] = line.match(/[A-Z]+/g)!.map(id => network.find(n => n.id === id))
    if (node) {
      node.left = leftPath as NetworkNode
      node.right = rightPath as NetworkNode
    }
  })
  return { instructionLoop, network }
}

export const solutionOne = () => {
  const { instructionLoop, network } = prepareDataStructures()
  let node = network.find(n => n.id === 'AAA') as NetworkNode
  let steps = 0
  do {
    node = instructionLoop[steps % instructionLoop.length] === 'L' ? node.left : node.right
    steps++
  } while (node.id !== 'ZZZ')
  return steps
}

export const solutionTwo = () => {
  // Note: This solution runs for an unknown amount of time to an unknoown answer
  // const { instructionLoop, network } = prepareDataStructures()
  // let nodes = network.filter(n => n.id[2] === 'A')
  // let steps = 0
  // do {
  //   // console.log(nodes)
  //   nodes = nodes.map(node => (instructionLoop[steps % instructionLoop.length] === 'L' ? node.left : node.right))
  //   // console.log(nodes)
  //   steps++
  //   const zCount = nodes.filter(n => n.id[2] === 'Z').length
  //   if (zCount > 3) {
  //     console.log(zCount, steps)
  //   }
  // } while (nodes.filter(n => n.id[2] === 'Z').length !== nodes.length)
  // return steps
}
