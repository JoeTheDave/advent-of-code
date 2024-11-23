// Advent of Code | 2021 | Day 8 | Seven Segment Search
// https://adventofcode.com/2021/day/8
// https://adventofcode.com/2021/day/8/input

import { difference } from 'lodash'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2021 | Day 8 | Seven Segment Search'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

export type segmentKey = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g'

export class SegmentMapper {
  a: string[]
  b: string[]
  c: string[]
  d: string[]
  e: string[]
  f: string[]
  g: string[]
  hints: string[]
  list: string[]

  oneSegments = ['c', 'f'] // 2
  fourSegments = ['b', 'c', 'd', 'f'] // 4
  sevenSegments = ['a', 'c', 'f'] // 3
  twoSegments = ['a', 'c', 'd', 'e', 'g'] // 5
  threeSegments = ['a', 'c', 'd', 'f', 'g'] // 5
  fiveSegments = ['a', 'b', 'd', 'f', 'g'] // 5
  zeroSegments = ['a', 'b', 'c', 'e', 'f', 'g'] // 6
  sixSegments = ['a', 'b', 'd', 'e', 'f', 'g'] // 6
  nineSegments = ['a', 'b', 'c', 'd', 'f', 'g'] // 6
  eightSegments = ['a', 'b', 'c', 'd', 'e', 'f', 'g'] // 7

  constructor(hints: string[]) {
    this.list = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
    this.a = [...this.list]
    this.b = [...this.list]
    this.c = [...this.list]
    this.d = [...this.list]
    this.e = [...this.list]
    this.f = [...this.list]
    this.g = [...this.list]
    this.hints = hints
    this.processDigitOneHint()
    this.processDigitSevenHint()
    this.processDigitFourHint()
  }
  processDigitOneHint() {
    const hintOneSignals = this.hints.find(h => h.length === 2)?.split('') as string[]
    this.list.forEach(key => {
      if (this.oneSegments.includes(key)) {
        this[key as segmentKey] = [...hintOneSignals]
      } else {
        this[key as segmentKey] = this[key as segmentKey].filter(p => !hintOneSignals.includes(p))
      }
    })
  }
  processDigitSevenHint() {
    const hintSevenSignals = this.hints.find(h => h.length === 3)?.split('') as string[]
    const hintOneSignals = this.hints.find(h => h.length === 2)?.split('') as string[]
    const uniqSevenSignal = difference(hintSevenSignals, hintOneSignals)
    const uniqSevenSegment = difference(this.sevenSegments, this.oneSegments)[0]
    this.list.forEach(key => {
      if (key === uniqSevenSegment) {
        this[key as segmentKey] = [...uniqSevenSignal]
      } else {
        this[key as segmentKey] = this[key as segmentKey].filter(p => p !== uniqSevenSignal[0])
      }
    })
  }
  processDigitFourHint() {
    const hintFourSignals = this.hints.find(h => h.length === 4)?.split('') as string[]
    const hintOneSignals = this.hints.find(h => h.length === 2)?.split('') as string[]
    const uniqFourSignals = difference(hintFourSignals, hintOneSignals)
    const uniqFourSegments = difference(this.fourSegments, this.oneSegments)
    this.list.forEach(key => {
      if (uniqFourSegments.includes(key)) {
        this[key as segmentKey] = [...uniqFourSignals]
      } else {
        this[key as segmentKey] = this[key as segmentKey].filter(p => !uniqFourSignals.includes(p))
      }
    })
  }
  decipherDigit(d: string) {
    if (d.length === 2) {
      return 1
    }
    if (d.length === 3) {
      return 7
    }
    if (d.length === 4) {
      return 4
    }
    if (d.length === 5) {
      if (d.includes(this.b[0]) && d.includes(this.b[1])) {
        return 5
      } else if (d.includes(this.c[0]) && d.includes(this.f[1])) {
        return 3
      } else {
        return 2
      }
    }
    if (d.length === 6) {
      if (!(d.includes(this.b[0]) && d.includes(this.b[1]))) {
        return 0
      } else if (!(d.includes(this.c[0]) && d.includes(this.f[1]))) {
        return 6
      } else {
        return 9
      }
    }
    if (d.length === 7) {
      return 8
    }
  }
}

export const solutionOne = () => {
  return data.reduce(
    (sum, d) =>
      sum +
      d
        .split(' | ')[1]
        .split(' ')
        .map(s => s.length)
        .filter(n => [2, 4, 3, 7].includes(n)).length,
    0,
  )
}

export const solutionTwo = () => {
  return data.reduce((sum, d) => {
    const [hints, ciphers] = d.split(' | ').map(_ => _.split(' '))
    const mapper = new SegmentMapper(hints)
    return sum + parseInt(ciphers.map(c => mapper.decipherDigit(c)).join(''))
  }, 0)
}
