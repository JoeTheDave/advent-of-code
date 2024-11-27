// Advent of Code | 2023 | Day 13 | Point of Incidence
// https://adventofcode.com/2023/day/13
// https://adventofcode.com/2023/day/13/input

import { testData, puzzleData } from './data'

export const displayName = 'AOC | 2023 | Day 13 | Point of Incidence'
export const complete = [true, true]

const useTestData = false

const data = useTestData ? testData : puzzleData

export const compileImageList = (imageData: string[]) => {
  const images: string[][] = [[]]
  imageData.forEach(dataLine => {
    if (dataLine === '') {
      images.push([])
    } else {
      images.slice(-1)[0].push(dataLine)
    }
  })
  return images
}

export const rotateImage = (image: string[]) => {
  const newImage: string[] = []
  for (let c = image[0].length - 1; c >= 0; c--) {
    newImage.push(image.map(i => i[c]).join(''))
  }
  return newImage
}

export const isImageMirroredAt = (image: string[], idx: number) => {
  return image
    .map(imgLine => {
      const reflectionSize = Math.min(idx, imgLine.length - idx)
      const left = imgLine.slice(idx - reflectionSize, idx)
      const right = imgLine.slice(idx, idx + reflectionSize)
      return left === right.split('').reverse().join('')
    })
    .every(_ => _)
}

export const getImageReflectionScore = (image: string[], ignoreScore: number = 0) => {
  for (let m = 1; m < image[0].length; m++) {
    if (ignoreScore !== m && isImageMirroredAt(image, m)) {
      return m
    }
  }
  const rotatedImg = rotateImage(image)
  for (let m = 1; m < rotatedImg[0].length; m++) {
    if (ignoreScore !== m * 100 && isImageMirroredAt(rotatedImg, m)) {
      return m * 100
    }
  }
  return 0
}

export const removeSmudgeAt = (image: string[], idx: number) => {
  const lineLength = image[0].length
  const flatImgMap = image.join('').split('')
  flatImgMap[idx] = flatImgMap[idx] === '#' ? '.' : '#'
  const flatImg = flatImgMap.join('')
  const img = []
  for (let i = 0; i < flatImg.length; i += lineLength) {
    img.push(flatImg.substring(i, i + lineLength))
  }
  return img
}

export const getSmudgeResistantImageReflectionScore = (image: string[]) => {
  const imgSize = image[0].length * image.length
  let score = 0
  for (let i = 0; i < imgSize; i++) {
    const unSmudgedImage = removeSmudgeAt(image, i)
    const originalScore = getImageReflectionScore(image)
    score = getImageReflectionScore(unSmudgedImage, originalScore)
    if (score !== 0) {
      break
    }
  }
  return score
}

export const solutionOne = () => {
  const images = compileImageList(data)
  return images.map(img => getImageReflectionScore(img)).reduce((sum, num) => sum + num, 0)
}

export const solutionTwo = () => {
  const images = compileImageList(data)
  return images.map(img => getSmudgeResistantImageReflectionScore(img)).reduce((sum, num) => sum + num, 0)
}
