export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function sortByDate(a?: Date, b?: Date): number {
  return (b || new Date()).getTime() - (a || new Date()).getTime()
}
