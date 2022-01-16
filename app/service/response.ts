import type { PageContent, LoaderFunctionProps } from "~/types"

/**
 * @reqParam content - Add content to items
 */
export function generateResponseForPages(
  request: LoaderFunctionProps["request"],
  pages: PageContent[],
) {
  const url = new URL(request.url)
  const contentSearchParam = url.searchParams.get("content")
  const idSearchParam = url.searchParams.get("id")

  if (idSearchParam) {
    const page = pages.find((page) => page.id === idSearchParam)

    if (page) return page
    else throw new Error("Page not found")
  }

  if (!contentSearchParam) {
    return getPagesWithoutContent(pages)
  }

  return pages
}

export function getPagesWithoutContent(
  pages: PageContent[],
): Array<Omit<PageContent, "code" | "content">> {
  return pages.map(({ id, path, data }) => ({
    id,
    path,
    data,
  }))
}
