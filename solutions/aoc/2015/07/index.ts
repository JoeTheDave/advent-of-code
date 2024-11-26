// Advent of Code | 2015 | Day 7 | Some Assembly Required
// https://adventofcode.com/2015/day/7
// https://adventofcode.com/2015/day/7/input

import { padStart } from 'lodash'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2015 | Day 7 | Some Assembly Required'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

const parseConfigValue = (value: string) => {
  const num = parseFloat(value)
  return isNaN(num) ? value : num
}

class Wire {
  name: string
  value: number | null
  operation: string
  inputs: (string | number)[]
  pending: string[]
  dependentWires: Wire[]

  constructor(config: string) {
    const [input, name] = config.split(' -> ')
    const operationalConfig = input.split(' ')
    this.name = name
    this.value = null
    this.operation = ''
    this.inputs = []
    this.pending = []
    this.dependentWires = []

    if (operationalConfig.length === 1) {
      this.operation = 'PASS'
      this.inputs.push(parseConfigValue(operationalConfig[0]))
    }
    if (operationalConfig[0] === 'NOT') {
      this.operation = operationalConfig[0]
      this.inputs.push(parseConfigValue(operationalConfig[1]))
    }
    if (['AND', 'OR'].includes(operationalConfig[1])) {
      this.operation = operationalConfig[1]
      this.inputs.push(parseConfigValue(operationalConfig[0]))
      this.inputs.push(parseConfigValue(operationalConfig[2]))
    }
    if (['LSHIFT', 'RSHIFT'].includes(operationalConfig[1])) {
      this.operation = `${operationalConfig[1]}|${operationalConfig[2]}`
      this.inputs.push(parseConfigValue(operationalConfig[0]))
    }
    this.inputs.forEach(i => {
      if (typeof i === 'string') {
        this.pending.push(i)
      }
    })
  }

  print16BitNumber = () => {
    console.log(
      this.value ? `${padStart(this.value.toString(), 10, ' ')} - ${padStart(this.value.toString(2), 16, '0')}` : null,
    )
  }

  getInputValues = () => {
    return this.inputs.map(i => {
      if (typeof i === 'number') {
        return i
      } else {
        const dependentWire = this.dependentWires.find(w => w.name === i) as Wire
        return dependentWire.value
      }
    }) as number[]
  }

  isReadyForResolution = () => {
    return this.dependentWires.every(wire => wire.value !== null)
  }

  print = () => {
    console.log(`${this.name} | ${this.value} | ${this.operation} | ${this.pending.join(' ')}`)
  }

  resolveValue = () => {
    if (this.isReadyForResolution()) {
      const inputValues = this.getInputValues()
      if (this.operation === 'PASS') {
        this.value = inputValues[0]
      } else if (this.operation === 'NOT') {
        this.value = inputValues[0] ^ 0xffff
      } else if (this.operation === 'AND') {
        this.value = inputValues[0] & inputValues[1]
      } else if (this.operation === 'OR') {
        this.value = inputValues[0] | inputValues[1]
      } else if (this.operation?.includes('RSHIFT')) {
        this.value = inputValues[0] >> parseInt(this.operation.split('|')[1])
      } else if (this.operation?.includes('LSHIFT')) {
        this.value = (inputValues[0] << parseInt(this.operation.split('|')[1])) & 0xffff
      }
    }
  }
}

class WiringConfiguration {
  wires: Wire[]

  constructor(data: string[]) {
    this.wires = data.map(d => new Wire(d))
    this.wires.forEach(wire => {
      wire.pending.forEach(pendingWire => {
        const dependentWire = this.wires.find(w => w.name === pendingWire)
        if (dependentWire) {
          wire.dependentWires.push(dependentWire)
        }
      })
    })
  }

  printReadyForResolution = () => {
    const wires = this.wires.filter(w => w.isReadyForResolution() && w.value === null)
    console.log(`===== Ready == ${padStart(wires.length.toString(), 3, '0')} ======================================`)
    wires.forEach(w => w.print())
    console.log('=========================================================')
    console.log('')
  }

  resolveReadyWires = () => {
    this.wires.filter(w => w.isReadyForResolution()).forEach(w => w.resolveValue())
  }

  printResolvedWires = () => {
    const wires = this.wires.filter(w => w.value !== null)
    console.log('=========================================================')
    wires.forEach(w => w.print())
    console.log(
      `===== Resolved == ${padStart(wires.length.toString(), 3, '0')} of ${
        this.wires.length
      } ============================`,
    )
    console.log('')
  }

  getUnresolvedWiresCount = () => {
    return this.wires.filter(w => w.value === null).length
  }

  resolveAllWires = () => {
    do {
      this.resolveReadyWires()
    } while (this.getUnresolvedWiresCount() > 0)
  }

  clearWireValues = () => {
    this.wires.forEach(w => (w.value = null))
  }
}

export const solutionOne = () => {
  const wiringConfig = new WiringConfiguration(data)
  wiringConfig.resolveAllWires()
  return wiringConfig.wires.find(c => c.name === 'a')?.value
}

export const solutionTwo = () => {
  const wiringConfig = new WiringConfiguration(data)
  wiringConfig.resolveAllWires()
  const wireA = wiringConfig.wires.find(c => c.name === 'a') as Wire
  const wireB = wiringConfig.wires.find(c => c.name === 'b') as Wire
  wireB.inputs[0] = wireA.value as number
  wiringConfig.clearWireValues()
  wiringConfig.resolveAllWires()
  return wireA.value
}
