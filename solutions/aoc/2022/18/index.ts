// Advent of Code | 2022 | Day 18 | Boiling Boulders
// https://adventofcode.com/2022/day/18
// https://adventofcode.com/2022/day/18/input

import { compact } from 'lodash'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2022 | Day 18 | Boiling Boulders'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

class Cube {
  x: number
  y: number
  z: number
  nN: Cube | null
  eN: Cube | null
  sN: Cube | null
  wN: Cube | null
  fN: Cube | null
  bN: Cube | null
  solid: boolean
  scanIteration: number | null
  registeredSolidNeighbors: number | null

  constructor({ x, y, z, solid }: { x: number; y: number; z: number; solid: boolean }) {
    this.x = x
    this.y = y
    this.z = z
    this.nN = null
    this.eN = null
    this.sN = null
    this.wN = null
    this.fN = null
    this.bN = null
    this.solid = solid
    this.scanIteration = null
    this.registeredSolidNeighbors = null
  }

  neighbors() {
    return compact([this.nN, this.eN, this.sN, this.wN, this.fN, this.bN])
  }

  scan(iteration: number) {
    this.scanIteration = iteration
    this.registeredSolidNeighbors = this.neighbors().filter(n => n.solid).length
  }
}

class CubeNetwork {
  cubes: Cube[]
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  zMin: number
  zMax: number

  constructor(data: string[]) {
    const coords = data.map(d => d.split(',').map(i => parseInt(i)))
    const xs = coords.map(i => i[0])
    const ys = coords.map(i => i[1])
    const zs = coords.map(i => i[2])
    this.xMin = Math.min(...xs)
    this.xMax = Math.max(...xs)
    this.yMin = Math.min(...ys)
    this.yMax = Math.max(...ys)
    this.zMin = Math.min(...zs)
    this.zMax = Math.max(...zs)

    const cubes: Cube[] = []
    for (let x = this.xMin - 1; x <= this.xMax + 1; x++) {
      for (let y = this.yMin - 1; y <= this.yMax + 1; y++) {
        for (let z = this.zMin - 1; z <= this.zMax + 1; z++) {
          cubes.push(
            new Cube({
              x,
              y,
              z,
              solid: !!data.find(d => d === `${x},${y},${z}`),
            }),
          )
        }
      }
    }
    cubes.forEach(cube => {
      cube.nN = cubes.find(c => c.x === cube.x && c.y === cube.y - 1 && c.z === cube.z) || null
      cube.eN = cubes.find(c => c.x === cube.x + 1 && c.y === cube.y && c.z === cube.z) || null
      cube.sN = cubes.find(c => c.x === cube.x && c.y === cube.y + 1 && c.z === cube.z) || null
      cube.wN = cubes.find(c => c.x === cube.x - 1 && c.y === cube.y && c.z === cube.z) || null
      cube.fN = cubes.find(c => c.x === cube.x && c.y === cube.y && c.z === cube.z + 1) || null
      cube.bN = cubes.find(c => c.x === cube.x && c.y === cube.y && c.z === cube.z - 1) || null
    })
    this.cubes = cubes
  }

  getScanEdge(iteration: number) {
    return this.cubes.filter(cube => cube.scanIteration === iteration - 1)
  }

  scanSurfaceArea(iteration: number) {
    const scanEdge = this.getScanEdge(iteration)
    if (scanEdge.length === 0) {
      const startCube = this.cubes.find(
        cube => cube.x === this.xMin - 1 && cube.y === this.yMin - 1 && cube.z === this.zMin - 1,
      ) as Cube
      startCube.scan(iteration)
    } else {
      scanEdge.forEach(cube => {
        cube
          .neighbors()
          .filter(n => n.scanIteration === null && !n.solid)
          .forEach(n => {
            n.scan(iteration)
          })
      })
    }
  }

  scannedArea() {
    return this.cubes.filter(c => c.scanIteration !== null).length
  }
}

export const solutionOne = () => {
  interface Cube {
    coordinate: number[]
    exposedFaces: number
  }

  const cubes: Cube[] = []
  data.forEach(coords => {
    const cube: Cube = {
      coordinate: coords.split(',').map(i => parseInt(i)),
      exposedFaces: 6,
    }
    cubes.forEach(existingCube => {
      if (
        (cube.coordinate[0] === existingCube.coordinate[0] &&
          cube.coordinate[1] === existingCube.coordinate[1] &&
          Math.abs(cube.coordinate[2] - existingCube.coordinate[2]) === 1) ||
        (cube.coordinate[1] === existingCube.coordinate[1] &&
          cube.coordinate[2] === existingCube.coordinate[2] &&
          Math.abs(cube.coordinate[0] - existingCube.coordinate[0]) === 1) ||
        (cube.coordinate[2] === existingCube.coordinate[2] &&
          cube.coordinate[0] === existingCube.coordinate[0] &&
          Math.abs(cube.coordinate[1] - existingCube.coordinate[1]) === 1)
      ) {
        cube.exposedFaces--
        existingCube.exposedFaces--
      }
    })
    cubes.push(cube)
  })

  return cubes.reduce((exposedFaces, cube) => exposedFaces + cube.exposedFaces, 0)
}

export const solutionTwo = () => {
  const cubeNetwork = new CubeNetwork(data)
  for (let i = 0; true; i++) {
    const previousScanArea = cubeNetwork.scannedArea()
    cubeNetwork.scanSurfaceArea(i)
    if (cubeNetwork.scannedArea() === previousScanArea) {
      break
    }
  }

  return cubeNetwork.cubes.reduce((surfaceArea, cube) => surfaceArea + (cube.registeredSolidNeighbors || 0), 0)
}
