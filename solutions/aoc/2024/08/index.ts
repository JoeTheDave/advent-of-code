// Advent of Code | 2024 | Day 8 | Resonant Collinearity
// https://adventofcode.com/2024/day/8
// https://adventofcode.com/2024/day/8/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2024 | Day 8 | Resonant Collinearity'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

const compileAntennaData = (data: string[]) => {
  const antennas: { [key: string]: number[][] } = {}
  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      if (data[y][x] !== '.') {
        if (!antennas[data[y][x]]) {
          antennas[data[y][x]] = []
        }
        antennas[data[y][x]].push([x, y])
      }
    }
  }
  return antennas
}

export const solutionOne = () => {
  const antennas = compileAntennaData(data)

  const antinodes: { [key: string]: number } = {}
  Object.keys(antennas).forEach(key => {
    const series = antennas[key]
    for (let a = 0; a < series.length - 1; a++) {
      for (let b = a + 1; b < series.length; b++) {
        const locationA = series[a]
        const locationB = series[b]
        const run = locationB[0] - locationA[0]
        const rise = locationB[1] - locationA[1]

        const antiNode1 = [locationB[0] + run, locationB[1] + rise]
        if (antiNode1[0] >= 0 && antiNode1[0] < data[0].length && antiNode1[1] >= 0 && antiNode1[1] < data.length) {
          const antinode = antiNode1.join('|')
          antinodes[antinode] = (antinodes[antinode] || 0) + 1
        }

        const antiNode2 = [locationA[0] - run, locationA[1] - rise]
        if (antiNode2[0] >= 0 && antiNode2[0] < data[0].length && antiNode2[1] >= 0 && antiNode2[1] < data.length) {
          const antinode = antiNode2.join('|')
          antinodes[antinode] = (antinodes[antinode] || 0) + 1
        }
      }
    }
  })

  return Object.keys(antinodes).length
}

export const solutionTwo = () => {
  const antennas = compileAntennaData(data)
  const antinodes: { [key: string]: number } = {}
  Object.keys(antennas).forEach(key => {
    const series = antennas[key]
    for (let a = 0; a < series.length - 1; a++) {
      for (let b = a + 1; b < series.length; b++) {
        const locationA = series[a]
        const locationB = series[b]
        const run = locationB[0] - locationA[0]
        const rise = locationB[1] - locationA[1]

        let antinodePoint = [...locationB]
        while (
          antinodePoint[0] >= 0 &&
          antinodePoint[0] < data[0].length &&
          antinodePoint[1] >= 0 &&
          antinodePoint[1] < data.length
        ) {
          const antinode = antinodePoint.join('|')
          antinodes[antinode] = (antinodes[antinode] || 0) + 1
          antinodePoint = [antinodePoint[0] + run, antinodePoint[1] + rise]
        }
        antinodePoint = [...locationA]
        while (
          antinodePoint[0] >= 0 &&
          antinodePoint[0] < data[0].length &&
          antinodePoint[1] >= 0 &&
          antinodePoint[1] < data.length
        ) {
          const antinode = antinodePoint.join('|')
          antinodes[antinode] = (antinodes[antinode] || 0) + 1
          antinodePoint = [antinodePoint[0] - run, antinodePoint[1] - rise]
        }
      }
    }
  })
  return Object.keys(antinodes).length
}
