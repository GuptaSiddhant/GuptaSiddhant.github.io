import { getMdxPagesInDirectory, getMdxPage, getMdxDirList } from "./mdx"
import { filterPageDrafts, sortByDate } from "./utils"
import type { ProjectContent, ProjectData } from "~/types"

const CONTENT_DIR = "projects"

export async function getAllProjects(): Promise<ProjectContent[]> {
  const projects = await getMdxPagesInDirectory<ProjectData>(CONTENT_DIR)

  return projects
    .filter(filterPageDrafts)
    .sort((a, b) => sortByDate(a.data.dateEnd, b.data.dateEnd))
}

export async function getProjectById(id: string): Promise<ProjectContent> {
  const dirList = await getMdxDirList(CONTENT_DIR)
  const path = dirList.find((item) => item.id === id)?.path

  if (!path) throw new Error("Project not found for id: " + id)

  return getMdxPage<ProjectData>(path, id)
}
