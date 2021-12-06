import fs from "fs"
import path from "path"
import matter from "gray-matter"

type DataType = Record<string, unknown>

interface ContentType<T extends DataType> {
  id: string
  content: string
  data: T
}

const extension = "mdx"

export default class Content<T extends DataType> {
  private directoryPath: string
  constructor(contentDirectoryName: string) {
    this.directoryPath = path.join(
      process.cwd(),
      "content",
      contentDirectoryName,
    )
  }

  public getAllItems = (): ContentType<T>[] => {
    const ids = getAllMarkdownIds(this.directoryPath)
    return ids.map((id) => this.getItemById(id))
  }

  public getItemById = (id: string): ContentType<T> => {
    const filePath = path.join(this.directoryPath, `${id}.${extension}`)
    return readMarkdownFile<T>(filePath)
  }
}

function getAllMarkdownIds(dirPath: string): string[] {
  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((file) => file.isFile() && file.name.endsWith(extension))
    .map((file) => file.name.replace(`.${extension}`, ""))
}

function readMarkdownFile<T extends DataType>(
  filePath: string,
): ContentType<T> {
  try {
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)
    const id = path.basename(filePath, `.${extension}`)

    return { content, data: data as any, id }
  } catch (err) {
    console.error(err)
    throw err
  }
}

// function readMarkdownFile<T extends Data>(filePath: string) {
//   const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" })
//   const { data, content } = matter(fileContent)
//   return { content, data: data as T }
// }

// function sortItems(a: Data, b: Data): number {
//   if ("date" in a && "date" in b) {
//     return a.date === b.date ? 0 : a.date > b.date ? -1 : 1
//   }
//   if ("order" in a && "order" in b) {
//     return b.order - a.order
//   }
//   return 0
// }

// type Data = Record<string, any>

// interface Siblings<T> {
//   next: T
//   prev: T
// }

// interface Item<T> {
//   content: string
//   data: T
//   next: T
//   prev: T
// }
