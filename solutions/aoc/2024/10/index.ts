// Advent of Code | 2024 | Day 10 | Hoof It
// https://adventofcode.com/2024/day/10
// https://adventofcode.com/2024/day/10/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2024 | Day 10 | Hoof It'
export const complete = [false, false]

const useTestData = true

const rawData = useTestData ? testData : puzzleData

class Map {
  nodes: Node[]

  constructor(data: string[]) {
    this.nodes = []
    for (let y = 0; y < data.length; y++) {
      for (let x = 0; x < data[y].length; x++) {
        const nodeId = y * data[y].length + x
        this.nodes.push(new Node(x, y, nodeId, parseInt(data[y][x])))
      }
    }
    this.nodes.forEach(node => {
      if (node.y > 0) {
        node.n = this.nodes.find(n => n.y === node.y - 1 && n.x === node.x) as Node
      }
      if (node.y < data.length - 1) {
        node.s = this.nodes.find(n => n.y === node.y + 1 && n.x === node.x) as Node
      }
      if (node.x > 0) {
        node.w = this.nodes.find(n => n.y === node.y && n.x === node.x - 1) as Node
      }
      if (node.x < data[0].length - 1) {
        node.e = this.nodes.find(n => n.y === node.y && n.x === node.x + 1) as Node
      }
    })
  }
}

class Node {
  id: number
  x: number
  y: number
  value: number
  n: Node | null
  s: Node | null
  e: Node | null
  w: Node | null

  constructor(x: number, y: number, id: number, value: number) {
    this.x = x
    this.y = y
    this.id = id
    this.value = value
    this.n = null
    this.s = null
    this.e = null
    this.w = null
  }

  traverse = (): number => {
    if (this.value === 9) {
      return 1
    } else {
      return [this.n, this.e, this.s, this.w]
        .filter(n => n && n.value === this.value + 1)
        .map(n => n?.traverse() || 0)
        .reduce((sum, num) => sum + num, 0)
    }
  }
}

export const solutionOne = () => {
  const map = new Map(rawData)
  const heads = map.nodes.filter(node => node.value === 0).map(n => n.traverse())
  return heads
}

export const solutionTwo = () => {
  return null
}
