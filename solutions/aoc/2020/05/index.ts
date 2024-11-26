// Advent of Code | 2020 | Day 5 | Binary Boarding
// https://adventofcode.com/2020/day/5
// https://adventofcode.com/2020/day/5/input

import { range } from 'lodash'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2020 | Day 5 | Binary Boarding'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

const findSeatId = (boardingPass: string) => {
  const rowSearch = boardingPass.substring(0, 7).split('')
  const colSearch = boardingPass.substring(7).split('')

  let rows = range(128)
  rowSearch.forEach(step => (rows = step === 'F' ? rows.slice(0, rows.length / 2) : rows.slice((rows.length / 2) * -1)))
  let cols = range(8)
  colSearch.forEach(step => (cols = step === 'L' ? cols.slice(0, cols.length / 2) : cols.slice((cols.length / 2) * -1)))
  return rows[0] * 8 + cols[0]
}

export const solutionOne = () => {
  return Math.max(...data.map(boardingPass => findSeatId(boardingPass)))
}

export const solutionTwo = () => {
  let seats = range(188 * 8)
  data.forEach(boardingPass => {
    const seatId = findSeatId(boardingPass)
    seats = seats.filter(seat => seat != seatId)
  })
  return seats.filter((seatId, idx) => seats[idx - 1] !== seatId - 1)[1]
}
