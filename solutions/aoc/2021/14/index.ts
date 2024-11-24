// Advent of Code | 2021 | Day 14 | Extended Polymerization
// https://adventofcode.com/2021/day/14
// https://adventofcode.com/2021/day/14/input

import { uniq } from 'lodash'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2021 | Day 14 | Extended Polymerization'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

export class PolymerAnalyzer {
  operations: { [key: string]: string }
  projections: { [key: string]: string[] }
  pairs: { [key: string]: number }
  elements: { [key: string]: number }

  constructor(data: string[]) {
    const polymer = data[0]
    this.operations = data.slice(2).reduce((opps, val) => {
      const opp = val.split(' -> ')
      opps[opp[0]] = opp[1]
      return opps
    }, {} as { [key: string]: string })

    this.projections = Object.keys(this.operations).reduce((projections, key) => {
      const combinator = this.operations[key]
      const pairs = key.split('')
      projections[key] = [pairs[0] + combinator, combinator + pairs[1]]
      return projections
    }, {} as { [key: string]: string[] })

    this.pairs = Object.keys(this.operations).reduce((pairs, key) => {
      pairs[key] = 0
      return pairs
    }, {} as { [key: string]: number })
    for (let i = 0; i < polymer.length - 1; i++) {
      const segment = polymer.slice(i, i + 2)
      this.pairs[segment]++
    }

    this.elements = uniq(
      Object.keys(this.operations)
        .map(key => `${key}${this.operations[key]}`)
        .join('')
        .split(''),
    ).reduce((elements, element) => {
      elements[element] = 0
      return elements
    }, {} as { [key: string]: number })
    polymer.split('').forEach(element => this.elements[element]++)
  }

  simulatePolymerizationStep() {
    Object.keys(this.pairs).forEach(key => {
      this.elements[this.operations[key]] += this.pairs[key]
    })
    this.pairs = Object.keys(this.pairs).reduce((pairCounts, key) => {
      const pairProjections = this.projections[key]
      pairCounts[pairProjections[0]] = (pairCounts[pairProjections[0]] || 0) + this.pairs[key]
      pairCounts[pairProjections[1]] = (pairCounts[pairProjections[1]] || 0) + this.pairs[key]
      return pairCounts
    }, {} as { [key: string]: number })
  }

  calculatePolymerElementDifferencial() {
    return Math.max(...Object.values(this.elements)) - Math.min(...Object.values(this.elements))
  }
}

export const solutionOne = () => {
  const polymerAnalyzer = new PolymerAnalyzer(data)
  for (let i = 0; i < 10; i++) {
    polymerAnalyzer.simulatePolymerizationStep()
  }
  return polymerAnalyzer.calculatePolymerElementDifferencial()
}

export const solutionTwo = () => {
  const polymerAnalyzer = new PolymerAnalyzer(data)
  for (let i = 0; i < 40; i++) {
    polymerAnalyzer.simulatePolymerizationStep()
  }
  return polymerAnalyzer.calculatePolymerElementDifferencial()
}
