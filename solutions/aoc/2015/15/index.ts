// Advent of Code | 2015 | Day 15 | Science for Hungry People
// https://adventofcode.com/2015/day/15
// https://adventofcode.com/2015/day/15/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2015 | Day 15 | Science for Hungry People'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

type Ingredients = { [key: string]: { [key: string]: number } }

type IngredientQuantities = { [key: string]: number }

const processData = (data: string[]) => {
  return data.reduce((ingredients, dataRow) => {
    const [name, properties] = dataRow.split(': ')
    ingredients[name] = {}
    properties.split(', ').forEach(property => {
      const [propertyName, value] = property.split(' ')
      ingredients[name][propertyName] = parseInt(value)
    })
    return ingredients
  }, {} as Ingredients)
}

const scoreIngredientList = (ingredients: Ingredients, quantities: IngredientQuantities) => {
  const properties = {
    capacity: 0,
    durability: 0,
    flavor: 0,
    texture: 0,
    calories: 0,
  }
  Object.keys(quantities).forEach(ingredient => {
    const quantity = quantities[ingredient]
    Object.keys(properties).forEach(property => {
      properties[property as keyof typeof properties] += ingredients[ingredient][property] * quantity
    })
  })
  Object.keys(properties).forEach(property => {
    properties[property as keyof typeof properties] = Math.max(0, properties[property as keyof typeof properties])
  })
  const score = Object.keys(properties).reduce((score, property) => {
    return property === 'calories' ? score : score * properties[property as keyof typeof properties]
  }, 1)
  return [score, properties['calories']]
}

export const solutionOne = () => {
  const ingredients = processData(data)
  let maxScore = 0
  let bestIngredients: IngredientQuantities | null = null
  for (let Frosting = 0; Frosting <= 100; Frosting++) {
    for (let Candy = 0; Candy <= 100 - Frosting; Candy++) {
      for (let Butterscotch = 0; Butterscotch <= 100 - (Frosting + Candy); Butterscotch++) {
        const quantities: IngredientQuantities = {
          Frosting,
          Candy,
          Butterscotch,
          Sugar: 100 - (Frosting + Candy + Butterscotch),
        }

        const [score, calories] = scoreIngredientList(ingredients, quantities)
        maxScore = Math.max(maxScore, score)
        if (maxScore === score) {
          bestIngredients = quantities
        }
      }
    }
  }
  return maxScore
}

export const solutionTwo = () => {
  const ingredients = processData(data)
  let maxScore = 0
  let bestIngredients: IngredientQuantities | null = null
  for (let Frosting = 0; Frosting <= 100; Frosting++) {
    for (let Candy = 0; Candy <= 100 - Frosting; Candy++) {
      for (let Butterscotch = 0; Butterscotch <= 100 - (Frosting + Candy); Butterscotch++) {
        const quantities: IngredientQuantities = {
          Frosting,
          Candy,
          Butterscotch,
          Sugar: 100 - (Frosting + Candy + Butterscotch),
        }

        const [score, calories] = scoreIngredientList(ingredients, quantities)
        if (calories === 500) {
          maxScore = Math.max(maxScore, score)
          if (maxScore === score) {
            bestIngredients = quantities
          }
        }
      }
    }
  }
  return maxScore
}
