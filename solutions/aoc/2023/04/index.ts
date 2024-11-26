// Advent of Code | 2023 | Day 4 | Scratchcards
// https://adventofcode.com/2023/day/4
// https://adventofcode.com/2023/day/4/input

import { intersection } from 'lodash'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2023 | Day 4 | Scratchcards'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

interface CardDetail {
  id: number
  winningNumbers: number[]
  cardNumbers: number[]
}

const compileCardData = (cardData: string[]) => {
  return cardData.map(card => {
    const [label, numbers] = card.split(': ')
    const [winning, cardNumbers] = numbers.split(' | ')
    const id = parseInt(label.match(/\d+/g)![0])
    return {
      id,
      winningNumbers: winning.match(/\d+/g)!.map(num => parseInt(num)),
      cardNumbers: cardNumbers.match(/\d+/g)!.map(num => parseInt(num)),
    } as CardDetail
  })
}

export const solutionOne = () => {
  return compileCardData(data).reduce((sum, cardData) => {
    const matches = intersection(cardData.cardNumbers, cardData.winningNumbers).length
    return sum + (matches > 0 ? 2 ** (matches - 1) : 0)
  }, 0)
}

export const solutionTwo = () => {
  const cardData = compileCardData(data)
  const cardCounts = cardData.reduce((counts, card) => {
    counts[card.id] = 1
    return counts
  }, {} as { [key: number]: number })

  cardData.forEach(card => {
    const matches = intersection(card.cardNumbers, card.winningNumbers).length
    for (let i = card.id + 1; i <= card.id + matches; i++) {
      cardCounts[i] += cardCounts[card.id]
    }
  })
  return Object.keys(cardCounts).reduce((sum, key) => sum + cardCounts[parseInt(key)], 0)
}
