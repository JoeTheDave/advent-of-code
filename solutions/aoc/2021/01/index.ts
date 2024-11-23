// Advent of Code | 2021 | Day 1 | Sonar Sweep
// https://adventofcode.com/2021/day/1
// https://adventofcode.com/2021/day/1/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2021 | Day 1 | Sonar Sweep'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

export const solutionOne = () => {
  let increasedMeasurements = 0
  data.forEach((measurement, idx) => {
    if (idx > 0 && measurement > data[idx - 1]) {
      increasedMeasurements++
    }
  })
  return increasedMeasurements

  // let increasedMeasurements = 0
  // for (let i = 1; i < data.length; i++) {
  //   if (data[i] > data[i - 1]) {
  //     increasedMeasurements++
  //   }
  // }
  // return increasedMeasurements
}

export const solutionTwo = () => {
  let increasedMeasurements = 0
  data.forEach((_, idx) => {
    if (
      idx > 0 &&
      data.slice(idx, idx + 3).reduce((sum, val) => sum + val) >
        data.slice(idx - 1, idx + 2).reduce((sum, val) => sum + val) &&
      data.slice(idx, idx + 3).length === 3
    ) {
      increasedMeasurements++
    }
  })
  return increasedMeasurements

  // let increasedMeasurements = 0
  // for (let i = 3; i < data.length; i++) {
  //   const groupA = data[i - 3] + data[i - 2] + data[i - 1]
  //   const groupB = data[i - 2] + data[i - 1] + data[i]
  //   if (groupB > groupA) {
  //     increasedMeasurements++
  //   }
  // }
  // return increasedMeasurements
}
