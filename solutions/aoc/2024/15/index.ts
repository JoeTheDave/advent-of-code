// Advent of Code | 2024 | Day 15 | Warehouse Woes
// https://adventofcode.com/2024/day/15
// https://adventofcode.com/2024/day/15/input

import { getContext } from '@/lib/vis'
import { smallTestData, testData, puzzleData } from './data'

export const displayName = 'AOC | 2024 | Day 15 | Warehouse Woes'
export const complete = [true, false]

const useTestData = true

const rawdata = useTestData ? testData : puzzleData

class Node {
  value: string
  x: number
  y: number
  id: number
  n: Node | null
  e: Node | null
  s: Node | null
  w: Node | null

  constructor(value: string, x: number, y: number, id: number) {
    this.value = value
    this.x = x
    this.y = y
    this.id = id
    this.n = null
    this.e = null
    this.s = null
    this.w = null
  }

  getTargetNode = (instruction: string) => {
    let node: Node | null = null
    if (instruction === '^') {
      node = this.n
    } else if (instruction === '>') {
      node = this.e
    } else if (instruction === 'v') {
      node = this.s
    } else if (instruction === '<') {
      node = this.w
    }
    return node
  }

  push = (instruction: string, content: string): boolean => {
    if (this.value === '.') {
      this.value = content
      return true
    } else if (this.value === '#') {
      return false
    } else {
      const targetNode = this.getTargetNode(instruction) as Node
      const success = targetNode.push(instruction, this.value)
      if (success) {
        this.value = content
      }
      return success
    }
  }
}

class Map {
  nodes: Node[]
  instructions: string[]
  constructor(data: string[]) {
    let instructions = ''
    this.nodes = []
    let dataTypetransition = false
    data.forEach((dataRow, idx) => {
      if (dataRow === '') {
        dataTypetransition = true
      } else if (dataTypetransition) {
        instructions += dataRow
      } else {
        for (let x = 0; x < dataRow.length; x++) {
          this.nodes.push(new Node(dataRow[x], x, idx, dataRow.length * idx + x))
        }
      }
    })
    this.instructions = instructions.split('')
    this.nodes.forEach(node => {
      if (node.y > 0) {
        node.n = this.nodes.find(n => n.y === node.y - 1 && n.x === node.x) as Node
      }
      if (node.x < data[0].length - 1) {
        node.e = this.nodes.find(n => n.y === node.y && n.x === node.x + 1) as Node
      }
      if (node.y < data.length - 1) {
        node.s = this.nodes.find(n => n.y === node.y + 1 && n.x === node.x) as Node
      }
      if (node.x > 0) {
        node.w = this.nodes.find(n => n.y === node.y && n.x === node.x - 1) as Node
      }
    })
  }

  navigate = () => {
    this.instructions.forEach(instruction => {
      const actorNode = this.nodes.find(node => node.value === '@') as Node
      actorNode.push(instruction, '.')
    })
  }

  evaluate = () => {
    return this.nodes
      .filter(node => node.value === 'O')
      .map(node => node.y * 100 + node.x)
      .reduce((sum, num) => sum + num, 0)
  }
}

export const solutionOne = () => {
  const map = new Map(rawdata)
  map.navigate()
  return map.evaluate()
}

export const solutionTwo = () => {
  return null
}

export const visualize = () => {
  const canvasSize = 900
  const ctx = getContext(canvasSize, canvasSize)

  const map = new Map(rawdata)
  map.navigate()

  const cellSize = 20

  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvasSize, canvasSize)
  map.nodes.forEach(node => {
    if (node.value === '@') {
      ctx.fillStyle = 'lime'
    } else if (node.value === '#') {
      ctx.fillStyle = 'gray'
    } else if (node.value === 'O') {
      ctx.fillStyle = 'orange'
    } else if (node.value === '.') {
      ctx.fillStyle = 'white'
    }

    ctx.fillRect(node.x * cellSize, node.y * cellSize, cellSize, cellSize)
  })

  // const root = document.getElementById('root') as HTMLElement
  // const button = document.createElement('button')
  // button.innerText = 'Iterate'
  // root.appendChild(button)

  // button.onclick = () => {
  //   for (let i = 1; i <= 101; i++) {
  //     iterateRobots()
  //   }
  //   displayRobots()
  // }

  // setInterval(() => {
  //   for (let i = 1; i <= 101; i++) {
  //     iterateRobots()
  //   }
  //   displayRobots()
  // }, 500)
}
