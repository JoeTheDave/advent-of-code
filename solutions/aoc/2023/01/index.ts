// Advent of Code | 2023 | Day 1 | Trebuchet?!
// https://adventofcode.com/2023/day/1
// https://adventofcode.com/2023/day/1/input

import { testData1, testData2, puzzleData } from './data'

export const displayName = 'AOC | 2023 | Day 1 | Trebuchet?!'
export const complete = [true, true]

const useTestData = false

export const digitWords = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
}

export const convertWordsToDigits = (line: string) => {
  let result = line
  let continueCondition = true
  do {
    const wordIndex = Object.keys(digitWords)
      .map(digitWord => {
        const idx = result.indexOf(digitWord)
        return { word: digitWord, idx, dig: digitWords[digitWord as keyof typeof digitWords] }
      })
      .filter(word => word.idx !== -1)
      .sort((a, b) => (a.idx > b.idx ? 1 : -1))
    if (wordIndex.length === 0) {
      continueCondition = false
    } else {
      const firstWord = wordIndex[0]
      result = result.replace(firstWord.word, firstWord.dig)
    }
  } while (continueCondition)
  return result
}

export const solutionOne = () => {
  const data = useTestData ? testData1 : puzzleData
  return data
    .map(line => parseInt(line.match(/\d/)![0] + line.split('').reverse().join('').match(/\d/)![0]))
    .reduce((sum, num) => sum + num, 0)
}

export const solutionTwo = () => {
  const data = useTestData ? testData2 : puzzleData
  return data
    .map(line => convertWordsToDigits(line))
    .map(line => parseInt(line.match(/\d/)![0] + line.split('').reverse().join('').match(/\d/)![0]))
    .reduce((sum, num) => sum + num, 0)
}
