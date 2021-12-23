import { json } from "remix"

import { generateResponseForPages } from "~/service/api"
import {
  getMdxPagesInDirectory,
  getMdxPage,
  getMdxDirList,
} from "~/service/mdx.server"
import { filterPageDraft, sortByDate } from "~/helpers"
import { LoaderFunctionProps } from "~/types"
import type { ProjectContent, ProjectData } from "./types"

const CONTENT_DIR = "projects"

export async function getAllProjects(): Promise<ProjectContent[]> {
  const projects = await getMdxPagesInDirectory<ProjectData>(CONTENT_DIR)

  return projects
    .filter(filterPageDraft)
    .sort((a, b) => sortByDate(a.data.dateEnd, b.data.dateEnd))
}

export async function getProjectById(id: string): Promise<ProjectContent> {
  const dirList = await getMdxDirList(CONTENT_DIR)
  const path = dirList.find((item) => item.id === id)?.path

  if (!path) throw new Error("Project not found for id: " + id)

  return getMdxPage<ProjectData>(path, id)
}

export async function generateResponseForProjects(
  request: LoaderFunctionProps["request"],
) {
  const projects = await getAllProjects()
  return json(generateResponseForPages(request, projects))
}
