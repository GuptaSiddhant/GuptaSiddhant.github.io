import { isQueryMatch, isTagsAndMatch } from "~/helpers/filter"
import type { ProjectType } from "./types"

export function filterProjectsWithQueryAndTags(
  projects: ProjectType[],
  query: string,
  selectedTags: string[],
): ProjectType[] {
  if (!query && !selectedTags.length) return projects

  return projects
    .filter((project) => isTagsAndMatch(selectedTags, project.tags))
    .filter((project) => isQueryMatch(query, project.title, project.subtitle))
}
