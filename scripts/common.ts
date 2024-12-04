import prompts from 'prompts'
import _ from 'lodash'
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs'

export interface AocFileData {
  project: 'aoc'
  modulePath: string
  year: number
  day: number
}

export interface EulerFileData {
  project: 'euler'
  modulePath: string
  problem: number
}

export type FileData = AocFileData | EulerFileData

export const solutionDirectoryPath = `${__dirname}/../solutions`

export const solutionPathMemoryFile = `${__dirname}/.recent-exec`

export const generateSolutionDirectoryPath = (fileData: FileData) => {
  if (!existsSync(solutionDirectoryPath)) {
    mkdirSync(solutionDirectoryPath)
  }

  const projectDirectoryPath = `${solutionDirectoryPath}/${fileData.project}`
  if (!existsSync(projectDirectoryPath)) {
    mkdirSync(projectDirectoryPath)
  }

  if (fileData.project === 'aoc') {
    const aocYearDirectoryPath = `${projectDirectoryPath}/${fileData.year}`
    if (!existsSync(aocYearDirectoryPath)) {
      mkdirSync(aocYearDirectoryPath)
    }

    const aocDayDirectoryPath = `${aocYearDirectoryPath}/${_.padStart(`${fileData.day}`, 2, '0')}`
    if (!existsSync(aocDayDirectoryPath)) {
      mkdirSync(aocDayDirectoryPath)
    }
    fileData.modulePath = `${aocDayDirectoryPath}/index.ts`
  }
  if (fileData.project === 'euler') {
    const eulerProblemDirectoryPath = `${projectDirectoryPath}/${_.padStart(`${fileData.problem}`, 3, '0')}`
    if (!existsSync(eulerProblemDirectoryPath)) {
      mkdirSync(eulerProblemDirectoryPath)
    }
    fileData.modulePath = `${eulerProblemDirectoryPath}/index.ts`
  }
  return fileData
}

export const writeSolutionPathMemoryFile = (path: string) => {
  writeFileSync(solutionPathMemoryFile, path)
}

export const readSolutionPathMemoryFile = () => {
  if (existsSync(solutionPathMemoryFile)) {
    return readFileSync(solutionPathMemoryFile, 'utf8')
  }
  return ''
}

const askProjectType = async () => {
  const response = await prompts([
    {
      type: 'select',
      name: 'project',
      message: 'Which Project',
      choices: [
        { title: 'AoC', value: 'aoc' },
        { title: 'Euler', value: 'euler' },
      ],
    },
  ])
  return response.project
}

const askAocDate = async () => {
  const earliestYear = 2015
  const yearChoices = _.range(new Date().getFullYear(), earliestYear - 1).map(year => ({
    title: `${year}`,
    value: `${year}`,
  }))
  const lastDay = 25
  const dayChoices = _.range(1, lastDay + 1).map(day => ({
    title: `${day}`,
    value: `${day}`,
  }))

  const response = await prompts([
    {
      type: 'select',
      name: 'year',
      message: 'Year',
      choices: yearChoices,
    },
    {
      type: 'select',
      name: 'day',
      message: 'Day',
      choices: dayChoices,
    },
  ])
  return response
}

const askEulerNumber = async () => {
  const response = await prompts([
    {
      type: 'text',
      name: 'problem',
      message: 'Problem Number',
    },
  ])
  return response.problem
}

export const questions = async (): Promise<FileData | null> => {
  const project = await askProjectType()
  if (project === 'aoc') {
    const { year, day } = await askAocDate()
    return generateSolutionDirectoryPath({
      project,
      modulePath: '',
      year,
      day,
    })
  }
  if (project === 'euler') {
    const problem = parseInt(await askEulerNumber())
    return generateSolutionDirectoryPath({
      project,
      modulePath: '',
      problem,
    })
  }
  return null
}
