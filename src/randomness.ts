import { ParameterError } from './error'
import * as Probability from './probability'

export function sign(probabilities: number[] = [0.5]): number {
  return choice([1, -1], probabilities)
}

export function integer(min: number, max: number): number {
  min = Math.floor(min)
  max = Math.floor(max)
  
  return min + Math.round(Math.random() * (max - min))
}

export function choice<T>(selection: T[], probabilities: number[] = []): T {
  if (selection.length < 1) {
    console.log(ParameterError.Shortfall, `Selection: ${selection}`)
  }
  const totalProb = probabilities.reduce((acc, curVal) => acc + curVal, 0)
  if (totalProb > 1) {
    console.log(ParameterError.Shortfall, `Probabilities: ${probabilities}`)
  }
  if (probabilities.length < selection.length) {
    const diff = selection.length - probabilities.length
    const probShare = (1 - totalProb) / diff
    probabilities = probabilities.concat([...Array(diff).keys()].map((_) => probShare))
  }
  const choices = selection
    .map((c, i) => { return { el: c, prob: probabilities[i] } })
    .sort((a, b) => b.prob - a.prob)
  const randProb = Math.random()
  const choice: T | undefined = (() => {
    let accProb = 0
    for (const choice of choices) {
      accProb += choice.prob
      if (randProb <= accProb) {
        return choice.el
      }
    }
    return undefined
  })()
  
  // console.log(choices, randProb, choice)
  
  return choice ?? choices[0].el
}

export function weightedChoice<T>(selection: T[], weights: number[]): T {
  if (selection.length < 2 || weights.length != selection.length) {
    console.log(ParameterError.Unbalance, `Selection: ${selection}, weights: ${weights}`)
  }
  const totalWeight = weights.reduce((acc, curVal) => acc + curVal, 0)
  if (totalWeight <= 0) {
    console.log(ParameterError.OutOfRange, `Total weight ${totalWeight} <= 0`)
  }
  return choice(selection, weights.map((w) => Probability.value(w, totalWeight)))
}

export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length
  let randomIndex: number

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    const currentElement = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = currentElement
  }
  return array
}
