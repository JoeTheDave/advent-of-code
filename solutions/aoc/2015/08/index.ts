// Advent of Code | 2015 | Day 8 | Matchsticks
// https://adventofcode.com/2015/day/8
// https://adventofcode.com/2015/day/8/input

import fs from 'fs'

export const displayName = 'AOC | 2015 | Day 8 | Matchsticks '
export const complete = [true, true]

const useTestData = false

const data = fs.readFileSync(`${__dirname}/${useTestData ? 'test' : ''}data.txt`, 'utf8').split('\n')

const parseString1 = (dataRow: string) => {
  dataRow = dataRow.slice(1, -1)
  while (dataRow.includes('\\\\')) {
    dataRow = dataRow.replace('\\\\', '|')
  }
  while (dataRow.includes('\\"')) {
    dataRow = dataRow.replace('\\"', '"')
  }
  return dataRow.replace(/\\x([0-9A-Fa-f]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
}

const parseString2 = (dataRow: string) => {
  let parseString = ''
  for (let i = 0; i < dataRow.length; i++) {
    if (dataRow[i] === '"') {
      parseString += '\\"'
    } else if (dataRow[i] === '\\') {
      parseString += '\\\\'
    } else {
      parseString += dataRow[i]
    }
  }
  return `"${parseString}"`
}

export const solutionOne = () => {
  // data.forEach(dataRow => {
  //   console.log(dataRow, dataRow.length)
  //   const parsed = parseString1(dataRow)
  //   console.log(parsed, parsed.length)
  //   console.log('-----------------------------')
  // })
  return data.reduce((sum, str) => sum + str.length, 0) - data.reduce((sum, str) => sum + parseString1(str).length, 0)
}

export const solutionTwo = () => {
  // data.forEach(dataRow => {
  //   console.log(dataRow, dataRow.length)
  //   const parsed = parseString2(dataRow)
  //   console.log(parsed, parsed.length)
  //   console.log('-----------------------------')
  // })
  return data.reduce((sum, str) => sum + parseString2(str).length, 0) - data.reduce((sum, str) => sum + str.length, 0)
}
