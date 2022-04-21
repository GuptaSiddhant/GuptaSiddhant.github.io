export const __IS_DEV__ = process.env.NODE_ENV === "development"

export function getUniqueTagsFromObjects<T extends { tags?: string[] }>(
  objects: T[],
): string[] {
  const availableTags = objects.flatMap((item) => item.tags).filter(Boolean)

  return filterUniqueTagsByOccurrence(availableTags)
}

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

export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(new RegExp(" ", "g"), "-")
    .replace(new RegExp("/", "g"), "--")
    .toLowerCase()
}

export function cleanupText(text?: string): string | undefined {
  if (!text) return undefined

  return text.replace(/â€”/g, ":")
}
