export function round(num: number, fractionDigits: number): number {
  return Number(num.toFixed(fractionDigits))
}

export function clamp(num: number, min: number, max: number): number {
  return Math.max(min, Math.min(num, max))
}

/* Greatest Commmon Denominator/Divisor */
export function gcd(a: number, b: number) {
  if (b == 0) {
    return a
  }
  return gcd(b, a % b)
}
