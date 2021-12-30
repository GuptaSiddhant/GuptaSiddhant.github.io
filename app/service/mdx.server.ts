import { join } from "path"
import { bundleMDX } from "mdx-bundler"

import { readDirList, readFile } from "./content.local"
import { downloadDirList, downloadFile } from "./content.github"
import { CONTENT_PATH, replaceFilePathsInPage } from "./utils"
import { __IS_DEV__, getIdFromPath } from "~/helpers"
import type { ContentCommonData, PageContent } from "~/types"

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
  const getDirList = __IS_DEV__ ? readDirList : downloadDirList
  const dirList = await getDirList(dirPath)

  return dirList.map(({ name, path }) => ({
    id: getIdFromPath(name),
    path,
  }))
}

export async function getMdxPage<T extends ContentCommonData>(
  path: string,
  id: string,
): Promise<PageContent<T>> {
  const getFile = __IS_DEV__ ? readFile : downloadFile
  const page = await getFile(path)
  const source = replaceFilePathsInPage(page, path)
  const { code, frontmatter } = await bundleMDX<T>({ source })

  return { id, path, data: frontmatter, code }
}
