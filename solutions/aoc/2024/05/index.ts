// Advent of Code | 2024 | Day 5 | Print Queue
// https://adventofcode.com/2024/day/5
// https://adventofcode.com/2024/day/5/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2024 | Day 5 | Print Queue'
export const complete = [true, true]

const useTestData = false

const rawData = useTestData ? testData : puzzleData

const prepareData = (rawData: string[]) => {
  const rules: number[][] = []
  const updates: number[][] = []
  let dataType = 0
  rawData.forEach(dataRow => {
    if (dataRow === '') {
      dataType = 1
    } else {
      if (dataType === 0) {
        rules.push(dataRow.split('|').map(n => parseInt(n)))
      } else {
        updates.push(dataRow.split(',').map(n => parseInt(n)))
      }
    }
  })
  return { rules, updates }
}

const isRuleValidForUpdate = (update: number[], rule: number[]) =>
  update.indexOf(rule[0]) === -1 || update.indexOf(rule[1]) === -1 || update.indexOf(rule[0]) < update.indexOf(rule[1])

const isValidUpdate = (update: number[], rules: number[][]) => rules.every(rule => isRuleValidForUpdate(update, rule))

export const solutionOne = () => {
  const { rules, updates } = prepareData(rawData)
  return updates
    .filter(update => isValidUpdate(update, rules))
    .map(update => update[Math.floor(update.length / 2)])
    .reduce((sum, num) => sum + num, 0)
}

export const solutionTwo = () => {
  const { rules, updates } = prepareData(rawData)
  const invalidUpdates = updates.filter(update => !isValidUpdate(update, rules))
  const validUpdates = invalidUpdates.map(update => {
    while (!isValidUpdate(update, rules)) {
      const invalidRule = rules.find(rule => !isRuleValidForUpdate(update, rule)) as number[]
      const rule1Idx = update.indexOf(invalidRule[0])
      const rule2Idx = update.indexOf(invalidRule[1])
      update[rule1Idx] = invalidRule[1]
      update[rule2Idx] = invalidRule[0]
    }
    return update
  })
  return validUpdates.map(update => update[Math.floor(update.length / 2)]).reduce((sum, num) => sum + num, 0)
}
