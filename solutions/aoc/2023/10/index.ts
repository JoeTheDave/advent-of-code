// Advent of Code | 2023 | Day 10 | Pipe Maze
// https://adventofcode.com/2023/day/10
// https://adventofcode.com/2023/day/10/input

import { compact } from 'lodash'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2023 | Day 10 | Pipe Maze'
export const complete = [false, false]

const useTestData = true

const data = useTestData ? testData : puzzleData

export class NodeCorner {
  status: boolean | null
  connectedCorners: NodeCorner[]

  constructor() {
    this.status = null
    this.connectedCorners = []
  }

  propagateValue = () => {
    this.connectedCorners.forEach(corner => (corner.status = this.status))
  }
}

export class NetworkNode {
  nodeType: string
  x: number
  y: number
  north: NetworkNode | null
  south: NetworkNode | null
  east: NetworkNode | null
  west: NetworkNode | null
  step: number | null
  connectionNodes: NetworkNode[]
  ne: NodeCorner
  se: NodeCorner
  sw: NodeCorner
  nw: NodeCorner

  constructor(coords: number[], nodeType: string) {
    const [x, y] = coords
    this.x = x
    this.y = y
    this.nodeType = nodeType
    this.north = null
    this.south = null
    this.east = null
    this.west = null
    this.step = null
    this.connectionNodes = []
    this.ne = new NodeCorner()
    this.se = new NodeCorner()
    this.sw = new NodeCorner()
    this.nw = new NodeCorner()
    this.establishCornerAssociations()
  }

  getNeighboringNodes = () => compact([this.north, this.east, this.south, this.west])

  associateCorners = (corners: NodeCorner[]) => {
    for (let a = 0; a < corners.length - 1; a++) {
      for (let b = a + 1; b < corners.length; b++) {
        corners[a].connectedCorners.push(corners[b])
        corners[b].connectedCorners.push(corners[a])
      }
    }
  }

  establishCornerAssociations = () => {
    switch (this.nodeType) {
      case '|':
        this.associateCorners([this.ne, this.se])
        this.associateCorners([this.nw, this.sw])
        break
      case '-':
        this.associateCorners([this.nw, this.ne])
        this.associateCorners([this.sw, this.se])
        break
      case 'L':
        this.associateCorners([this.nw, this.sw, this.se])
        break
      case 'J':
        this.associateCorners([this.ne, this.se, this.sw])
        break
      case '7':
        this.associateCorners([this.nw, this.ne, this.se])
        break
      case 'F':
        this.associateCorners([this.sw, this.nw, this.ne])
        break
      default:
    }
  }

  determineNodeType = () => {
    const connectedNorth = this.connectionNodes.includes(this.north as NetworkNode)
    const connectedEast = this.connectionNodes.includes(this.east as NetworkNode)
    const connectedSouth = this.connectionNodes.includes(this.south as NetworkNode)
    const connectedWest = this.connectionNodes.includes(this.west as NetworkNode)
    if (connectedNorth && connectedSouth) {
      this.nodeType = '|'
    } else if (connectedWest && connectedEast) {
      this.nodeType = '-'
    } else if (connectedNorth && connectedEast) {
      this.nodeType = 'L'
    } else if (connectedNorth && connectedWest) {
      this.nodeType = 'J'
    } else if (connectedSouth && connectedWest) {
      this.nodeType = '7'
    } else if (connectedSouth && connectedEast) {
      this.nodeType = 'F'
    }
  }

  getAllignedCorners = () => [this.ne, this.se, this.sw, this.nw].filter(c => c.status !== null)
  getUnallignedCorners = () => [this.ne, this.se, this.sw, this.nw].filter(c => c.status === null)

  determineAlignment = () => {
    let alligned = this.getAllignedCorners()
    if (!alligned.length) {
      if (this.north && this.north.getUnallignedCorners().length === 0) {
        this.ne.status = this.north.se.status
        this.nw.status = this.north.sw.status
      } else if (this.east && this.east.getUnallignedCorners().length === 0) {
        this.ne.status = this.east.nw.status
        this.se.status = this.east.sw.status
      } else if (this.south && this.south.getUnallignedCorners().length === 0) {
        this.se.status = this.south.ne.status
        this.sw.status = this.south.nw.status
      } else if (this.west && this.west.getUnallignedCorners().length === 0) {
        this.nw.status = this.west.ne.status
        this.sw.status = this.west.se.status
      }
    }
    alligned = this.getAllignedCorners()
    if (alligned.length) {
      alligned[0].propagateValue()
      const unalligned = this.getUnallignedCorners()
      if (unalligned.length) {
        unalligned[0].status = !alligned[0].status
        unalligned[0].propagateValue()
      }
    }
  }
}

export class Network {
  network: NetworkNode[]
  startNode: NetworkNode
  leads: NetworkNode[]

  constructor(dataMap: string[]) {
    this.network = []
    const dataRowLength = dataMap[0].length

    dataMap.forEach((dataRow, y) => {
      dataRow.split('').forEach((pipe, x) => {
        this.network.push(new NetworkNode([x, y], pipe))
      })
    })
    this.network.forEach(node => {
      if (node.y > 0) {
        node.north = this.network.find(n => n.x === node.x && n.y === node.y - 1) || null
      }
      if (node.x < dataRowLength - 1) {
        node.east = this.network.find(n => n.x === node.x + 1 && n.y === node.y) || null
      }
      if (node.y < dataMap.length - 1) {
        node.south = this.network.find(n => n.x === node.x && n.y === node.y + 1) || null
      }
      if (node.x > 0) {
        node.west = this.network.find(n => n.x === node.x - 1 && n.y === node.y) || null
      }
      switch (node.nodeType) {
        case '|':
          node.connectionNodes = compact([node.north, node.south])
          break
        case '-':
          node.connectionNodes = compact([node.west, node.east])
          break
        case 'L':
          node.connectionNodes = compact([node.north, node.east])
          break
        case 'J':
          node.connectionNodes = compact([node.north, node.west])
          break
        case '7':
          node.connectionNodes = compact([node.south, node.west])
          break
        case 'F':
          node.connectionNodes = compact([node.south, node.east])
          break
        default:
          node.connectionNodes = []
      }
    })
    this.startNode = this.network.find(n => n.nodeType === 'S') as NetworkNode
    this.startNode.connectionNodes = this.startNode
      .getNeighboringNodes()
      .filter(n => n.connectionNodes.includes(this.startNode))
    this.startNode.determineNodeType()
    this.startNode.establishCornerAssociations()
    this.startNode.ne.status = true
    this.startNode.determineAlignment()
    this.leads = []
  }

  stepPath = () => {
    let nextStep = 1
    if (this.leads.length === 0) {
      this.leads = this.startNode.connectionNodes
    } else {
      nextStep = (this.leads[0].step as number) + 1
      this.leads = this.leads.map(lead => lead.connectionNodes.find(l => l.step === null) as NetworkNode)
    }
    console.log(nextStep)
    this.leads.forEach(lead => {
      lead.step = nextStep
      lead.determineAlignment()
    })
  }

  mapPath = () => {
    do {
      this.stepPath()
    } while (this.leads[0] !== this.leads[1])
    return this.leads[0].step
  }
}

export const solutionOne = () => {
  const pipeNetwork = new Network(data)
  return pipeNetwork.mapPath()
}

export const solutionTwo = () => {
  // const pipeNetwork = new Network(testData)
  // const result = pipeNetwork.mapPath()
  // console.log('total nodes: ', pipeNetwork.network.length)
  // console.log('alligned nodes: ', pipeNetwork.network.filter(n => n.getAllignedCorners().length === 4).length)
  // console.log('path nodes: ', pipeNetwork.network.filter(n => n.step !== null).length)
  // return result
}
