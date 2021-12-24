import fs from "fs"
import { createDebugger } from "~/helpers"

const localDebug = createDebugger("LOCAL", true)

export function readDirList(dirPath: string) {
  localDebug("Getting list of files in", dirPath)

  const list: string[] = JSON.parse(
    fs.readFileSync(`${dirPath}/index.json`, "utf8"),
  )
  const dirList = list.map((name: string) => ({
    name,
    path: `${dirPath}/${name}/index.mdx`,
  }))

  return dirList
}

export function readFile(filePath: string) {
  localDebug("Reading file:", filePath)
  return fs.readFileSync(filePath, "utf8")
}
