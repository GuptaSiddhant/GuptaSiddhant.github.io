import LRUCache from "lru-cache"

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
import type { Teaser } from "~/types"

import type { ProjectType, ProjectTeaser } from "../types"
import {
  transformDocToProject,
  transformDocToProjectWithContent,
  transformProjectToProjectTeaser,
} from "./transformers"

const INFO_COLLECTION_NAME = "info"
const COLLECTION_NAME = "projects"

let projectListCache =
  global.projectListCache ||
  (global.projectListCache = new LRUCache<string, Teaser[]>({
    max: 100,
    ttl: 1000 * 60 * 60 * 24, // 1 day
    fetchMethod,
  }))

function fetchMethod(key: string) {
  switch (key) {
    case "list": {
      console.log("fetching new projects list...")
      return getCollectionItem(
        INFO_COLLECTION_NAME,
        COLLECTION_NAME,
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
            .sort((a, b) => (b.dateStart > a.dateStart ? 1 : -1)),
      )
    }
  }
}

export async function getProjectList(
  limitBy: number = 5,
): Promise<ProjectTeaser[]> {
  return (
    ((await projectListCache.fetch("list")) || []) as ProjectTeaser[]
  ).slice(0, limitBy)
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
  return setCollectionItem(COLLECTION_NAME, itemId, data)
}

export async function updateProjectList() {
  const data: Record<string, ProjectTeaser> = (await getAllProjects(100))
    .map(transformProjectToProjectTeaser)
    .reduce((acc, project) => ({ ...acc, [project.id]: project }), {})

  return setCollectionItem(INFO_COLLECTION_NAME, COLLECTION_NAME, data)
}

async function getAllProjects(
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