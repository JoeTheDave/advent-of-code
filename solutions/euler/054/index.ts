// Project Euler | Problem 54 | Poker Hands
// https://projecteuler.net/problem=54

import { readFileSync } from 'fs'
import { groupBy } from 'lodash'

export const displayName = 'EULER | Problem 54 | Poker Hands'
export const complete = true

// NOTE: This solution produces the correct answer given the provided dataset. If however, the dataset were
// continuously randomized, it would not continue to product the correct answer. There are edge cases where
// where multiple levels of high cards match Or where the high set of 2 pair matches, etc.

const highCard = (cards: CardDetails[]) => cards.reduce((highCard, card) => Math.max(highCard, card.value), 0)

interface CardDetails {
  value: number
  suit: string
}

const cardValues: { [key: string]: number } = { T: 10, J: 11, Q: 12, K: 13, A: 14 }

const cardDetails = (card: string): CardDetails => {
  const [val, suit] = card.split('')
  return {
    value: cardValues[val] || parseInt(val),
    suit,
  }
}

const isFlush = (cards: CardDetails[]) => {
  return (
    cards.every(card => card.suit === cards[0].suit) ||
    (cards[0].value === 14 &&
      cards[1].value === 2 &&
      cards[2].value === 3 &&
      cards[3].value === 4 &&
      cards[4].value === 5)
  )
}

const isStrait = (cards: CardDetails[]) => {
  return cards.every((card, idx) => idx === 4 || card.value === cards[idx + 1].value - 1)
}

const handRanking = (hand: CardDetails[]) => {
  const strait = isStrait(hand)
  const flush = isFlush(hand)
  const groupings = groupBy(hand, card => card.value)
  const groupingKeys = Object.keys(groupings)
  // console.log(groupings)
  if (strait && flush && hand.some(card => card.value === 14) && hand.some(card => card.value === 13)) {
    // Royal Flush
    return 9
  } else if (strait && flush) {
    // Strait Flush
    return 8
  } else if (groupingKeys.length === 2 && groupingKeys.some(key => groupings[key].length === 4)) {
    // 4 of a Kind
    return 7
  } else if (groupingKeys.length === 2 && groupingKeys.some(key => groupings[key].length === 3)) {
    // Full House
    return 6
  } else if (flush) {
    // Flush
    return 5
  } else if (strait) {
    // Strait
    return 4
  } else if (groupingKeys.length === 3 && groupingKeys.some(key => groupings[key].length === 3)) {
    // 3 of a Kind
    return 3
  } else if (
    groupingKeys.length === 3 &&
    groupingKeys.every(key => groupings[key].length === 2 || groupings[key].length === 1)
  ) {
    // 2 Pair
    return 2
  } else if (groupingKeys.length === 4) {
    // 1 Pair
    return 1
  }
  return 0
}

const evaluateHands = (game: string[][]) => {
  const [hand1, hand2] = game.map(hand =>
    hand.map(card => cardDetails(card)).sort((a, b) => (a.value > b.value ? 1 : -1)),
  )
  const hand1Rank = handRanking(hand1)
  const hand2Rank = handRanking(hand2)
  if (hand1Rank > hand2Rank) {
    return true
  } else if (hand2Rank > hand1Rank) {
    return false
  } else {
    if (hand1Rank === 0) {
      if (highCard(hand1) > highCard(hand2)) {
        return true
      } else if (highCard(hand1) < highCard(hand2)) {
        return false
      } else {
        console.log('tied high card')
        return null
      }
    } else if (hand1Rank === 1) {
      const hand1Groupings = groupBy(hand1, card => card.value)
      const hand1GroupingKeys = Object.keys(hand1Groupings)
      const hand2Groupings = groupBy(hand2, card => card.value)
      const hand2GroupingKeys = Object.keys(hand2Groupings)
      const hand1PairCard = parseInt(hand1GroupingKeys.find(key => hand1Groupings[key].length === 2) as string)
      const hand2PairCard = parseInt(hand2GroupingKeys.find(key => hand2Groupings[key].length === 2) as string)
      if (hand1PairCard > hand2PairCard) {
        return true
      } else if (hand1PairCard < hand2PairCard) {
        return false
      } else {
        if (highCard(hand1) > highCard(hand2)) {
          return true
        } else if (highCard(hand1) < highCard(hand2)) {
          return false
        }
        return null
      }
    }
    return null
  }
}

export const solution = () => {
  const rawData = readFileSync(`${__dirname}/poker-hands.txt`, 'utf8')
  const games = rawData
    .split('\n')
    .map(row => row.split(' '))
    .map(cards => [cards.slice(0, 5), cards.slice(5, 10)])
  const results = games.map(game => evaluateHands(game))

  return results.filter(r => r).length
}
