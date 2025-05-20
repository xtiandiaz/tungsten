import { ParameterError } from './error'
import * as Probability from './probability'

export function getRandomSign(probabilities: number[] = [0.5]): number {
  return getRandomChoice([1, -1], probabilities)
}

export function getRandomInteger(min: number, max: number): number {
  min = Math.floor(min)
  max = Math.floor(max)
  
  return min + Math.round(Math.random() * (max - min))
}

export function getRandomChoice<T>(selection: T[], probabilities: number[] = []): T {
  if (selection.length < 1) {
    console.log(ParameterError.Shortfall, `Selection: ${selection}`)
  }
  
  const totalProb = probabilities.reduce((acc, curVal) => acc + curVal, 0)
  const errorMargin = 0.001
  if ((totalProb - errorMargin) > 1) {
    console.log(ParameterError.Shortfall, `Probabilities: ${probabilities}`, 'totalProb:', totalProb)
  }
  
  if (probabilities.length < selection.length) {
    const diff = selection.length - probabilities.length
    const probShare = (1 - totalProb) / diff
    probabilities = probabilities.concat([...Array(diff).keys()].map(() => probShare))
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

export function getRandomWeightedChoice<T>(selection: T[], weights: number[]): T {
  // console.log(selection, weights)
  
  if (selection.length < 2 || weights.length != selection.length) {
    console.log(ParameterError.Unbalance, `Selection: ${selection}, weights: ${weights}`)
  }
  
  const totalWeight = weights.reduce((acc, curVal) => acc + curVal, 0)
  if (totalWeight <= 0) {
    console.log(ParameterError.OutOfRange, `Total weight ${totalWeight} <= 0`)
  }
  
  return getRandomChoice(selection, weights.map((w) => Probability.value(w, totalWeight)))
}
