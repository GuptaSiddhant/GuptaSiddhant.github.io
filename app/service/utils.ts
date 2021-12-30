export const CONTENT_PATH = "public"

export function replaceFilePathsInPage(
  page: string,
  path: string,
  slice: number = 3,
) {
  const newPath = path
    .replace(CONTENT_PATH, "")
    .split("/")
    .slice(0, slice)
    .join("/")
  return page.replace(/\B(\.\/)/g, `${newPath}/`)
}
