// Advent of Code | 2024 | Day 2 | Red-Nosed Reports
// https://adventofcode.com/2024/day/2
// https://adventofcode.com/2024/day/2/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2024 | Day 2 | Red-Nosed Reports'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

const processData = (data: string[]) => data.map(dataRow => dataRow.split(' ').map(n => parseInt(n)))

const getReportAnalysis = (report: number[]) => {
  const result = report.reduce((analysis, record, idx, rpt) => {
    if (idx > 0) {
      analysis.push(record - rpt[idx - 1])
    }
    return analysis
  }, [] as number[])
  return result
}

const isReportSafe = (reportAnalysis: number[]) => {
  const consistent = reportAnalysis.every(n => n > 0) || reportAnalysis.every(n => n < 0)
  const stable = reportAnalysis.every(n => Math.abs(n) <= 3)
  return consistent && stable
}

export const solutionOne = () => {
  return processData(data)
    .map(report => getReportAnalysis(report))
    .reduce((safeCount, analysis) => safeCount + (isReportSafe(analysis) ? 1 : 0), 0)
}

export const solutionTwo = () => {
  let safeReports = 0
  processData(data).forEach(report => {
    if (isReportSafe(getReportAnalysis(report))) {
      safeReports++
    } else {
      for (let i = 0; i <= report.length; i++) {
        if (isReportSafe(getReportAnalysis([...report.slice(0, i), ...report.slice(i + 1)]))) {
          safeReports++
          break
        }
      }
    }
  })
  return safeReports
}
