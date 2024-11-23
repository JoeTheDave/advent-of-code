// Advent of Code | 2021 | Day 4 | Giant Squid
// https://adventofcode.com/2021/day/4
// https://adventofcode.com/2021/day/4/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2021 | Day 4 | Giant Squid'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

export const checkForWinningBoard = (board: { num: number; active: boolean }[][]) => {
  let isWinner = false
  if (board.some(row => row.every(c => c.active))) {
    isWinner = true
  }
  for (let i = 0; i < board[0].length; i++) {
    if (board.every(row => row[i].active)) {
      isWinner = true
    }
  }
  return isWinner
}

export const calculateBoardScore = (board: { num: number; active: boolean }[][], lastCalledNumber: number) => {
  let sum = 0
  for (let i = 0; i < board.length; i++) {
    sum += board[i].filter(row => !row.active).reduce((rowSum, cell) => rowSum + cell.num, 0)
  }
  return sum * lastCalledNumber
}

export const createBoardsData = (data: string[]) => {
  const boards: { num: number; active: boolean }[][][] = []
  for (let i = 2; i < data.length; i += 6) {
    boards.push(
      data.slice(i, i + 5).map(r =>
        r
          .trim()
          .split('  ')
          .join(' ')
          .split(' ')
          .map(n => ({ num: parseInt(n), active: false })),
      ),
    )
  }
  return boards
}

export const solutionOne = () => {
  const numbers = data[0].split(',').map(n => parseInt(n))
  let boards = createBoardsData(data)
  let winningBoard: number | null = null
  let lastCalledNum = 0
  for (let n = 0; n < numbers.length; n++) {
    // Loop through each board setting the number active
    for (let b = 0; b < boards.length; b++) {
      for (let row = 0; row < boards[b].length; row++) {
        for (let col = 0; col < boards[b][row].length; col++) {
          if (boards[b][row][col].num === numbers[n]) {
            boards[b][row][col].active = true
          }
        }
      }
    }
    // Check each board for complete status
    for (let b = 0; b < boards.length; b++) {
      if (checkForWinningBoard(boards[b])) {
        winningBoard = b
        lastCalledNum = numbers[n]
      }
    }
    if (winningBoard) {
      break
    }
  }
  return calculateBoardScore(boards[winningBoard as number], lastCalledNum)
}

export const solutionTwo = () => {
  const numbers = data[0].split(',').map(n => parseInt(n))
  let boards = createBoardsData(data)
  let lastWinningBoard: number | null = null
  let lastCalledNum = 0
  for (let n = 0; n < numbers.length; n++) {
    // Loop through each board setting the number active
    for (let b = 0; b < boards.length; b++) {
      for (let row = 0; row < boards[b].length; row++) {
        for (let col = 0; col < boards[b][row].length; col++) {
          if (boards[b][row][col].num === numbers[n]) {
            boards[b][row][col].active = true
          }
        }
      }
    }
    const nonWinners = boards
      .map((board, idx) => ({ board, idx }))
      .filter(b => !checkForWinningBoard(b.board))
      .map(b => b.idx)

    if (nonWinners.length === 1) {
      lastWinningBoard = nonWinners[0]
    }
    if (nonWinners.length === 0) {
      lastCalledNum = numbers[n]
      break
    }
  }
  return calculateBoardScore(boards[lastWinningBoard as number], lastCalledNum)
}
