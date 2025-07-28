declare global {  
  interface MapConstructor {
    fromObject<K extends string, V>(object: { [key: string]: V }): Map<K, V>
  }
}

export const fromObject = function<K extends string, V>(object: { [key: string]: V }): Map<K, V> {
  return new Map(Object.entries(object).map(e => {
    return [e[0] as K, e[1] as V]
  }))
}

Map.fromObject = fromObject
