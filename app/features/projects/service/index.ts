import { __IS_DEV__ } from "~/helpers"
import {
  getCollection,
  getCollectionItem,
  setCollectionItem,
  updateInfoList,
  orderBy,
  limit,
  type QueryConstraint,
  FirestoreCollection,
} from "~/service/database"

import type { ProjectType, ProjectTeaser } from "../types"
import {
  transformDocToProject,
  transformDocToProjectWithContent,
  transformProjectToProjectTeaser,
} from "./transformers"

const collectionName = FirestoreCollection.Projects

export async function getProjectList(
  limitBy: number = 5,
): Promise<ProjectTeaser[]> {
  return getCollectionItem(
    FirestoreCollection.Info,
    collectionName,
    (docSnap) =>
      Object.values(docSnap.data())
        .filter((project) => __IS_DEV__ || project.draft !== true)
        .map((project) => ({
          ...project,
          dateStart:
            typeof project.dateStart === "string"
              ? project.dateStart
              : (project.dateStart as any).toDate(),
        }))
        .sort((a, b) => (b.dateStart > a.dateStart ? 1 : -1))
        .slice(0, limitBy),
  )
}

export async function getProjectById(
  itemId: string,
): Promise<ProjectType | undefined> {
  return getCollectionItem(
    collectionName,
    itemId,
    transformDocToProjectWithContent,
  )
}

export async function getCrossSellProjects(
  project: ProjectType,
): Promise<ProjectTeaser[]> {
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
  return setCollectionItem(collectionName, itemId, data)
}

export async function updateProjectList() {
  const data = (await getAllProjects(100)).map(transformProjectToProjectTeaser)

  return updateInfoList(collectionName, data)
}

async function getAllProjects(
  limitBy: number = 100,
  constraints: QueryConstraint[] = [],
): Promise<ProjectType[]> {
  return getCollection(
    collectionName,
    transformDocToProject,
    ...constraints,
    orderBy("dateStart", "desc"),
    limit(limitBy),
  )
}
