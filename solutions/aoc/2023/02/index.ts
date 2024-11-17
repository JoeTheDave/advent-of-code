// Advent of Code | 2023 | Day 2 | Cube Conundrum
// https://adventofcode.com/2023/day/2
// https://adventofcode.com/2023/day/2/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2023 | Day 2 | Cube Conundrum'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

const maxColors = {
  red: 12,
  green: 13,
  blue: 14,
}

export const solutionOne = () => {
  return data.reduce((sum, line) => {
    const [label, hands] = line.split(': ')
    const gameId = parseInt(label.replace('Game ', ''))
    return (
      (hands.split('; ').reduce(
        (handIsValid, hand) =>
          handIsValid &&
          hand.split(', ').reduce((countIsValid, count) => {
            const [num, color] = count.split(' ')
            return countIsValid && parseInt(num) <= maxColors[color as keyof typeof maxColors]
          }, true),
        true,
      )
        ? gameId
        : 0) + sum
    )
  }, 0)
}

const colorIdx = {
  red: 0,
  green: 1,
  blue: 2,
}

export const solutionTwo = () => {
  return data.reduce((sum, line) => {
    const hands = line.split(': ')[1]
    return (
      hands
        .split('; ')
        .reduce(
          (handCounts, hand) => {
            hand.split(', ').forEach(count => {
              const [num, color] = count.split(' ')
              handCounts[colorIdx[color as keyof typeof colorIdx]] = Math.max(
                handCounts[colorIdx[color as keyof typeof colorIdx]],
                parseInt(num),
              )
            })
            return handCounts
          },
          [0, 0, 0],
        )
        .reduce((product, num) => product * num, 1) + sum
    )
  }, 0)
}
