import { json } from "remix"

import { filterPageDraft, sortByDate } from "~/helpers"
import {
  getMdxPagesInDirectory,
  getMdxPage,
  getMdxDirList,
} from "~/service/mdx.server"
import { generateResponseForPages } from "~/service/response"
import type { LoaderFunctionProps } from "~/types"

import { getNextProject } from "./helpers"
import type { ProjectContent, ProjectData } from "./types"

const CONTENT_DIR = "projects"

export async function getAllProjects(): Promise<ProjectContent[]> {
  const projects = await getMdxPagesInDirectory<ProjectData>(CONTENT_DIR)

  return projects
    .filter(filterPageDraft)
    .sort((a, b) => sortByDate(a.data.dateEnd, b.data.dateEnd))
}

export async function getProjectById(
  id: string,
): Promise<{ project: ProjectContent; nextProject: ProjectContent | null }> {
  const dirList = await getMdxDirList(CONTENT_DIR)
  const path = dirList.find((item) => item.id === id)?.path

  if (!path) throw new Error("Project not found for id: " + id)

  const project = await getMdxPage<ProjectData>(path, id)
  const nextProject = await getNextProject(dirList, id)

  return { project, nextProject }
}

export async function generateResponseForProjects(
  request: LoaderFunctionProps["request"],
) {
  const projects = await getAllProjects()
  return json(generateResponseForPages(request, projects))
}
