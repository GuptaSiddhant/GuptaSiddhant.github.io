import { getMdxPagesInDirectory, getMdxPage, getMdxDirList } from "./mdx"
import type { ProjectContent, ProjectData } from "~/types"
import { sortByDate } from "./utils"
import { downloadDirList } from "./github.server"

export async function getAllProjects(): Promise<ProjectContent[]> {
  const projects = await getMdxPagesInDirectory<ProjectData>("projects")

  console.log(await downloadDirList("content/projects"))

  return projects.sort((a, b) => sortByDate(a.data.dateEnd, b.data.dateEnd))
}

export async function getProject(id: string): Promise<ProjectContent> {
  const dirList = await getMdxDirList("projects")
  const path = dirList.find((item) => item.id === id)?.path
  if (!path) throw new Error("Project not found for id: " + id)

  return getMdxPage<ProjectData>(path, id)
}
