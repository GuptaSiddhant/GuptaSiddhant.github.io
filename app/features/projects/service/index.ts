import { __IS_DEV__ } from "~/helpers"
import {
  getCollection,
  getCollectionItem,
  setCollectionItem,
  orderBy,
  limit,
  draftConstraints,
  type QueryConstraint,
} from "~/service/database"

import type { ProjectType, ProjectTeaserType } from "../types"
import {
  transformDocToProject,
  transformDocToProjectWithContent,
  transformProjectToProjectTeaser,
} from "./transformers"

const INFO_COLLECTION_NAME = "info"
const COLLECTION_NAME = "projects"

export async function getAllProjects(
  limitBy: number = 100,
  constraints: QueryConstraint[] = [],
): Promise<ProjectType[]> {
  return getCollection(
    COLLECTION_NAME,
    transformDocToProject,
    ...draftConstraints,
    ...constraints,
    orderBy("dateStart", "desc"),
    limit(limitBy),
  )
}

export async function getProjectList(
  limitBy: number = 5,
): Promise<ProjectTeaserType[]> {
  return getCollectionItem(INFO_COLLECTION_NAME, COLLECTION_NAME, (docSnap) =>
    Object.values(docSnap.data())
      .map(transformProjectToProjectTeaser)
      .filter((project) => __IS_DEV__ || project.draft !== true)
      .sort((a, b) => (b.dateStart > a.dateStart ? 1 : -1))
      .slice(0, limitBy),
  )
}

export async function getProjectById(
  itemId: string,
): Promise<ProjectType | undefined> {
  return getCollectionItem(
    COLLECTION_NAME,
    itemId,
    transformDocToProjectWithContent,
  )
}

export async function getCrossSellProjects(
  project: ProjectType,
): Promise<ProjectTeaserType[]> {
  const projectList = await getProjectList(20)

  return projectList
    .filter((p) => p.id !== project.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)
}

export async function setProjectById(
  itemId: string,
  data: Partial<ProjectType>,
) {
  return setCollectionItem(COLLECTION_NAME, itemId, data)
}

export async function updateProjectList() {
  const data: Record<string, ProjectTeaserType> = (
    await getAllProjects(100, [])
  )
    .map(({ id, title, cover, dateStart, draft }) => ({
      id,
      title,
      cover,
      dateStart,
      draft,
    }))
    .reduce((acc, project) => ({ ...acc, [project.id]: project }), {})

  return setCollectionItem(INFO_COLLECTION_NAME, COLLECTION_NAME, data)
}
