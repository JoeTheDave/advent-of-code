// https://adventofcode.com/2015/day/9
// https://adventofcode.com/2015/day/9/input

import { flatten } from 'lodash'

import { puzzleData, testData } from './data'

class LocationMapper {
  locations: string[]
  distanceLookup: { [key: string]: number }
  pathPermutations: string[][]

  constructor(data: string[]) {
    this.locations = []
    this.distanceLookup = {}

    data.forEach(row => {
      const [cities, distance] = row.split(' = ')
      const [cityOne, cityTwo] = cities.split(' to ')
      const numericDistance = parseInt(distance)
      this.recordData(cityOne, cityTwo, numericDistance)
      this.recordData(cityTwo, cityOne, numericDistance)
    })

    this.pathPermutations = this.permutateCities()
  }

  addCity = (city: string) => {
    if (!this.locations.includes(city)) {
      this.locations.push(city)
    }
  }

  recordData = (source: string, destination: string, distance: number) => {
    this.addCity(source)
    this.addCity(destination)
    this.distanceLookup[`${source}|${destination}`] = distance
  }

  permutateCities = () => {
    const permutate = (arr: string[]): string[][] => {
      if (arr.length === 1) {
        return [arr]
      } else {
        return arr.map((location: string) => {
          return permutate(arr.filter(l => l !== location)).reduce(
            (list, paths) => {
              paths.forEach(path => {
                list.push(
                  typeof path === 'string'
                    ? [location, path]
                    : [location, ...path],
                )
              })
              return list
            },
            [] as string[][],
          )
        }) as any as string[][]
      }
    }

    // TODO: there is something wrong with the typings of this function, but it works
    return flatten(permutate(this.locations)) as unknown as string[][]
  }

  determinePathDistances = () => {
    return this.pathPermutations.map(path => {
      const start = path.shift() as string
      return path.reduce(
        (progress, location) => {
          const dist = this.distanceLookup[`${progress.location}|${location}`]
          return {
            dist: progress.dist + dist,
            location,
          }
        },
        { dist: 0, location: start },
      ).dist
    })
  }
}

const allInASingleNight = () => {
  const useTestData = false
  const data = useTestData ? testData : puzzleData

  return [part1(data), part2(data)]
}

const part1 = (data: string[]) => {
  const locationMapper = new LocationMapper(data)
  return Math.min(...locationMapper.determinePathDistances())
}

const part2 = (data: string[]) => {
  const locationMapper = new LocationMapper(data)
  return Math.max(...locationMapper.determinePathDistances())
}

export default allInASingleNight

export const solutionData = {
  puzzleData,
  testData,
}
