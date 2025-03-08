declare global {
  interface DateConstructor {
    millisecondsInDay: number
    today(): Date
  }
  interface Date {
    getDaysFrom(fromDate: Date): number
  }
}

export const millisecondsInDay = 1000 * 3600 * 24
Date.millisecondsInDay = millisecondsInDay

export function today(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}
Date.today = today

Date.prototype.getDaysFrom = function(this: Date, fromDate: Date): number {
  const thisTime = this.getTime()
  const fromTime = fromDate.getTime()
  
  return (thisTime - fromTime) / millisecondsInDay
}
