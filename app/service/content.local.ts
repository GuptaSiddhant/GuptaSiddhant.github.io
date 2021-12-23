import fs from "fs"
import { join } from "path"
import { createDebugger } from "~/helpers"

const localDebug = createDebugger("LOCAL", true)

export function readDirList(dirPath: string): { name: string; path: string }[] {
  localDebug("Getting list of files in", dirPath)
  const extension = ".mdx"

  const dirList = fs
    .readdirSync(dirPath, { withFileTypes: true })
    .map((file) => {
      if (file.isFile() && file.name.endsWith(extension)) {
        return {
          name: file.name.replace(extension, ""),
          path: join(dirPath, file.name),
        }
      }
      // Directory
      return {
        name: file.name,
        path: join(dirPath, file.name, "index" + extension),
      }
    })
    .filter(Boolean)

  return dirList
}

export function readFile(filePath: string) {
  localDebug("Reading file:", filePath)
  return fs.readFileSync(filePath, "utf8")
}
