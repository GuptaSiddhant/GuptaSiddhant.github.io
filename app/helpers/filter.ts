export function isTagsAndMatch(
  selectedTags: string[] = [],
  tags: string[] = [],
) {
  if (!selectedTags.length) return true

  const lowercaseTags = tags.map((t) => t.toLowerCase())
  const lowercaseSelectedTags = selectedTags.map((t) => t.toLowerCase())

  return lowercaseSelectedTags.every((tag) => lowercaseTags.includes(tag))
}

export function isTagsOrMatch(
  selectedTags: string[] = [],
  tags: string[] = [],
) {
  if (!selectedTags.length) return true

  const lowercaseTags = tags.map((t) => t.toLowerCase())
  const lowercaseSelectedTags = selectedTags.map((t) => t.toLowerCase())

  return lowercaseSelectedTags.some((tag) => lowercaseTags.includes(tag))
}

export function isQueryMatch(
  query: string | undefined,
  ...fields: Array<string | undefined>
): boolean {
  if (!query) return true

  const queryLower = query.toLowerCase()
  const lowercaseFields = fields
    .filter(Boolean)
    .map((f) => (f || "").toLowerCase())

  return Boolean(lowercaseFields.some((field) => field.includes(queryLower)))
}
