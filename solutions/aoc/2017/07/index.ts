// Advent of Code | 2017 | Day 7 | Recursive Circus
// https://adventofcode.com/2017/day/7
// https://adventofcode.com/2017/day/7/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2017 | Day 7 | Recursive Circus'
export const complete = [false, false]

const useTestData = false

const data = useTestData ? testData : puzzleData

interface Program {
  name: string
  weight: number
  supportedBy: Program | null
  supporting: Program[]
  supportingRefList: string[]
  totalWeight: number | null
}

export const generateProgramStack = () => {
  const programStack = data.map(programInfo => {
    const programDetails = programInfo.split(' ')
    const program: Program = {
      name: programDetails[0],
      weight: parseInt(programDetails[1].replace('(', '').replace(')', '')),
      supportedBy: null,
      supporting: [],
      supportingRefList: programInfo.includes('->') ? programInfo.split(' -> ')[1].split(', ') : [],
      totalWeight: null,
    }
    if (program.supportingRefList.length === 0) {
      program.totalWeight = program.weight
    }
    return program
  })
  programStack.forEach(program => {
    if (program.supportingRefList.length) {
      program.supportingRefList.forEach(supportedProgName => {
        const supportedProgram = programStack.find(prog => prog.name === supportedProgName)
        if (supportedProgram) {
          program.supporting.push(supportedProgram)
          supportedProgram.supportedBy = program
        }
      })
    }
  })
  return programStack
}

export const solutionOne = () => {
  const programStack = generateProgramStack()
  const baseProgram = programStack.find(prog => !prog.supportedBy)
  return baseProgram?.name
}

export const solutionTwo = () => {
  const programStack = generateProgramStack()

  let slatedForEval: Program[] = []
  let exitCondition = false
  do {
    if (slatedForEval.length === 0) {
      slatedForEval = programStack.filter(
        program => program.totalWeight === null && program.supporting.every(subProg => subProg.totalWeight !== null),
      )
    }
    if (slatedForEval.length === 0) {
      exitCondition = true
    } else {
      const evalTarget = slatedForEval.pop() as Program
      evalTarget.totalWeight = (evalTarget.weight +
        evalTarget.supporting.reduce((sum, prog) => sum + (prog?.totalWeight || 0), 0)) as number
    }
  } while (!exitCondition)

  const result = programStack.filter(prog => prog.supporting.length).map(prog => prog.supporting.length)
  console.log(result)

  // const baseProgram = programStack.find(prog => !prog.supportedBy)
  // console.log(`${baseProgram?.name} - ${baseProgram?.weight} - ${baseProgram?.totalWeight}`)
  // baseProgram?.supporting.forEach(prog => {
  //   console.log(`${prog?.name} - ${prog?.weight} - ${prog?.totalWeight}`)
  // })
}
