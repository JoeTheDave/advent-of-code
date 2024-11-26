// Advent of Code | 2023 | Day 7 | Camel Cards
// https://adventofcode.com/2023/day/7
// https://adventofcode.com/2023/day/7/input

import { countBy } from 'lodash'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2023 | Day 7 | Camel Cards'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

export const processData = () => {
  return data.map(line => {
    const [hand, bid] = line.split(' ')
    return { hand: hand.split(''), bid: parseInt(bid) }
  })
}

const determineHandType = (hand: string[]) => {
  // 7 | Five of a kind | 1
  // 6 | Four of a kind | 2
  // 5 | Full house | 2
  // 4 | Three of a kind | 3
  // 3 | Two pair | 3
  // 2 | One pair | 4
  // 1 | High card | 5
  const counts = Object.values(countBy(hand))

  if (counts.length === 1) {
    return 7
  }
  if (counts.length === 2) {
    if (counts.some(_ => _ === 4)) {
      return 6
    } else {
      return 5
    }
  }
  if (counts.length === 3) {
    if (counts.some(_ => _ === 3)) {
      return 4
    } else {
      return 3
    }
  }
  if (counts.length === 4) {
    return 2
  }
  return 1
}

const determineJokerHandType = (hand: string[]) => {
  if (hand.join('') === 'JJJJJ') {
    return 7
  }
  if (hand.includes('J')) {
    return Math.max(
      ...Object.keys(countBy(hand))
        .filter(k => k !== 'J')
        .map(alt => determineHandType(hand.join('').split('J').join(alt).split(''))),
    )
  } else {
    return determineHandType(hand)
  }
}

const cardVal = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
}

const jCardVal = {
  A: 14,
  K: 13,
  Q: 12,
  T: 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
  J: 1,
}

export const solutionOne = () => {
  return processData()
    .map(item => ({ ...item, handType: determineHandType(item.hand) }))
    .sort((a, b) => {
      if (a.handType === b.handType) {
        for (let i = 0; i <= 4; i++) {
          if (a.hand[i] !== b.hand[i]) {
            return cardVal[a.hand[i] as keyof typeof cardVal] > cardVal[b.hand[i] as keyof typeof cardVal] ? 1 : -1
          }
        }
      }
      return a.handType > b.handType ? 1 : -1
    })
    .map((hand, i) => hand.bid * (i + 1))
    .reduce((sum, num) => sum + num, 0)
}

export const solutionTwo = () => {
  return processData()
    .map(item => ({ ...item, handType: determineJokerHandType(item.hand) }))
    .sort((a, b) => {
      if (a.handType === b.handType) {
        for (let i = 0; i <= 4; i++) {
          if (a.hand[i] !== b.hand[i]) {
            return jCardVal[a.hand[i] as keyof typeof jCardVal] > jCardVal[b.hand[i] as keyof typeof jCardVal] ? 1 : -1
          }
        }
      }
      return a.handType > b.handType ? 1 : -1
    })
    .map((hand, i) => hand.bid * (i + 1))
    .reduce((sum, num) => sum + num, 0)
}
