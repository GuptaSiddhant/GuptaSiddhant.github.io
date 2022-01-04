import fs from "fs"
import { join } from "path"
import { createDebugger } from "~/helpers"

const localDebug = createDebugger("LOCAL", false)

export async function readDirList(dirPath: string) {
  localDebug("Getting list of files in", dirPath)
  const extension = ".mdx"
  console.log(process.cwd())
  const dirList = fs
    .readdirSync(join(process.cwd(), "..", dirPath), { withFileTypes: true })
    .map((file) => {
      if (file.isFile()) {
        if (file.name.endsWith(extension))
          return {
            name: file.name.replace(extension, ""),
            path: join(dirPath, file.name),
          }
        else return undefined
      }
      // Directory
      return {
        name: file.name,
        path: join(dirPath, file.name, "index" + extension),
      }
    })
    .filter(Boolean)

  return dirList as Array<{ name: string; path: string }>
}

export async function readFile(filePath: string) {
  localDebug("Reading file:", filePath)
  return fs.readFileSync(join(process.cwd(), "..", filePath), "utf8")
}
