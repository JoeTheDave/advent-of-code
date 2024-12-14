// Advent of Code | 2024 | Day 12 | Garden Groups
// https://adventofcode.com/2024/day/12
// https://adventofcode.com/2024/day/12/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2024 | Day 12 | Garden Groups'
export const complete = [true, false]

const useTestData = false

const rawData = useTestData ? testData : puzzleData

class Map {
  nodes: Node[]
  nextGroupId: number

  constructor(data: string[]) {
    this.nodes = []
    this.nextGroupId = 1
    for (let y = 0; y < data.length; y++) {
      for (let x = 0; x < data[y].length; x++) {
        const id = data[y].length * y + x
        this.nodes.push(new Node(data[y][x], x, y, id))
      }
    }
    this.nodes.forEach(node => {
      if (node.y > 0) {
        node.n = this.nodes.find(n => n.y === node.y - 1 && n.x === node.x) as Node
      }
      if (node.y > 0 && node.x < data[0].length - 1) {
        node.ne = this.nodes.find(n => n.y === node.y - 1 && n.x === node.x + 1) as Node
      }
      if (node.x < data[0].length - 1) {
        node.e = this.nodes.find(n => n.y === node.y && n.x === node.x + 1) as Node
      }
      if (node.x < data[0].length - 1 && node.y < data.length - 1) {
        node.se = this.nodes.find(n => n.y === node.y + 1 && n.x === node.x + 1) as Node
      }
      if (node.y < data.length - 1) {
        node.s = this.nodes.find(n => n.y === node.y + 1 && n.x === node.x) as Node
      }
      if (node.y < data.length - 1 && node.x > 0) {
        node.sw = this.nodes.find(n => n.y === node.y + 1 && n.x === node.x - 1) as Node
      }
      if (node.x > 0) {
        node.w = this.nodes.find(n => n.y === node.y && n.x === node.x - 1) as Node
      }
      if (node.x > 0 && node.y > 0) {
        node.nw = this.nodes.find(n => n.y === node.y - 1 && n.x === node.x - 1) as Node
      }
    })
    while (this.nodes.some(node => !node.groupId)) {
      const groupStartNode = this.nodes.find(node => !node.groupId) as Node
      groupStartNode.groupId = this.nextGroupId
      this.nextGroupId++
      groupStartNode.propigateGroupId()
    }
  }

  getCost = () => {
    let sum = 0
    for (let i = this.nextGroupId - 1; i >= 1; i--) {
      const groupNodes = this.nodes.filter(n => n.groupId === i)
      const area = groupNodes.length
      const perimeter = groupNodes
        .map(n => {
          return [n.n, n.s, n.e, n.w].reduce((perim, neighbor) => perim + (neighbor?.value !== n.value ? 1 : 0), 0)
        })
        .reduce((sum, num) => sum + num, 0)
      sum += area * perimeter
    }
    return sum
  }

  getDiscountCost = () => {
    let sum = 0
    for (let i = this.nextGroupId - 1; i >= 1; i--) {
      const groupNodes = this.nodes.filter(n => n.groupId === i)
      const area = groupNodes.length

      const groupPerimeterNodes = groupNodes.filter(n =>
        [n.n, n.ne, n.e, n.se, n.s, n.sw, n.w, n.nw].some(nn => nn === null || nn.groupId !== n.groupId),
      )

      // const groupPerimeterCornerNodes = groupPerimeterNodes.filter((n => ))

      // sum += area * groupPerimeterCornerNodes
    }
    return sum
  }
}

class Node {
  value: string
  x: number
  y: number
  id: number
  groupId: number | null
  n: Node | null
  ne: Node | null
  e: Node | null
  se: Node | null
  s: Node | null
  sw: Node | null
  w: Node | null
  nw: Node | null

  constructor(value: string, x: number, y: number, id: number) {
    this.value = value
    this.x = x
    this.y = y
    this.id = id
    this.groupId = null
    this.n = null
    this.ne = null
    this.e = null
    this.se = null
    this.s = null
    this.sw = null
    this.w = null
    this.nw = null
  }

  propigateGroupId = () => {
    if (this.groupId !== null) {
      const neighbors = [this.n, this.s, this.e, this.w].filter(
        nn => !!nn && !nn.groupId && nn.value === this.value,
      ) as Node[]
      neighbors.forEach(node => {
        node.groupId = this.groupId
        node.propigateGroupId()
      })
    }
  }
}

export const solutionOne = () => {
  const map = new Map(rawData)
  return map.getCost()
}

export const solutionTwo = () => {
  const map = new Map(rawData)
  return map.getDiscountCost()
}

export const visualize = () => {
  const root = document.getElementById('root') as HTMLElement
  const canvas = document.createElement('canvas')
  canvas.width = 2000
  canvas.height = 2000
  root.appendChild(canvas)
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  const map = new Map(rawData)
  const groupId = 1
  const rectSize = 10
  const groupNodes = map.nodes.filter(n => n.groupId === groupId)
  const groupPerimeterNodes = groupNodes.filter(n =>
    [n.n, n.ne, n.e, n.se, n.s, n.sw, n.w, n.nw].some(nn => nn === null || nn.groupId !== n.groupId),
  )
  map.nodes.forEach(node => {
    if (groupPerimeterNodes.includes(node)) {
      ctx.fillStyle = 'lime'
      ctx.fillRect(node.x * rectSize + 10, node.y * rectSize + 10, rectSize, rectSize)
    }
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 1
    ctx.strokeRect(node.x * rectSize + 10, node.y * rectSize + 10, rectSize, rectSize)
    ctx.font = '8px Arial'
    ctx.fillStyle = 'black'
    ctx.fillText(`${node.value}`, node.x * rectSize + 12, node.y * rectSize + 18)
  })
}
