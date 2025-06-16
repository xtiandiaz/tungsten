declare global {
  interface HTMLElement {
    getCssValueStrings: (...propertyNames: string[]) => string[]
  }
}

HTMLElement.prototype.getCssValueStrings = function(this: HTMLElement, ...propertyNames: string[]): string[] {
  const computedStyles = window.getComputedStyle(this)
  
  return propertyNames.map(pn => computedStyles.getPropertyValue(pn))
}

export {}
