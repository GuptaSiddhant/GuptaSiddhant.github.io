import { CommonContent, LoaderFunctionProps, PageContent } from "~/types"

export const __IS_DEV__ = process.env.NODE_ENV === "development"

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

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

export function sortByDate(a?: Date | string, b?: Date | string): number {
  const dateA = a ? new Date(a) : new Date()
  const dateB = b ? new Date(b) : new Date()

  return dateB.getTime() - dateA.getTime()
}

export function getIdFromPath(path: string): string {
  const pathParts = path.split("/")
  const filename = pathParts[pathParts.length - 1]
  return filename.replace(/\.mdx$/, "")
}

export function filterPageDraft(page: PageContent): boolean {
  const isDev = process.env.NODE_ENV === "development"
  const isDraft = page.data.draft
  return isDev || !isDraft
}

export function createDebugger(prefix: string, silent?: boolean) {
  const formattedPrefix = `[${prefix}]`
  const log = (...args: any[]) =>
    !silent && console.log(formattedPrefix, ...args)
  const warn = (...args: any[]) =>
    !silent && console.warn(formattedPrefix, ...args)
  const error = (...args: any[]) =>
    !silent && console.error(formattedPrefix, ...args)

  function newDebugger(...args: any[]) {
    log(...args)
  }
  newDebugger.log = log
  newDebugger.warn = warn
  newDebugger.error = error

  return newDebugger
}

export function generateUniqueTags(items: CommonContent[]) {
  const allTags = items.flatMap((item) => item.data.tags || [])

  const tagMap: { [key: string]: number } = {}
  allTags.forEach((tag) => {
    if (tagMap[tag]) tagMap[tag]++
    else tagMap[tag] = 1
  })

  const sortedTags = Object.entries(tagMap)
    .sort((a, b) => b[1] - a[1])
    .map((a) => a[0])
    .slice(0, 10)

  return sortedTags
}
