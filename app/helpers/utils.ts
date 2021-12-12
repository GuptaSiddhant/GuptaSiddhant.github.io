import { PageContent } from "~/types"

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function sortByDate(a?: Date, b?: Date): number {
  return (b || new Date()).getTime() - (a || new Date()).getTime()
}

export function getIdFromPath(path: string): string {
  const pathParts = path.split("/")
  const filename = pathParts[pathParts.length - 1]
  return filename.replace(/\.mdx$/, "")
}

export function filterPageDrafts(page: PageContent): boolean {
  return !page.data.draft
}

export function sortPagesByDate(a: PageContent, b: PageContent) {
  return sortByDate(a.data.dateEnd, b.data.dateEnd)
}

export function createDebugger(prefix: string) {
  const formattedPrefix = `[${prefix}]`
  const log = (...args: any[]) => console.log(formattedPrefix, ...args)
  const warn = (...args: any[]) => console.warn(formattedPrefix, ...args)
  const error = (...args: any[]) => console.error(formattedPrefix, ...args)

  function newDebugger(...args: any[]) {
    log(...args)
  }
  newDebugger.log = log
  newDebugger.warn = warn
  newDebugger.error = error

  return newDebugger
}
