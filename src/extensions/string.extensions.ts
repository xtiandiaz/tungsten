declare global {
  interface String {
    capitalized(): string
    removeLeadingAndTrailingSpaces(): string  
  }
}

String.prototype.capitalized = function(this: string): string {
  return this.slice(0, 1).toLocaleUpperCase() + this.slice(1)
}

String.prototype.removeLeadingAndTrailingSpaces = function(this: string): string {
  const matches = this.match(/^\s*(.*\S)\s*$/)
  // console.log(matches)

  return matches ? matches[1] : ''
}

export {}
