declare global {
  interface ArrayConstructor {
    range(start: number, end: number, step: number): number[]
    closedRange(start: number, end: number, step: number): number[]
  }
  
  type MapCallbackfn<T, U> = (value: T, index: number, array: T[]) => U | undefined
  
  interface Array<T> {
    first: () => T | undefined
    last: () => T | undefined
    
    compactMap<U>(callbackfn: MapCallbackfn<T, U>): Array<U>
    remove(predicate: (value: T, index: number) => boolean): this
    reversed(): Array<T>
    shuffle(): this
    shuffled(): Array<T>
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

Array.prototype.first = function<T>(this: Array<T>): T | undefined {
  return this.length > 0 ? this[0] : undefined
}

Array.prototype.last = function<T>(this: Array<T>): T | undefined {
  return this.length > 0 ? this[this.length - 1] : undefined
}

Array.prototype.compactMap = function<T, U>(this: Array<T>, callbackfn: MapCallbackfn<T, U>): Array<U> {
  return this.map(callbackfn).filter(v => v !== undefined)
}

Array.prototype.remove = function<T>(this: Array<T>, predicate: (value: T, index: number) => boolean) {
  const index = this.findIndex(predicate)
  if (index >= 0) {
    this.splice(index, 1)
  }
  return this
}

Array.prototype.reversed = function<T>(this: Array<T>) {
  return [...this].reverse()
}

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

Array.prototype.shuffled = function<T>(this: Array<T>) {
  return [...this].shuffle()
}
