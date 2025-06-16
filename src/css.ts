export function valueAndUnitFromString(valueUnitString: string): [number, string] | undefined {
  const match = valueUnitString.match(/^(\d+)([a-z%]+)$/)
  
  return match ? [Number(match[1]), match[2]] : undefined
}

export const pxValue = function(valueAndUnit: [number, string]): number | undefined {
  switch (valueAndUnit[1]) {
    case 'em': return valueAndUnit[0] * 16
    case 'px': return valueAndUnit[0]
    default: return undefined
  }
}
