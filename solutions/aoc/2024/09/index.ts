// Advent of Code | 2024 | Day 9 | Disk Fragmenter
// https://adventofcode.com/2024/day/9
// https://adventofcode.com/2024/day/9/input

import { findIndex, findLastIndex, fill } from 'lodash'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2024 | Day 9 | Disk Fragmenter'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

export const solutionOne = () => {
  const memoryBlock: (number | null)[] = []
  data.split('').map((digit, idx) => {
    const count = parseInt(digit)
    for (let i = 0; i < count; i++) {
      memoryBlock.push(idx % 2 === 0 ? idx / 2 : null)
    }
  })
  do {
    let firstSpaceIdx = memoryBlock.indexOf(null)
    const lastNumberIdx = findLastIndex(memoryBlock, a => a !== null)
    memoryBlock[firstSpaceIdx] = memoryBlock[lastNumberIdx]
    memoryBlock[lastNumberIdx] = null
  } while (memoryBlock.indexOf(null) < findLastIndex(memoryBlock, a => a !== null))
  return memoryBlock.map((val, idx) => parseInt(`${val || 0}`) * idx).reduce((sum, num) => sum + num, 0)
}

export const solutionTwo = () => {
  type MemoryBlock = { count: number; id: number | null }
  const memoryBlocks: MemoryBlock[] = data
    .split('')
    .map((digit, idx) => ({ count: parseInt(digit), id: idx % 2 === 0 ? idx / 2 : null }))
  const highestMemoryBlockId = Math.max(...memoryBlocks.filter(mb => mb.id !== null).map(mb => mb.id as number))
  for (let id = highestMemoryBlockId; id >= 0; id--) {
    const fileMemoryBlock = memoryBlocks.find(mb => mb.id === id) as MemoryBlock
    const fileMemoryBlockIdx = memoryBlocks.indexOf(fileMemoryBlock)
    const emptyMemoryBlockIdx = findIndex(memoryBlocks, mb => mb.id === null && mb.count >= fileMemoryBlock.count)
    if (emptyMemoryBlockIdx > -1 && emptyMemoryBlockIdx < fileMemoryBlockIdx) {
      const emptyMemoryBlock = memoryBlocks[emptyMemoryBlockIdx]
      fileMemoryBlock.id = null
      emptyMemoryBlock.id = id
      const targetCount = emptyMemoryBlock.count
      emptyMemoryBlock.count = fileMemoryBlock.count
      memoryBlocks.splice(emptyMemoryBlockIdx + 1, 0, {
        id: null,
        count: targetCount - fileMemoryBlock.count,
      })
    }
  }
  let sum = 0
  let idx = 0
  memoryBlocks.forEach((memoryBlock, blockIdx) => {
    for (let i = 0; i < memoryBlock.count; i++) {
      sum += idx * (memoryBlock.id || 0)
      idx++
    }
  })
  return sum
}
