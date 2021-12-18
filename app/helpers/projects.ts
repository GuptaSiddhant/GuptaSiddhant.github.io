import { getMdxPagesInDirectory, getMdxPage, getMdxDirList } from "./mdx"
import { filterPageDrafts, formatDate, sortByDate } from "./utils"
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

export function getProjectStatus(start?: Date | string, end?: Date | string) {
  const now = new Date()
  if (end) {
    const endDate = new Date(end)
    if (now > endDate)
      return `Completed (${formatDate(endDate, { day: undefined })})`
  }
  if (start) {
    const startDate = new Date(start)
    if (now > startDate)
      return `Ongoing since ${formatDate(startDate, { day: undefined })}`
  }
  return "Upcoming"
}

/** Type guard for project */
export function isProject(item: any): item is ProjectContent {
  return (item as ProjectContent).data.association !== undefined
}

export function filterProjectsByTags(
  projects: ProjectContent[],
  tags: string[],
) {
  if (tags.length === 0) return projects

  return projects.filter((project) =>
    (project.data.tags || []).some((tag) => tags.includes(tag)),
  )
}

export function filterProjectsByQuery(
  projects: ProjectContent[],
  query: string | null,
) {
  if (!query) return projects

  return projects.filter(({ id, data }) =>
    [id, data.title, data.association].some((field) => field?.includes(query)),
  )
}

export function generateUniqueTags(items: { data: { tags?: string[] } }[]) {
  return [...new Set(items.map((item) => item.data.tags || []).flat())]
}
