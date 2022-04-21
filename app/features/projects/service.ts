import { cleanupText, __IS_DEV__ } from "~/helpers"
import {
  getCollection,
  getCollectionItem,
  setCollectionItem,
  orderBy,
  limit,
  where,
  type QueryDocumentSnapshot,
} from "~/service/database"
import { convertImageLinksInText, toImageUrl } from "~/service/image"

import type { ProjectType } from "./types"

const COLLECTION_NAME = "projects"

export async function getAllProjects(
  limitBy: number = 100,
): Promise<ProjectType[]> {
  const draftConstraints = __IS_DEV__ ? [] : [where("draft", "!=", true)]

  return getCollection(
    COLLECTION_NAME,
    transformDocToProjectLimited,
    ...draftConstraints,
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

export async function setProjectById(
  itemId: string,
  data: Partial<ProjectType>,
) {
  return setCollectionItem(COLLECTION_NAME, itemId, data)
}

// Helpers

async function transformDocToProjectLimited(docSnap: QueryDocumentSnapshot) {
  const project = docSnapToProject(docSnap)

  const [icon, gallery] = await Promise.all([
    convertProjectIconUrl(project),
    convertProjectGalleryUrls(project),
  ])

  return {
    ...project,
    icon,
    gallery,
  }
}

async function transformDocToProjectWithDetails(
  docSnap: QueryDocumentSnapshot,
): Promise<ProjectType> {
  const project = docSnapToProject(docSnap)

  const [icon, gallery, content] = await Promise.all([
    convertProjectIconUrl(project),
    convertProjectGalleryUrls(project),
    convertProjectContentUrls(project),
  ])

  return {
    ...project,
    icon,
    gallery,
    content: cleanupText(content),
  }
}

function docSnapToProject(docSnap: QueryDocumentSnapshot): ProjectType {
  const data = docSnap.data()

  return {
    ...data,
    id: docSnap.id,
    dateStart: data.dateStart.toDate(),
    dateEnd: data.dateEnd?.toDate(),
    code: undefined,
  } as unknown as ProjectType
}

async function convertProjectIconUrl(
  project: ProjectType,
): Promise<string | undefined> {
  return project.icon ? toImageUrl(project.icon) : undefined
}

async function convertProjectGalleryUrls(
  project: ProjectType,
): Promise<ProjectType["gallery"]> {
  return Promise.all(
    (project.gallery || []).map(async (i) => ({
      ...i,
      url: await toImageUrl(i.url),
    })),
  )
}

async function convertProjectContentUrls(
  project: ProjectType,
): Promise<string | undefined> {
  return project.content ? convertImageLinksInText(project.content) : undefined
}
