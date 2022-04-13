// import { __IS_DEV__ } from "~/helpers"

import type { ProjectType } from "./types"

export function filterProjectsWithQueryAndTags(
  projects: ProjectType[],
  query: string,
  tags: string[],
): ProjectType[] {
  if (!query && !tags.length) return projects

  const lowercaseTags = tags.map((t) => t.toLowerCase())

  const filteredProjects = projects.filter((project) => {
    if (query) {
      const queryLower = query.toLowerCase()
      const projectNameLower = project.title.toLowerCase()
      // const projectDescriptionLower = project.description?.toLowerCase()
      if (
        !projectNameLower.includes(queryLower)
        // && !projectDescriptionLower.includes(queryLower)
      ) {
        return false
      }
    }

    if (lowercaseTags.length) {
      const projectTags = (project.tags || []).map((t) => t.toLowerCase())
      if (!lowercaseTags.every((tag) => !projectTags.includes(tag))) {
        return false
      }
    }

    return true
  })

  return filteredProjects
}
