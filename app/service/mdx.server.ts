import { join } from "path"
import { bundleMDX } from "mdx-bundler"

import { readDirList, readFile } from "./content.local"
import { downloadDirList, downloadFile } from "./github.server"
import { getIdFromPath } from "~/helpers"
import type { ContentCommonData, PageContent } from "~/types"

const __IS_DEV__ = process.env.NODE_ENV === "development"

const CONTENT_PATH = "content"

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
  const { code, frontmatter } = await bundleMDX<T>({
    source: page,
  })

  return { id, path, data: frontmatter, code }
}

export async function getMdxPagesInDirectory<T extends ContentCommonData>(
  contentDir: string,
) {
  const dirList = await getMdxDirList(contentDir)
  const pages = await Promise.all(
    dirList.map(({ id, path }) => getMdxPage<T>(path, id)),
  )

  return pages
}
