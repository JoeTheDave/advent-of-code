// Advent of Code | 2020 | Day 7 | Handy Haversacks
// https://adventofcode.com/2020/day/7
// https://adventofcode.com/2020/day/7/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2020 | Day 7 | Handy Haversacks'
export const complete = [true, false]

const useTestData = false

const rawData = useTestData ? testData : puzzleData

class Bag {
  color: string
  contains: { bag: Bag; count: number }[]
  containsRaw: string[]

  constructor(color: string, rawContents: string[]) {
    this.color = color
    this.contains = []
    this.containsRaw = rawContents
  }

  canContain = (bagColor: string): boolean => {
    if (this.contains.length) {
      return (
        this.contains.some(childBag => childBag.bag.color === bagColor) ||
        this.contains.reduce((outcome, bagInfo) => outcome || bagInfo.bag.canContain(bagColor), false)
      )
    }
    return false
  }

  totalContentsCount = (): number => {
    // if (this.contains.length) {
    //   this.contains.
    // }
    return 0
  }
}

const parseData = (data: string) => {
  const bags = data
    .split('\n')
    .map(row => row.split(' bags contain '))
    .map(dataRow => [
      dataRow[0],
      dataRow[1]
        .replace('.', '')
        .split(', ')
        .map(i => i.replace(' bags', '').replace(' bag', '')),
    ])
    .map(bagInfo => new Bag(bagInfo[0] as string, bagInfo[1] as string[]))
  bags.forEach(bag => {
    if (bag.containsRaw[0] !== 'no other') {
      bag.containsRaw.forEach(rawContains => {
        const splitIdx = rawContains.indexOf(' ')
        const count = parseInt(rawContains.slice(0, splitIdx))
        const bagColor = rawContains.slice(splitIdx + 1)
        const bagRef = bags.find(b => b.color === bagColor)
        if (bagRef) {
          bag.contains.push({ bag: bagRef, count })
        }
      })
    }
  })
  return bags
}

export const solutionOne = () => {
  const bags = parseData(rawData)
  return bags.map(bag => bag.canContain('shiny gold')).filter(_ => _).length
}

export const solutionTwo = () => {
  const bags = parseData(rawData)
  const shinyGoldBag = bags.find(bag => bag.color === 'shiny gold') as Bag
  return shinyGoldBag.totalContentsCount()
}
