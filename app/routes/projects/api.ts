import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import {
  filterProjectsWithQueryAndTags,
  getProjectList,
  getProjectById,
  updateProjectList,
  type ProjectType,
} from "f-projects"
import { getUniqueTagsFromObjects } from "helpers"
import { errorResponse } from "helpers/api"
import { type FilterDataType } from "ui/Filter"

/** Projects API endpoint. */
export const loader: LoaderFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url)

  const id = searchParams.get("id")
  const query = searchParams.get("q") || ""
  const selectedTags =
    searchParams.get("tags")?.split(",") || searchParams.getAll("tag") || []

  if (id) {
    return getProjectById(id).catch(() =>
      errorResponse(`Project with id '${id}' not found.`),
    )
  }

  const projects = await getProjectList()
  const allTags = getUniqueTagsFromObjects(projects)
  const filteredProjects = filterProjectsWithQueryAndTags(
    projects,
    query,
    selectedTags,
  )
  const availableTags = getUniqueTagsFromObjects(filteredProjects)

  return {
    projects: filteredProjects,
    allTags,
    availableTags,
    query,
    selectedTags,
  }
}

export const action: ActionFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")

  switch (type) {
    case "updateProjectList":
      return updateProjectList()
    default:
      return errorResponse(`Unknown action type '${type}'`)
  }
}

export function CatchBoundary() {}

export interface ProjectsAPIResponse extends FilterDataType {
  projects: ProjectType[]
  allTags: string[]
}
