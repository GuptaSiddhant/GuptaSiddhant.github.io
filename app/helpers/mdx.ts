import { join } from "path"
import matter from "gray-matter"

import { downloadDirList, downloadFile } from "./github.server"
import { readDirList, readFile } from "./content.local"
import { getIdFromPath } from "./utils"
import type { ContentCommon, PageContent } from "~/types"

const __IS_DEV__ = process.env.NODE_ENV === "development"

const CONTENT_PATH = "content"

export async function getMdxDirList(contentDir: string) {
  const dirPath = join(CONTENT_PATH, contentDir)
  console.log(dirPath)
  const dirList = __IS_DEV__
    ? readDirList(dirPath)
    : await downloadDirList(dirPath)

  return dirList.map(({ name, path }) => ({
    id: getIdFromPath(name),
    path,
  }))
}

export async function getMdxPage<T extends ContentCommon>(
  path: string,
  id: string,
): Promise<PageContent<T>> {
  const page = __IS_DEV__ ? readFile(path) : await downloadFile(path)
  const { content, data } = matter(page)

  return { id, path, data: data as T, content }
}

export async function getMdxPagesInDirectory<T extends ContentCommon>(
  contentDir: string,
) {
  const dirList = await getMdxDirList(contentDir)
  const pages = await Promise.all(
    dirList.map(({ id, path }) => getMdxPage<T>(path, id)),
  )

  return pages
}
