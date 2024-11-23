// Advent of Code | 2021 | Day 12 | Passage Pathing
// https://adventofcode.com/2021/day/12
// https://adventofcode.com/2021/day/12/input

import { flatten } from 'lodash'
import { testData1 as testData, puzzleData } from './data'

export const displayName = 'AOC | 2021 | Day 12 | Passage Pathing'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

class Node {
  id: string
  connections: Node[]
  primary: boolean

  constructor(id: string) {
    this.id = id
    this.connections = []
    this.primary = id === id.toUpperCase()
  }
}

class Network {
  nodes: Node[]

  constructor(data: string[]) {
    this.nodes = []
    data.forEach(connection => {
      const nodeIds = connection.split('-')
      if (!this.nodes.some(n => n.id === nodeIds[0])) {
        this.nodes.push(new Node(nodeIds[0]))
      }
      if (!this.nodes.some(n => n.id === nodeIds[1])) {
        this.nodes.push(new Node(nodeIds[1]))
      }
      const node1 = this.nodes.find(n => n.id === nodeIds[0]) as Node
      const node2 = this.nodes.find(n => n.id === nodeIds[1]) as Node
      node1.connections.push(node2)
      node2.connections.push(node1)
    })
  }
}

const traverseNetwork = (path: string, network: Network) => {
  const currentNode = network.nodes.find(n => n.id === path.split('|').slice(-1)[0]) as Node

  const pathOptions = currentNode.connections
    .filter(n => n.primary || !path.includes(n.id))
    .map(n => [...path.split('|'), n.id])

  const paths = flatten(
    pathOptions.map(p => (p.slice(-1)[0] === 'end' ? p.join('|') : traverseNetwork(p.join('|'), network))),
  ) as string[]
  return paths
}

const traverseNetworkCasual = (path: string, network: Network) => {
  const currentNode = network.nodes.find(n => n.id === path.split('|').slice(-1)[0]) as Node

  let allowDuplicateSeconary = true
  const usedSecondaries: string[] = []
  path
    .split('|')
    .filter(id => id !== id.toUpperCase())
    .forEach(id => {
      if (usedSecondaries.includes(id)) {
        allowDuplicateSeconary = false
      } else {
        usedSecondaries.push(id)
      }
    })

  const pathOptions = currentNode.connections
    .filter(n => (n.primary || !path.includes(n.id) || allowDuplicateSeconary) && n.id !== 'start')
    .map(n => [...path.split('|'), n.id])

  const paths = flatten(
    pathOptions.map(p => (p.slice(-1)[0] === 'end' ? p.join('|') : traverseNetworkCasual(p.join('|'), network))),
  ) as string[]
  return paths
}

export const solutionOne = () => {
  const network = new Network(data)
  const path = 'start'
  const pathOptions = traverseNetwork(path, network)
  return pathOptions.length
}

export const solutionTwo = () => {
  const network = new Network(data)
  const path = 'start'
  const pathOptions = traverseNetworkCasual(path, network)
  return pathOptions.length
}
