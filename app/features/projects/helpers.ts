import type { ProjectContent } from "./types"

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

export function generateUniqueTags(items: ProjectContent[]) {
  return [...new Set(items.map((item) => item.data.tags || []).flat())]
}

export function checkIfFeaturedProject(project: ProjectContent) {
  return !!project.data.featured
}
