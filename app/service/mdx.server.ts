import { join } from "path"
import { bundleMDX } from "mdx-bundler"

import { readDirList, readFile } from "./content.local"
import { downloadDirList, downloadFile } from "./content.server"
import { __IS_DEV__, getIdFromPath } from "~/helpers"
import type { ContentCommonData, PageContent } from "~/types"

const CONTENT_PATH = "public"

export async function getMdxPagesInDirectory<T extends ContentCommonData>(
  contentDir: string,
) {
  const dirList = await getMdxDirList(contentDir)
  const pages = await Promise.all(
    dirList.map(({ id, path }) => getMdxPage<T>(path, id)),
  )

  return pages
}

export async function getMdxDirList(contentDir: string) {
  const dirPath = join(CONTENT_PATH, contentDir)
  const dirList = __IS_DEV__
    ? readDirList(dirPath)
    : await downloadDirList(dirPath)

  return dirList.map(({ name, path }) => ({
    id: getIdFromPath(name),
    path,
  }))
}

export async function getMdxPage<T extends ContentCommonData>(
  path: string,
  id: string,
): Promise<PageContent<T>> {
  const page = __IS_DEV__ ? readFile(path) : await downloadFile(path)
  const source = replaceFilePathsInPage(page, path)
  const { code, frontmatter } = await bundleMDX<T>({ source })

  return { id, path, data: frontmatter, code }
}

function replaceFilePathsInPage(page: string, path: string) {
  const newPath = path
    .replace(CONTENT_PATH, "")
    .split("/")
    .slice(0, 3)
    .join("/")
  return page.replace(/\B(\.\/)/g, `${newPath}/`)
}
