// https://adventofcode.com/2022/day/5
// https://adventofcode.com/2022/day/5/input

import { puzzleData, testData } from './data'

const part1 = (data: string[]) => {
  const dataSeparator = data.indexOf('')
  const stacks = composeStacks(data)
  for (let i = dataSeparator + 1; i < data.length; i++) {
    const manuever = data[i]
      .replace('move ', '')
      .replace('from ', '')
      .replace('to ', '')
      .split(' ')
      .map(_ => parseInt(_))
    for (let n = 1; n <= manuever[0]; n++) {
      const block = stacks[manuever[1] - 1].pop() as string
      stacks[manuever[2] - 1].push(block)
    }
  }
  return stacks.map(s => s[s.length - 1]).join('')
}

const part2 = (data: string[]) => {
  const dataSeparator = data.indexOf('')
  const stacks = composeStacks(data)
  for (let i = dataSeparator + 1; i < data.length; i++) {
    const manuever = data[i]
      .replace('move ', '')
      .replace('from ', '')
      .replace('to ', '')
      .split(' ')
      .map(_ => parseInt(_))

    let selection = stacks[manuever[1] - 1].splice(
      stacks[manuever[1] - 1].length - manuever[0],
      manuever[0],
    )
    stacks[manuever[2] - 1].push(...selection)
  }
  return stacks.map(s => s[s.length - 1]).join('')
}

export const solutionData = {
  puzzleData,
  testData,
}

const composeStacks = (data: string[]) => {
  const dataSeparator = data.indexOf('')
  const stacks: string[][] = data[dataSeparator - 2].split(' ').map(_ => [])

  for (let i = dataSeparator - 2; i >= 0; i--) {
    for (let s = 0; s < stacks.length; s++) {
      if (data[i].slice(s * 4 + 1, s * 4 + 2) !== ' ') {
        stacks[s].push(data[i].slice(s * 4 + 1, s * 4 + 2))
      }
    }
  }
  return stacks
}

export const supplyStacks = () => {
  const useTestData = false
  const data = useTestData ? testData : puzzleData

  return [part1(data), part2(data)]
}

// Other exports should go below
