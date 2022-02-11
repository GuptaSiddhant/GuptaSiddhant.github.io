export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {},
): string {
  return new Date(date).toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  })
}

export function formatList(
  list: string[],
  parts: true,
): Array<{
  type: "literal" | "element"
  value: string
}>
export function formatList(list: string[], parts?: false): string
export function formatList(list: string[], parts?: boolean) {
  const formatter = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  })

  return parts ? formatter.formatToParts(list) : formatter.format(list)
}
