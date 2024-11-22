// Advent of Code | 2015 | Day 19 | Medicine for Rudolph
// https://adventofcode.com/2015/day/19
// https://adventofcode.com/2015/day/19/input

import { uniq, flatten, difference } from 'lodash'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2015 | Day 19 | Medicine for Rudolph'
export const complete = [true, false]

const useTestData = false

const data = useTestData ? testData : puzzleData

class Transform {
  start: string
  end: string[]

  constructor(instruction: string) {
    const [start, end] = instruction.split(' => ')
    this.start = start
    this.end = end.split(/(?=[A-Z])/)
  }
}

interface MolecularPath {
  matchAtoms: string[]
  transientAtoms: string[]
  steps: number
}

export const solutionOne = () => {
  const transforms = data.slice(0, data.length - 2)
  const molecule = data.slice(-1)[0]
  const calibration: { [key: string]: boolean } = {}

  transforms.forEach(transform => {
    const [marker, replacement] = transform.split(' => ')
    const molecularSegments = molecule.split(marker)

    for (let i = 0; i < molecularSegments.length - 1; i++) {
      const calibrationKey = [
        ...molecularSegments.slice(0, molecularSegments.length - 1).map((segment, idx) => {
          return `${segment}${i === idx ? replacement : marker}`
        }),
        molecularSegments.slice(-1)[0],
      ].join('')
      calibration[calibrationKey] = true
    }
  })
  return Object.keys(calibration).length
}

export const solutionTwo = () => {
  const transforms = data.slice(0, data.length - 2).map(instruction => new Transform(instruction))
  let targetMolecule = data.slice(-1)[0]
  const targetMoleculeChain = targetMolecule.split(/(?=[A-Z])/)
  const molecularPaths: { [key: string]: MolecularPath } = {
    e: {
      matchAtoms: [],
      transientAtoms: ['e'],
      steps: 0,
    },
  }

  const errorTransients = difference(uniq(flatten(transforms.map(t => t.end))), uniq(transforms.map(t => t.start)))
  let prominentPathKey: string | null = 'e'

  const transitionTransientAtoms = (molecule: MolecularPath) => {
    const atoms = [...molecule.matchAtoms, ...molecule.transientAtoms]
    let chainBroken = false
    molecule.matchAtoms = []
    molecule.transientAtoms = []
    atoms.forEach((atom, i) => {
      if (atom === targetMoleculeChain[i] && !chainBroken) {
        molecule.matchAtoms.push(atom)
      } else {
        molecule.transientAtoms.push(atom)
        chainBroken = true
      }
    })
  }

  const determineNextProminentPath = (molecularPaths: MolecularPath[]) => {
    if (molecularPaths.length === 0) {
      return null
    }
    const molecule = molecularPaths.reduce((bestPath, molecularPath) => {
      if (molecularPath.matchAtoms.length > bestPath.matchAtoms.length) {
        return molecularPath
      } else if (
        molecularPath.matchAtoms.length === bestPath.matchAtoms.length &&
        molecularPath.steps > bestPath.steps
      ) {
        return molecularPath
      }
      return bestPath
    }, molecularPaths[0])

    return `${molecule.matchAtoms.join('')}${molecule.transientAtoms.join('')}`
  }

  let processCycles = 0
  do {
    if (!prominentPathKey) {
      prominentPathKey = determineNextProminentPath(
        Object.keys(molecularPaths).map(key => molecularPaths[key]),
      ) as string
    }
    console.log(prominentPathKey)
    let prominentPath = molecularPaths[prominentPathKey]
    delete molecularPaths[prominentPathKey]
    const newMolecularPaths: MolecularPath[] = []

    try {
      prominentPath.transientAtoms.forEach((atom, idx) => {
        if (idx < 1) {
          transforms
            .filter(transform => transform.start === atom)
            .forEach(transform => {
              const transientAtoms = [...prominentPath.transientAtoms]
              transientAtoms.splice(idx, 1, ...transform.end)
              const molecule: MolecularPath = {
                matchAtoms: prominentPath.matchAtoms,
                transientAtoms,
                steps: prominentPath.steps + 1,
              }
              transitionTransientAtoms(molecule)

              const hasNoErroneousTransients = molecule.transientAtoms.reduce(
                (valid, atom) => valid && !errorTransients.includes(atom),
                true,
              )
              if (hasNoErroneousTransients && molecule.transientAtoms.length < 9 && molecule.steps < 200) {
                const molecularKey = `${molecule.matchAtoms.join('')}${molecule.transientAtoms.join('')}`
                if (
                  !molecularPaths[molecularKey] ||
                  (molecularPaths[molecularKey] && molecule.steps < molecularPaths[molecularKey].steps)
                ) {
                  molecularPaths[molecularKey] = molecule
                  newMolecularPaths.push(molecule)
                }
              }
            })
        }
      })
    } catch {
      console.log(prominentPathKey)
      console.log(prominentPath)
      console.log(errorTransients)
      throw 'Stop'
    }

    prominentPathKey = determineNextProminentPath(newMolecularPaths)
    processCycles++
  } while (processCycles < 1000000)

  // console.log(molecularPaths)

  return null
}
