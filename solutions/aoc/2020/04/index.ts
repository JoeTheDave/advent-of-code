// Advent of Code | 2020 | Day 4 | Passport Processing
// https://adventofcode.com/2020/day/4
// https://adventofcode.com/2020/day/4/input

import { testData2 as testData, puzzleData } from './data'

export const displayName = 'AOC | 2020 | Day 4 | Passport Processing'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

type Document = { [key: string]: any }

const parseDocumentData = (documentData: string[]) => {
  const passports: Document[] = []
  let currentDocument: Document = {}
  documentData.forEach(dataRow => {
    if (dataRow === '') {
      passports.push(currentDocument as Document)
      currentDocument = {}
    } else {
      dataRow.split(' ').forEach(field => {
        const [key, value] = field.split(':')
        currentDocument[key] = value
      })
    }
  })
  passports.push(currentDocument as Document)
  return passports
}

const isValidPassport = (doc: Document) => {
  return 'byr' in doc && 'iyr' in doc && 'eyr' in doc && 'hgt' in doc && 'hcl' in doc && 'ecl' in doc && 'pid' in doc
}

const isStrictlyValidPassport = (doc: Document) => {
  const isLooslyValid = isValidPassport(doc)
  const hasValidBirthYear = /^(19[2-9][0-9]|200[0-2])$/.test(doc['byr'] || '')
  const hasValidIssueYear = /^(201[0-9]|2020)$/.test(doc['iyr'] || '')
  const hasValidExpirationYear = /^(202[0-9]|2030)$/.test(doc['eyr'] || '')
  const hasValidHeight = /^((1[5-8][0-9]|19[0-3])cm|(59|6[0-9]|7[0-6])in)$/.test(doc['hgt'] || '')
  const hasValidHairColor = /^#[0-9a-f]{6}$/.test(doc['hcl'] || '')
  const hasValidEyeColor = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(doc['ecl'] || '')
  const hasValidPassportId = /^\d{9}$/.test(doc['pid'] || '')

  return (
    isLooslyValid &&
    hasValidBirthYear &&
    hasValidIssueYear &&
    hasValidExpirationYear &&
    hasValidHeight &&
    hasValidHairColor &&
    hasValidEyeColor &&
    hasValidPassportId
  )
}

export const solutionOne = () => {
  return parseDocumentData(data).filter(passport => isValidPassport(passport)).length
}

export const solutionTwo = () => {
  return parseDocumentData(data).filter(passport => isStrictlyValidPassport(passport)).length
}
