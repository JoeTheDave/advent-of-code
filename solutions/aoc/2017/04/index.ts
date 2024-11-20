// Advent of Code | 2017 | Day 4 | High-Entropy Passphrases
// https://adventofcode.com/2017/day/4
// https://adventofcode.com/2017/day/4/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2017 | Day 4 | High-Entropy Passphrases'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

export const solutionOne = () => {
  const evalPasscode = (passcode: string) => {
    const words = passcode.split(' ')
    const dictionary: { [key: string]: number } = {}
    let valid = true
    for (let i = 0; i < words.length; i++) {
      if (dictionary[words[i]] === 1) {
        valid = false
        break
      }
      dictionary[words[i]] = 1
    }
    return valid
  }
  return data.map(passcode => evalPasscode(passcode)).filter(_ => _).length
}

export const solutionTwo = () => {
  const evalPasscode = (passcode: string) => {
    const words = passcode.split(' ').map(word => word.split('').sort().join(''))
    const dictionary: { [key: string]: number } = {}
    let valid = true
    for (let i = 0; i < words.length; i++) {
      if (dictionary[words[i]] === 1) {
        valid = false
        break
      }
      dictionary[words[i]] = 1
    }
    return valid
  }
  return data.map(passcode => evalPasscode(passcode)).filter(_ => _).length
}
