// Advent of Code | 2023 | Day 19 | Aplenty
// https://adventofcode.com/2023/day/19
// https://adventofcode.com/2023/day/19/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2023 | Day 19 | Aplenty'
export const complete = [true, false]

const useTestData = false

const data = useTestData ? testData : puzzleData

interface Gizmo {
  x: number
  m: number
  a: number
  s: number
}

class GizmoEvaluationProcessor {
  gizmos: Gizmo[]
  workflows: { [key: string]: string[] }
  accepted: Gizmo[]
  rejected: Gizmo[]

  constructor(rawData: string[]) {
    this.gizmos = []
    this.accepted = []
    this.rejected = []
    this.workflows = {}
    let dataDividor = false
    rawData.forEach(dataLine => {
      if (dataLine === '') {
        dataDividor = true
      } else {
        if (dataDividor) {
          this.gizmos.push(
            JSON.parse(
              dataLine.replace('x=', '"x":').replace('m=', '"m":').replace('a=', '"a":').replace('s=', '"s":'),
            ),
          )
        } else {
          const [id, workflow] = dataLine.replace('}', '').split('{')
          const steps = workflow.split(',')
          this.workflows[id] = steps
        }
      }
    })
  }

  processWorkflowResult = (workflowId: string, gizmo: Gizmo) => {
    if (workflowId === 'A') {
      this.accepted.push(gizmo)
    } else if (workflowId === 'R') {
      this.rejected.push(gizmo)
    } else {
      this.executeWorkflow(workflowId, gizmo)
    }
  }

  executeWorkflow = (workflowId: string, gizmo: Gizmo) => {
    let breakout = false
    this.workflows[workflowId].forEach(workflowStep => {
      if (!breakout) {
        if (workflowStep.includes(':')) {
          const [logic, id] = workflowStep.split(':')
          const val = gizmo[logic[0] as keyof typeof gizmo]
          const result = eval(logic.replace(logic[0], val.toString()))
          if (result) {
            breakout = true
            this.processWorkflowResult(id, gizmo)
          }
        } else {
          this.processWorkflowResult(workflowStep, gizmo)
        }
      }
    })
  }

  runWorkflows = () => {
    while (this.gizmos.length) {
      const gizmo = this.gizmos.pop() as Gizmo
      this.executeWorkflow('in', gizmo)
    }
  }

  calculateAcceptanceScore = () => {
    return this.accepted.reduce(
      (sum, gizmo) => Object.keys(gizmo).reduce((sum, key) => gizmo[key as keyof typeof gizmo] + sum, 0) + sum,
      0,
    )
  }
}

export const solutionOne = () => {
  const processor = new GizmoEvaluationProcessor(data)
  processor.runWorkflows()
  return processor.calculateAcceptanceScore()
}

export const solutionTwo = () => {
  return null
}
