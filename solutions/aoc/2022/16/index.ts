// Advent of Code | 2022 | Day 16 | Proboscidea Volcanium
// https://adventofcode.com/2022/day/16
// https://adventofcode.com/2022/day/16/input

import { flatten } from 'lodash'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2022 | Day 16 | Proboscidea Volcanium'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

const generateValveNetwork = (data: string[]) => {
  const valveNetork: Valve[] = []
  data.forEach(row => {
    const rowData = row
      .replace('Valve ', '')
      .replace('has flow rate=', '')
      .replace('tunnel ', 'tunnels ')
      .replace('leads ', 'lead ')
      .replace('valve ', 'valves ')
      .replace('; tunnels lead to valves', '')
      .split(', ')
      .join(',')
      .split(' ')
    valveNetork.push(
      new Valve({
        id: rowData[0],
        flow: parseInt(rowData[1]),
        connectsTo: rowData[2].split(','),
      }),
    )
  })
  valveNetork.forEach(valve => {
    valve.connectsTo.forEach(connection => {
      valve.connections.push(valveNetork.find(v => v.id === connection) as Valve)
    })
  })
  valveNetork.forEach(valve => {
    valve.paths = valve.connections.reduce((paths, connection) => {
      paths[connection.id] = [connection.id]
      return paths
    }, {} as { [key: string]: string[] })

    for (let i = 0; true; i++) {
      let breakCondition = true
      Object.keys(valve.paths).forEach(key => {
        const pathEnd = valve.paths[key].slice(-1)[0]
        const pathEndValve = valveNetork.find(v => v.id === pathEnd) as Valve
        const pathEndValveConnections = pathEndValve.connections.filter(
          c => !Object.keys(valve.paths).includes(c.id) && c.id !== valve.id,
        )
        pathEndValveConnections.forEach(v => {
          valve.paths[v.id] = [...valve.paths[key], v.id]
          breakCondition = false
        })
      })
      if (breakCondition) {
        break
      }
    }
  })
  return valveNetork
}

class Valve {
  id: string
  flow: number
  connectsTo: string[]
  connections: Valve[]
  paths: { [key: string]: string[] }

  constructor({ id, flow, connectsTo }: { id: string; flow: number; connectsTo: string[] }) {
    this.id = id
    this.flow = flow
    this.connectsTo = connectsTo
    this.connections = []
    this.paths = {}
  }
}

interface PathNode {
  valveId: string
  activationTime: number
  flowRate: number
}

const generateValveActivationProtocols = ({ network, path }: { network: Valve[]; path: PathNode[] }) => {
  const { valveId, activationTime: timeRemaining } = path.slice(-1)[0]
  const currentValve = network.find(v => v.id === valveId) as Valve
  const relevantValves = network.filter(
    valve =>
      valve.flow > 0 &&
      (currentValve.paths[valve.id] || []).length + 1 <= timeRemaining &&
      path.every(pathValve => pathValve.valveId !== valve.id),
  )
  let protocolPaths: PathNode[][] = []
  if (!relevantValves.length) {
    protocolPaths = [path]
  } else {
    protocolPaths = flatten(
      relevantValves.map(relevantValve => {
        return generateValveActivationProtocols({
          network,
          path: [
            ...path,
            {
              valveId: relevantValve.id,
              flowRate: relevantValve.flow,
              activationTime: timeRemaining - (currentValve.paths[relevantValve.id].length + 1),
            },
          ],
        })
      }),
    )
  }
  return protocolPaths
}

const determineOptimalProtocal = (protocols: PathNode[][]) => {
  let bestOutcome = 0
  protocols.forEach(protocol => {
    bestOutcome = Math.max(
      bestOutcome,
      protocol.map(pathNode => pathNode.activationTime * pathNode.flowRate).reduce((sum, num) => sum + num, 0),
    )
  })

  return bestOutcome
}

const determineOptimalDualPathProtocal = (protocols: PathNode[][]) => {
  let bestOutcome = 0

  protocols.forEach(protocol1 => {
    const asdf = protocols.filter(protocol => {
      return !protocol.some(pathNode => {
        return (
          (protocol1[1] && pathNode.valveId === protocol1[1].valveId) ||
          (protocol1[2] && pathNode.valveId === protocol1[2].valveId) ||
          (protocol1[3] && pathNode.valveId === protocol1[3].valveId) ||
          (protocol1[4] && pathNode.valveId === protocol1[4].valveId)
        )
      })
    })

    asdf.forEach(protocol2 => {
      const combinedProtocol: { [key: string]: PathNode } = {}
      const protocolOptions: PathNode[] = [...protocol1, ...protocol2]
      protocolOptions.forEach(node => {
        combinedProtocol[node.valveId] = {
          activationTime: Math.max(
            combinedProtocol[node.valveId] ? combinedProtocol[node.valveId].activationTime : 0,
            node.activationTime,
          ),
          flowRate: node.flowRate,
          valveId: node.valveId,
        }
      })

      bestOutcome = Math.max(
        bestOutcome,
        Object.values(combinedProtocol)
          .map(pathNode => pathNode.activationTime * pathNode.flowRate)
          .reduce((sum, num) => sum + num, 0),
      )
    })
  })
  return bestOutcome
}

export const solutionOne = () => {
  const network = generateValveNetwork(data)
  const protocols = generateValveActivationProtocols({
    network,
    path: [{ valveId: 'AA', activationTime: 30, flowRate: 0 }],
  })
  return determineOptimalProtocal(protocols)
}

// NOTE: Solution 2 takes upwards of 2 minutes to complete
export const solutionTwo = () => {
  const network = generateValveNetwork(data)
  const protocols = generateValveActivationProtocols({
    network,
    path: [{ valveId: 'AA', activationTime: 26, flowRate: 0 }],
  })
  return determineOptimalDualPathProtocal(protocols)
}
