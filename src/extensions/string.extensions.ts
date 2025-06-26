declare global {
  interface String {
    removeLeadingAndTrailingSpaces(): string  
  }
}

String.prototype.removeLeadingAndTrailingSpaces = function(this: string): string {
  const matches = this.match(/^\s*(.*\S)\s*$/)
  // console.log(matches)

  return matches ? matches[1] : ''
}

export {}
