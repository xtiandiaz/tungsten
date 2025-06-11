declare global {
  
  interface String {
    removeLeadingAndTrailingSpaces(): string  
  }
}

String.prototype.removeLeadingAndTrailingSpaces = function(this: string): string {
  return this
}
