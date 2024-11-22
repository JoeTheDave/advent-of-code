import { existsSync, readdirSync } from 'fs'
import _ from 'lodash'

const eulerProjectPath = `${__dirname}/../solutions/euler`
const aocProjectPath = `${__dirname}/../solutions/aoc`

const generateReport = async () => {
  const args = process.argv.splice(2)

  if (existsSync(eulerProjectPath)) {
    const eulerProjects = readdirSync(eulerProjectPath).map(dir => parseInt(dir))
    const maxProjNum = Math.max(...eulerProjects)
    const completed = []
    const incomplete = []
    const notGenerated = []
    const error = []
    for (let p = 1; p <= maxProjNum; p++) {
      const projectPath = `${eulerProjectPath}/${_.padStart(`${p}`, 3, '0')}`
      if (existsSync(projectPath)) {
        const projectModulePath = `${projectPath}/index.ts`
        if (existsSync(projectModulePath)) {
          const dynamicModule = require(projectModulePath)
          if (!dynamicModule || dynamicModule['complete'] === 'undefined') {
            error.push(p)
          } else {
            if (dynamicModule['complete']) {
              completed.push(p)
            } else {
              incomplete.push(p)
            }
          }
        } else {
          error.push(p)
        }
      } else {
        notGenerated.push(p)
      }
    }
    const report = {
      completed,
      incomplete,
      notGenerated,
      error,
    }
    const reportCounts = {
      completed: completed.length,
      incomplete: incomplete.length,
      notGenerated: notGenerated.length,
      error: error.length,
    }
    console.log()
    console.log('== Project Euler =========================================================')
    console.log()
    console.log(reportCounts)
    console.log()
    console.log(report)
    console.log()
    console.log('==========================================================================')
    console.log()
  }
  if (existsSync(aocProjectPath)) {
    console.log()
    console.log('== Advent of Code ========================================================')
    const currentDate = new Date()
    _.range(2015, currentDate.getFullYear() + (currentDate.getMonth() === 11 ? 1 : 0)).forEach(year => {
      const completion = _.fill(Array(25), 0)
      const aocYear = `${aocProjectPath}/${year}`
      if (existsSync(aocYear)) {
        for (let d = 1; d <= 25; d++) {
          const aocDay = `${aocYear}/${`${d}`.padStart(2, '0')}`
          if (existsSync(aocDay)) {
            const projectModulePath = `${aocDay}/index.ts`
            const dynamicModule = require(projectModulePath)
            completion[d - 1] = 1
            if (dynamicModule['complete'][0]) {
              completion[d - 1]++
            }
            if (dynamicModule['complete'][1]) {
              completion[d - 1]++
            }
          }
        }
      }

      const progress = completion
        .map(v => {
          switch (v) {
            case 0:
              return '   '
            case 1:
              return '[ ]'
            case 2:
              return '[-]'
            case 3:
              return '[*]'
          }
        })
        .join('')

      console.log(`    ╔══════╗`)
      console.log(`    ║ ${year} ║`)
      console.log(`╔═══╩══════╩════════════════════════════════════════════════════════════════╗`)
      console.log(`║${progress}║`)
      console.log(`╚═══════════════════════════════════════════════════════════════════════════╝`)
    })
  }
}

generateReport()
