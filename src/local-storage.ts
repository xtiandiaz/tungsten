export function retrieve<T>(key: string): T | undefined {
  const rawValue = localStorage.getItem(key)
  if (!rawValue) {
    return undefined
  }
  
  return JSON.parse(rawValue) as T
}

export function save<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}
