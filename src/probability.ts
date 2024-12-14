import { clamp } from './math'

export function value(weight: number, totalWeight: number, min: number = 0, max: number = 1): number {
  min = clamp(min, 0, 1)
  max = clamp(max, min, 1)
  weight = Math.max(0, weight)
  totalWeight = clamp(totalWeight, 1, Math.max(weight, totalWeight))
  
  return clamp((max - min) * weight / totalWeight, 0, 1)
}
