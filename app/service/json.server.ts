import { join } from "path"

import { readFile } from "./content.local"
import { downloadFile } from "./content.github"
import { CONTENT_PATH, replaceFilePathsInPage } from "./utils"
import { __IS_DEV__ } from "~/helpers"

export async function getJsonFile<T = unknown>(path: string): Promise<T> {
  const getFile = __IS_DEV__ ? readFile : downloadFile
  const page = await getFile(path)
  const newPage = replaceFilePathsInPage(page, path, 2)

  return JSON.parse(newPage)
}

export function generateJsonPath(dirPath: string) {
  return join(CONTENT_PATH, dirPath, "index.json")
}
