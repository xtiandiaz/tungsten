export const hexString = (value: number) => {
  const _hexString = value.toString(16)
  return '0'.repeat(6 - _hexString.length) + _hexString
}
