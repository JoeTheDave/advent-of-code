// Advent of Code | 2020 | Day 2 | Password Philosophy
// https://adventofcode.com/2020/day/2
// https://adventofcode.com/2020/day/2/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2020 | Day 2 | Password Philosophy'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

export const solutionOne = () => {
  return data.reduce((validCount, dataRow) => {
    const [policy, password] = dataRow.split(': ')
    const [counts, character] = policy.split(' ')
    const [min, max] = counts.split('-').map(n => parseInt(n))
    const characterCount = password.split('').filter(char => char === character).length
    return validCount + (characterCount >= min && characterCount <= max ? 1 : 0)
  }, 0)
}

export const solutionTwo = () => {
  return data.reduce((validCount, dataRow) => {
    const [policy, password] = dataRow.split(': ')
    const [positions, character] = policy.split(' ')
    const [pos1, pos2] = positions.split('-').map(n => parseInt(n) - 1)
    const charList = password.split('')
    return validCount + ((charList[pos1] === character) !== (charList[pos2] === character) ? 1 : 0)
  }, 0)
}
