// Advent of Code | 2015 | Day 18 | Like a GIF For Your Yard
// https://adventofcode.com/2015/day/18
// https://adventofcode.com/2015/day/18/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2015 | Day 18 | Like a GIF For Your Yard'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

class Light {
  active: boolean
  nextState: boolean
  neighbors: Light[]
  top: boolean
  bottom: boolean
  right: boolean
  left: boolean

  constructor(active: boolean) {
    this.active = active
    this.nextState = false
    this.neighbors = []
    this.top = false
    this.bottom = false
    this.right = false
    this.left = false
  }

  isCorner = () => [this.top, this.right, this.bottom, this.left].filter(e => e).length > 1

  determineNextState = (broken: boolean) => {
    const activeNeighborCount = this.neighbors.filter(neighbor => neighbor.active).length
    const isBrokenLight = broken && this.isCorner()
    this.nextState =
      isBrokenLight ||
      (this.active ? activeNeighborCount === 2 || activeNeighborCount === 3 : activeNeighborCount === 3)
  }

  transition = () => (this.active = this.nextState)
}

class GameOfLife {
  lights: Light[]

  constructor(data: string[]) {
    this.lights = []

    data.forEach(row => {
      row.split('').forEach(light => this.lights.push(new Light(light === '#')))
    })
    this.lights.forEach((light, i) => {
      light.right = (i + 1) % 100 === 0
      light.left = i % 100 === 0
      light.top = i < 100
      light.bottom = i > 99 * 100 - 1
      if (!light.right) {
        light.neighbors.push(this.lights[i + 1])
      }
      if (!light.right && !light.bottom) {
        light.neighbors.push(this.lights[i + 101])
      }
      if (!light.bottom) {
        light.neighbors.push(this.lights[i + 100])
      }
      if (!light.left && !light.bottom) {
        light.neighbors.push(this.lights[i + 99])
      }
      if (!light.left) {
        light.neighbors.push(this.lights[i - 1])
      }
      if (!light.left && !light.top) {
        light.neighbors.push(this.lights[i - 101])
      }
      if (!light.top) {
        light.neighbors.push(this.lights[i - 100])
      }
      if (!light.right && !light.top) {
        light.neighbors.push(this.lights[i - 99])
      }
    })
  }

  step = (broken: boolean) => {
    this.lights.forEach(l => l.determineNextState(broken))
    this.lights.forEach(l => l.transition())
  }

  queryActiveCount = () => this.lights.filter(l => l.active).length
}

export const solutionOne = () => {
  const game = new GameOfLife(data)
  for (let i = 0; i < 100; i++) {
    game.step(false)
  }
  return game.queryActiveCount()
}

export const solutionTwo = () => {
  const game = new GameOfLife(data)
  for (let i = 0; i < 100; i++) {
    game.step(true)
  }
  return game.queryActiveCount()
}
