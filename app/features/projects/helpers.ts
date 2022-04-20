import type { ProjectType } from "./types"

export function filterProjectsWithQueryAndTags(
  projects: ProjectType[],
  query: string,
  tags: string[],
): ProjectType[] {
  if (!query && !tags.length) return projects

  return projects
    .filter((project) => isTagsAndMatch(project, tags))
    .filter((project) => isQueryMatch(project, query))
}

function isQueryMatch(project: ProjectType, query?: string): boolean {
  if (!query) return true

  const queryLower = query.toLowerCase()
  const projectNameLower = project.title.toLowerCase()
  const projectSubtitleLower = project.subtitle?.toLowerCase()

  return Boolean(
    projectNameLower.includes(queryLower) ||
      projectSubtitleLower?.includes(queryLower),
  )
}

function isTagsAndMatch(project: ProjectType, tags: string[]) {
  const lowercaseTags = tags.map((t) => t.toLowerCase())
  const projectTags = (project.tags || []).map((t) => t.toLowerCase())

  return lowercaseTags.every((tag) => projectTags.includes(tag))
}

function isTagsOrMatch(project: ProjectType, tags: string[]) {
  const lowercaseTags = tags.map((t) => t.toLowerCase())
  const projectTags = (project.tags || []).map((t) => t.toLowerCase())

  return lowercaseTags.some((tag) => projectTags.includes(tag))
}
