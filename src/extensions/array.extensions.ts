declare global {
  interface ArrayConstructor {
    range(start: number, end: number, step: number): number[]
    closedRange(start: number, end: number, step: number): number[]
  }
  
  interface Array<T> {
    shuffle(): this
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

/*
  Fisher-Yates Sorting Algorithm
  Taken from: https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
*/
Array.prototype.shuffle = function<T>(this: Array<T>) {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [this[i], this[j]] = [this[j], this[i]]
  }
  return this
}
