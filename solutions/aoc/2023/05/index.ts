// Advent of Code | 2023 | Day 5 | If You Give A Seed A Fertilizer
// https://adventofcode.com/2023/day/5
// https://adventofcode.com/2023/day/5/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2023 | Day 5 | If You Give A Seed A Fertilizer'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

const generateTransitionMapper = (label: string) => {
  const labelIndex = data.indexOf(label) + 1
  const breakIndex = data.indexOf('', labelIndex)
  return data
    .slice(labelIndex, breakIndex === -1 ? data.length : breakIndex)
    .map(i => i.match(/\d+/g)!.map(num => parseInt(num)))
}

const generateDataStructure = () => {
  const seeds = data[0]
    .split(': ')[1]
    .match(/\d+/g)!
    .map(num => parseInt(num))

  const transitionMappers = [
    'seed-to-soil map:',
    'soil-to-fertilizer map:',
    'fertilizer-to-water map:',
    'water-to-light map:',
    'light-to-temperature map:',
    'temperature-to-humidity map:',
    'humidity-to-location map:',
  ].map(label => generateTransitionMapper(label))
  return { seeds, transitionMappers }
}

const crossRangeAnalysis = (target: number[], test: number[]) => {
  const [targetStart, targetRange] = target
  const [testStart, testRange] = test
  const targetEnd = targetStart + targetRange - 1
  const testEnd = testStart + testRange - 1
  const inRange: number[][] = []
  const outRange: number[][] = []

  if (testEnd < targetStart || testStart > targetEnd) {
    outRange.push([testStart, testEnd - testStart + 1])
  } else if (testStart >= targetStart && testEnd <= targetEnd) {
    inRange.push([testStart, testEnd - testStart + 1])
  } else if (testStart < targetStart && testEnd <= targetEnd) {
    outRange.push([testStart, targetStart - testStart])
    inRange.push([targetStart, testEnd - targetStart + 1])
  } else if (testStart >= targetStart && testEnd > targetEnd) {
    inRange.push([testStart, targetEnd - testStart + 1])
    outRange.push([targetEnd + 1, testEnd - targetEnd])
  } else if (testStart < targetStart && testEnd > targetEnd) {
    outRange.push([testStart, targetStart - testStart])
    inRange.push(target)
    outRange.push([targetEnd + 1, testEnd - targetEnd])
  }

  return { inRange, outRange }
}

export const solutionOne = () => {
  const { seeds, transitionMappers } = generateDataStructure()
  return Math.min(
    ...seeds.map(seed => {
      let value = seed
      transitionMappers.forEach(transitionMapper => {
        let transitionValue = value
        for (let transitionLine = 0; transitionLine < transitionMapper.length; transitionLine++) {
          const [destination, source, range] = transitionMapper[transitionLine]
          if (value >= source && value < source + range) {
            transitionValue = value - source + destination
            break
          }
        }
        value = transitionValue
      })
      return value
    }),
  )
}

export const solutionTwo = () => {
  const { seeds, transitionMappers } = generateDataStructure()
  let testRanges: number[][] = []
  for (let startSeed = 0; startSeed < seeds.length; startSeed += 2) {
    testRanges.push([seeds[startSeed], seeds[startSeed + 1]])
  }
  transitionMappers.forEach(transitionMapper => {
    const testRangesForNextMapper = []
    for (let transitionLine = 0; transitionLine < transitionMapper.length; transitionLine++) {
      const leftOvers: number[][] = []
      const [destination, source, range] = transitionMapper[transitionLine]
      const targetRange = [source, range]
      testRanges.forEach(testRange => {
        const { inRange, outRange } = crossRangeAnalysis(targetRange, testRange)
        leftOvers.push(...outRange)
        if (inRange.length) {
          testRangesForNextMapper.push([inRange[0][0] - source + destination, inRange[0][1]])
        }
      })
      testRanges = leftOvers
    }
    testRangesForNextMapper.push(...testRanges)
    testRanges = testRangesForNextMapper
  })
  return Math.min(...testRanges.map(range => range[0]))
}
