import {
  getCollection,
  getCollectionItem,
  setCollectionItem,
  orderBy,
  limit,
  startAfter,
  draftConstraints,
  type QueryConstraint,
} from "~/service/database"

import type { ProjectType, ProjectTypeMinimal } from "../types"
import {
  transformDocToProjectLimited,
  transformDocToProjectMinimal,
  transformDocToProjectWithDetails,
} from "./transformers"

const COLLECTION_NAME = "projects"

export async function getAllProjects(
  limitBy: number = 100,
  constraints: QueryConstraint[] = [],
): Promise<ProjectType[]> {
  return getCollection(
    COLLECTION_NAME,
    transformDocToProjectLimited,
    ...draftConstraints,
    ...constraints,
    orderBy("dateStart", "desc"),
    limit(limitBy),
  )
}

export async function getAllProjectsMinimal(
  limitBy: number = 100,
  constraints: QueryConstraint[] = [],
): Promise<ProjectTypeMinimal[]> {
  return getCollection(
    COLLECTION_NAME,
    transformDocToProjectMinimal,
    ...draftConstraints,
    ...constraints,
    orderBy("dateStart", "desc"),
    limit(limitBy),
  )
}

export async function getProjectById(
  itemId: string,
): Promise<ProjectType | undefined> {
  return getCollectionItem(
    COLLECTION_NAME,
    itemId,
    transformDocToProjectWithDetails,
  )
}

export async function getCrossSellProjects(
  project: ProjectType,
): Promise<ProjectTypeMinimal[]> {
  const nextProjects = getSiblingProjects(project)
  const prevProjects = getSiblingProjects(project, true)

  return (await Promise.all([prevProjects, nextProjects])).flatMap(
    (project) => project,
  )
}

export async function getSiblingProjects(
  project: ProjectType,
  prev: boolean = false,
  limitBy: number = 2,
): Promise<ProjectTypeMinimal[]> {
  return getCollection(
    COLLECTION_NAME,
    transformDocToProjectMinimal,
    ...draftConstraints,
    orderBy("dateStart", prev ? "desc" : "asc"),
    startAfter(project.dateStart),
    limit(limitBy),
  )
}

export async function setProjectById(
  itemId: string,
  data: Partial<ProjectType>,
) {
  return setCollectionItem(COLLECTION_NAME, itemId, data)
}
