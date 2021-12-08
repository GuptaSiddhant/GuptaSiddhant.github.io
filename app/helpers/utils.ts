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
  return (...args: any[]) => console.log(`[${prefix}]`, ...args)
}
