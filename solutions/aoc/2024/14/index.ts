// Advent of Code | 2024 | Day 14 | Restroom Redoubt
// https://adventofcode.com/2024/day/14
// https://adventofcode.com/2024/day/14/input

import { getContext } from '@/lib/vis'
import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2024 | Day 14 | Restroom Redoubt'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData
const roomWidth = useTestData ? 11 : 101
const roomHeight = useTestData ? 7 : 103

class Robot {
  posX: number
  posY: number
  velX: number
  velY: number

  constructor(robotInfo: string) {
    const [position, velocity] = robotInfo.split(' ')
    const [px, py] = position
      .replace('p=', '')
      .split(',')
      .map(n => parseInt(n))
    this.posX = px
    this.posY = py
    const [vx, vy] = velocity
      .replace('v=', '')
      .split(',')
      .map(n => parseInt(n))
    this.velX = vx
    this.velY = vy
  }

  move = () => {
    this.posX += this.velX
    this.posY += this.velY
    if (this.posX > roomWidth - 1) {
      this.posX -= roomWidth
    }
    if (this.posX < 0) {
      this.posX += roomWidth
    }
    if (this.posY > roomHeight - 1) {
      this.posY -= roomHeight
    }
    if (this.posY < 0) {
      this.posY += roomHeight
    }
  }
}

export const solutionOne = () => {
  const robots = data.map(dataRow => new Robot(dataRow))
  for (let i = 1; i <= 100; i++) {
    robots.forEach(robot => robot.move())
  }
  const midlineX = Math.floor(roomWidth / 2)
  const midlineY = Math.floor(roomHeight / 2)
  const quadrants = [0, 0, 0, 0]
  robots.forEach(robot => {
    if (robot.posX < midlineX && robot.posY < midlineY) {
      quadrants[0]++
    } else if (robot.posX > midlineX && robot.posY < midlineY) {
      quadrants[1]++
    } else if (robot.posX < midlineX && robot.posY > midlineY) {
      quadrants[2]++
    } else if (robot.posX > midlineX && robot.posY > midlineY) {
      quadrants[3]++
    }
  })
  return quadrants.reduce((product, val) => product * val, 1)
}

export const solutionTwo = () => {
  // This solution required utilization of the `visualize` feature as you have no idea ultimately
  // what you're looking for other than it looks like a Christmas tree.  No way to write code to
  // identify it before knowing what it will look like.
  // Run the visualization to see the tree.
  return 8280
}

export const visualize = () => {
  const canvasSize = 900
  const ctx = getContext(canvasSize, canvasSize)

  // const root = document.getElementById('root') as HTMLElement
  // const button = document.createElement('button')
  // button.innerText = 'Iterate'
  // root.appendChild(button)

  const robotSize = 8
  const robots = data.map(dataRow => new Robot(dataRow))
  let iteration = 0

  const iterateRobots = () => {
    iteration++
    robots.forEach(robot => robot.move())
  }

  const displayRobots = () => {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvasSize, canvasSize)
    robots.forEach(robot => {
      ctx.fillStyle = 'lime'
      ctx.fillRect(robot.posX * robotSize + 40, robot.posY * robotSize + 40, robotSize, robotSize)
    })
    ctx.font = `${14}px Arial`
    ctx.fillStyle = 'white'
    ctx.fillText(`Iteration: ${iteration}`, 5, 15)
  }

  for (let i = 1; i <= 8280; i++) {
    iterateRobots()
  }
  displayRobots()

  // button.onclick = () => {
  //   for (let i = 1; i <= 101; i++) {
  //     iterateRobots()
  //   }
  //   displayRobots()
  // }

  // setInterval(() => {
  //   for (let i = 1; i <= 101; i++) {
  //     iterateRobots()
  //   }
  //   displayRobots()
  // }, 500)
}
