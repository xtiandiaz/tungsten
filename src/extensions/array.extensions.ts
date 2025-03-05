declare global {
  interface ArrayConstructor {
    range(start: number, end: number, step: number): number[]
    closedRange(start: number, end: number, step: number): number[]
  }
  
  interface Array<T> {
    contains(element: T): boolean
  }
}

export function range(start: number, end: number, step: number = 1) {
  return Array.from(
    { length: Math.floor((end - start) / step) }, 
    (_, key) => key * step + start
  )
}

export function closedRange(start: number, end: number, step: number = 1) {
  return range(start, end + step, step)
}

Array.range = range
Array.closedRange = closedRange

Array.prototype.contains = function<T>(this: Array<T>, element: T) {
  return this.findIndex(el => el === element) !== -1
}
