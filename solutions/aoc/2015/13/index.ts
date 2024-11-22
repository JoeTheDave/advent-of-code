// Advent of Code | 2015 | Day 13 | Knights of the Dinner Table
// https://adventofcode.com/2015/day/13
// https://adventofcode.com/2015/day/13/input

import { getPermutations } from '@/lib/sequence'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2015 | Day 13 | Knights of the Dinner Table'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

type HappinessMatrix = { [key: string]: { [key: string]: number } }

const generateHappinessMatrix = (data: string[]) => {
  const people: HappinessMatrix = {}
  data
    .map(fact =>
      fact
        .replace('gain ', '')
        .replace('lose ', '-')
        .replace('.', '')
        .replace('happiness units by sitting next to', 'would')
        .split(' would '),
    )
    .forEach(fact => {
      const [person, delta, relation] = fact
      if (!people[person]) {
        people[person] = {}
      }
      people[person][relation] = parseInt(delta)
    })
  return people
}

const determineOptimalHappiness = (matrix: HappinessMatrix) => {
  const people = Object.keys(matrix)
  const permutations: string[][] = getPermutations(people, people.length)
  const permutationOutcomes = permutations.map(permutation => {
    return permutation
      .map((person, i) => {
        const left = permutation[i === 0 ? permutation.length - 1 : i - 1]
        const right = permutation[i === permutation.length - 1 ? 0 : i + 1]
        return matrix[person][left] + matrix[person][right]
      })
      .reduce((sum, val) => sum + val, 0)
  })
  return permutationOutcomes.reduce((max, val) => Math.max(max, val), 0)
}

const injectSelf = (matrix: HappinessMatrix) => {
  matrix['me'] = {}
  Object.keys(matrix).forEach(key => {
    matrix[key]['me'] = 0
    matrix['me'][key] = 0
  })
  return matrix
}

export const solutionOne = () => {
  const matrix = generateHappinessMatrix(data)
  return determineOptimalHappiness(matrix)
}

export const solutionTwo = () => {
  const matrix = injectSelf(generateHappinessMatrix(data))
  return determineOptimalHappiness(matrix)
}
