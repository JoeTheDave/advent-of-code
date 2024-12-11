// Advent of Code | 2024 | Day 10 | Hoof It
// https://adventofcode.com/2024/day/10
// https://adventofcode.com/2024/day/10/input

import { flatten, uniq } from 'lodash'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2024 | Day 10 | Hoof It'
export const complete = [true, true]

const useTestData = false

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

  determineRoutes = () => {
    this.nodes.filter(n => n.value === 9).forEach(n => (n.routes = 1))
    for (let i = 8; i >= 0; i--) {
      this.nodes
        .filter(n => n.value === i)
        .forEach(n => {
          n.routes = [n.n, n.e, n.s, n.w]
            .filter(nn => nn?.value === n.value + 1)
            .reduce((sum, nn) => sum + (nn?.routes || 0), 0)
        })
    }
  }

  scoreTrailHeads = () => {
    this.nodes.filter(n => n.value === 9).forEach(n => n.canReachSummits.push(n.id))
    for (let i = 8; i >= 0; i--) {
      this.nodes
        .filter(n => n.value === i)
        .forEach(n => {
          n.canReachSummits = uniq(
            flatten([n.n, n.e, n.s, n.w].filter(nn => nn && nn.value === i + 1).map(nn => nn?.canReachSummits || [])),
          )
        })
    }
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
  canReachSummits: number[]
  routes: number

  constructor(x: number, y: number, id: number, value: number) {
    this.x = x
    this.y = y
    this.id = id
    this.value = value
    this.n = null
    this.s = null
    this.e = null
    this.w = null
    this.canReachSummits = []
    this.routes = 0
  }
}

export const solutionOne = () => {
  const map = new Map(rawData)
  map.scoreTrailHeads()
  return map.nodes
    .filter(n => n.value === 0)
    .map(n => n.canReachSummits.length)
    .reduce((sum, num) => sum + num, 0)
}

export const solutionTwo = () => {
  const map = new Map(rawData)
  map.determineRoutes()
  return map.nodes
    .filter(n => n.value === 0)
    .map(n => n.routes)
    .reduce((sum, num) => sum + num, 0)
}

export const visualize = () => {
  const root = document.getElementById('root') as HTMLElement
  const canvas = document.createElement('canvas')
  canvas.width = 1000
  canvas.height = 1000
  root.appendChild(canvas)
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  const rectSize = 100

  const map = new Map(rawData)
  map.scoreTrailHeads()
  map.nodes.forEach(node => {
    if (node.value === 9) {
      ctx.fillStyle = 'pink'
      ctx.fillRect(node.x * rectSize + 10, node.y * rectSize + 10, rectSize, rectSize)
    }
    if (node.value === 0) {
      ctx.fillStyle = 'lime'
      ctx.fillRect(node.x * rectSize + 10, node.y * rectSize + 10, rectSize, rectSize)
    }
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 1
    ctx.strokeRect(node.x * rectSize + 10, node.y * rectSize + 10, rectSize, rectSize)
    ctx.font = '20px Arial'
    ctx.fillStyle = 'black'
    ctx.fillText(`${node.value}`, node.x * rectSize + 20, node.y * rectSize + 30)
    ctx.font = '14px Arial'
    ctx.fillStyle = 'red'
    ctx.fillText(`${node.canReachSummits.length}`, node.x * rectSize + 20, node.y * rectSize + 50)
  })
}
