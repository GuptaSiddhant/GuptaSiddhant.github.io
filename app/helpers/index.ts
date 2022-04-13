export const __IS_DEV__ = process.env.NODE_ENV === "development"

export function filterUniqueTagsByOccurrence(
  tags: (string | undefined)[],
): string[] {
  const tagOccurrenceMap: Record<string, number> = {}
  for (const tag of tags) {
    if (tag) {
      const key = tag.toLowerCase()
      tagOccurrenceMap[key] = (tagOccurrenceMap[key] || 0) + 1
    }
  }
  const sortedTagsByOccurrence = Object.keys(tagOccurrenceMap).sort(
    (a, b) => tagOccurrenceMap[b] - tagOccurrenceMap[a],
  )

  return sortedTagsByOccurrence
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
