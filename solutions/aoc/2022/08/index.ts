// Advent of Code | 2022 | Day 8 | Treetop Tree House
// https://adventofcode.com/2022/day/8
// https://adventofcode.com/2022/day/8/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2022 | Day 8 | Treetop Tree House'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

const constructTreeData = (data: string[]) =>
  data.map(row => row.split('').map(tree => ({ height: parseInt(tree), visible: false })))

export const solutionOne = () => {
  const trees = constructTreeData(data)

  for (let r = 0; r < trees.length; r++) {
    let tallestLeft = -1
    let tallestRight = -1

    for (let t = 0; t < trees[r].length; t++) {
      if (trees[r][t].height > tallestLeft) {
        tallestLeft = trees[r][t].height
        trees[r][t].visible = true
      }
      let rightIdx = trees[r].length - 1 - t
      if (trees[r][rightIdx].height > tallestRight) {
        tallestRight = trees[r][rightIdx].height
        trees[r][rightIdx].visible = true
      }
    }
  }
  for (let c = 0; c < trees[0].length; c++) {
    let tallestTop = -1
    let tallestBottom = -1

    for (let t = 0; t < trees.length; t++) {
      if (trees[t][c].height > tallestTop) {
        tallestTop = trees[t][c].height
        trees[t][c].visible = true
      }

      let bottomIdx = trees[t].length - 1 - t
      if (trees[bottomIdx][c].height > tallestBottom) {
        tallestBottom = trees[bottomIdx][c].height
        trees[bottomIdx][c].visible = true
      }
    }
  }

  return trees.reduce((sum, row) => sum + row.reduce((sum, tree) => sum + (tree.visible ? 1 : 0), 0), 0)
}

export const solutionTwo = () => {
  const trees = constructTreeData(data)

  let highestScenicScore = -1
  for (let y = 0; y < trees.length; y++) {
    for (let x = 0; x < trees[y].length; x++) {
      let top = 0
      for (let t = 1; true; t++) {
        if (y - t === -1) {
          break
        }
        if (trees[y][x].height <= trees[y - t][x].height) {
          top++
          break
        } else {
          top++
        }
      }

      let bottom = 0
      for (let t = 1; true; t++) {
        if (y + t > trees.length - 1) {
          break
        }
        if (trees[y][x].height <= trees[y + t][x].height) {
          bottom++
          break
        } else {
          bottom++
        }
      }

      let left = 0
      for (let t = 1; true; t++) {
        if (x - t === -1) {
          break
        }
        if (trees[y][x].height <= trees[y][x - t].height) {
          left++
          break
        } else {
          left++
        }
      }

      let right = 0
      for (let t = 1; true; t++) {
        if (x + t > trees[0].length - 1) {
          break
        }
        if (trees[y][x].height <= trees[y][x + t].height) {
          right++
          break
        } else {
          right++
        }
      }

      highestScenicScore = Math.max(highestScenicScore, top * right * bottom * left)
    }
  }
  return highestScenicScore
}
