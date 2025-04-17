export type StringEnum<T> = Record<keyof T, string>

export function enumKeyFromValue<T extends StringEnum<T>>(enumType: T, value: number | string): T[keyof T] | undefined {
  const index = Object.values(enumType).indexOf(value as unknown as T)
  return enumType[Object.keys(enumType)[index] as keyof T]
}
