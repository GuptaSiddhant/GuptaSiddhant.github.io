import fs from "fs"
import { join } from "path"
import { createDebugger } from "~/helpers"

const localDebug = createDebugger("LOCAL", true)

export function readDirList(dirPath: string): { name: string; path: string }[] {
  localDebug("Getting list of files in", dirPath)
  const extension = "mdx"

  return fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((file) => file.isFile() && file.name.endsWith(extension))
    .map((file) => ({
      name: file.name.replace(`.${extension}`, ""),
      path: join(dirPath, file.name),
    }))
}

export function readFile(filePath: string) {
  localDebug("Reading file:", filePath)
  return fs.readFileSync(filePath, "utf8")
}
