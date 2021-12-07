import { join } from "path"
import matter from "gray-matter"
import { ContentCommon } from "~/types"
import { downloadDirList, downloadFile } from "./github.server"

const CONTENT_PATH = "content"

export async function getMdxPage<T extends ContentCommon>(
  path: string,
  id: string,
) {
  const page = await readMdxFile(path)

  return { ...(await compileMdxPage<T>(page, id)), path }
}

export async function getMdxPagesInDirectory<T extends ContentCommon>(
  contentDir: string,
) {
  const dirList = await getMdxDirList(contentDir)
  const pages = await Promise.all(
    dirList.map(({ id, path }) => getMdxPage<T>(path, id)),
  )

  return pages.filter((page) => !page.data.draft)
}

export async function getMdxDirList(contentDir: string) {
  const dirPath = join(CONTENT_PATH, contentDir)
  const dirList = await downloadDirList(dirPath)

  return dirList.map(({ name, path }) => ({
    id: name.replace(/\.mdx$/, ""),
    path,
  }))
}

async function readMdxFile(path: string): Promise<string> {
  return await downloadFile(path)
}

async function compileMdxPage<FM extends ContentCommon>(
  page: string,
  id: string,
) {
  try {
    const { data, content } = matter(page)

    return {
      id,
      data: data as FM,
      content,
    }
  } catch (error: unknown) {
    console.error(`Compilation error for id: `, id)
    throw error
  }
}
