import { PageContent } from "~/types"

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

export function filterPageDrafts(page: PageContent): boolean {
  return !page.data.draft
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