import fs from "fs/promises"
import { join } from "path"
import matter from "gray-matter"
import { ContentCommon } from "~/types"

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
  const fullContentDirPath = join(CONTENT_PATH, contentDir)
  return await readDirList(fullContentDirPath)
}

async function readDirList(
  dirPath: string,
): Promise<{ id: string; path: string }[]> {
  const dirContents = await fs.readdir(dirPath, {
    withFileTypes: true,
  })

  return dirContents
    .filter(({ name }) => name !== "README.md")
    .map((file) => {
      const path = `${dirPath}/${file.name}`

      return {
        id: path.replace(`${dirPath}/`, "").replace(/\.mdx$/, ""),
        path: file.isFile() ? path : join(path, "index.mdx"),
      }
    })
}

async function readMdxFile(path: string): Promise<string> {
  return await fs.readFile(path, "utf8")
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
