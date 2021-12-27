import { getMdxPage } from "~/service/mdx.server"
import type { ProjectData, ProjectContent } from "./types"

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

export function checkIfFeaturedProject(project: ProjectContent) {
  return !!project.data.featured
}

export async function getNextProject(
  dirList: { id: string; path: string }[],
  id: string,
): Promise<ProjectContent | null> {
  const otherProjects = dirList.filter((project) => project.id !== id)

  if (otherProjects.length === 0) return null

  const randomIndex = Math.floor(Math.random() * otherProjects.length)
  const nextProject = otherProjects[randomIndex]

  return getMdxPage<ProjectData>(nextProject.path, nextProject.id)
}
