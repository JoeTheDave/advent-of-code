import _ from 'lodash'
import { existsSync, writeFileSync } from 'fs'
import { questions, FileData, writeSolutionPathMemoryFile } from './common'

const generateSolutionFile = (fileData: FileData) => {
  console.log(fileData)
  if (existsSync(fileData.modulePath)) {
    if (fileData.project === 'aoc') {
      console.log(`Solution Files for AoC ${fileData.year} - Day ${fileData.day} already exist...`)
    }
    if (fileData.project === 'euler') {
      console.log(`Solution Files for Project Euler Problem ${fileData.problem} already exist...`)
    }
    return null
  }
  const fileContent = `${
    fileData.project === 'aoc'
      ? `// Advent of Code | ${fileData.year} | Day ${fileData.day} | xxx Name xxx`
      : `// Project Euler | Problem ${fileData.problem} | xxx Name xxx`
  }
${
  fileData.project === 'aoc'
    ? `// https://adventofcode.com/${fileData.year}/day/${fileData.day}`
    : `// https://projecteuler.net/problem=${fileData.problem}`
}${
    fileData.project === 'aoc'
      ? `
// https://adventofcode.com/${fileData.year}/day/${fileData.day}/input`
      : ``
  }

${fileData.project === 'aoc' ? `import { testData, puzzleData } from './data'` : ''}

export const displayName = '${_.upperCase(fileData.project)} | ${
    fileData.project === 'aoc' ? `${fileData.year} | Day ${fileData.day} | xxx Name xxx` : ''
  }${fileData.project === 'euler' ? `Problem ${fileData.problem} | ` : ''}'
${
  fileData.project === 'aoc'
    ? `export const complete = [false, false]

const useTestData = true

const data = useTestData ? testData : puzzleData

export const solutionOne = () => {
  return null
}

export const solutionTwo = () => {
  return null
}

`
    : ''
}${
    fileData.project === 'euler'
      ? `export const complete = false

export const solution = () => {
  return null
}
`
      : ''
  }

`

  try {
    writeFileSync(fileData.modulePath, fileContent)
    writeSolutionPathMemoryFile(fileData.modulePath)
  } catch (e) {
    console.log('Unable to generate solution files.')
  }
}

const generateDataFile = (fileData: FileData) => {
  const fileContent = `export const testData = []

export const puzzleData = []
`
  try {
    writeFileSync(fileData.modulePath.replace('/index.ts', '/data.ts'), fileContent)
    writeSolutionPathMemoryFile(fileData.modulePath)
  } catch (e) {
    console.log('Unable to generate data file.')
  }
}

const createProjectFiles = async () => {
  const fileData = await questions()
  if (fileData) {
    generateSolutionFile(fileData)
    if (fileData.project === 'aoc') {
      generateDataFile(fileData)
    }
  } else {
    console.log('An unknown error occurred...')
  }
}
createProjectFiles()
