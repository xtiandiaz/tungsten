import { clamp } from "./math"

export const hexString = (colorValue: number, alpha: number = 1) => {
  const abbrHexString = colorValue.toString(16)
  let fullHexString = '0'.repeat(6 - abbrHexString.length) + abbrHexString
  
  const _alpha = clamp(alpha, 0, 1)
  if (_alpha !== 1) {
    const alphaHexString = Math.round(255 * _alpha).toString(16)
    fullHexString += '0'.repeat(2 - alphaHexString.length) + alphaHexString
  }
  
  return fullHexString
}
