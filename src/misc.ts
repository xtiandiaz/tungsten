export function enumKey<T extends Record<keyof T, number | string>>(enumType: T, value: number | string): T[keyof T] | undefined {
  const index = Object.values(enumType).indexOf(value as unknown as T)
  return enumType[Object.keys(enumType)[index] as keyof T]
}
