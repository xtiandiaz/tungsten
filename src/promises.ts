export function delay(milliseconds: number): Promise<void> {
  return new Promise<void>((resolve) => setInterval(() => resolve(), milliseconds))
}

export function delayCancellable(milliseconds: number) {
  let resolve: () => void, reject: (reason: string) => void
  
  const delay = new Promise<void>((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })
  const timeoutId = setTimeout(() => resolve(), milliseconds)
  const cancellable = () => {
    clearTimeout(timeoutId)
    reject('Cancelled delay')
  }
  
  return { delay, cancellable }
}
