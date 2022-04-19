import { __IS_DEV__ } from "~/helpers"
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

const collectionName = "projects"

export async function getAllProjects(
  limitBy: number = 10,
): Promise<ProjectType[]> {
  const draftConstraints = __IS_DEV__
    ? []
    : [where("draft", "!=", true), orderBy("draft")]

  return getCollection(
    collectionName,
    transformDocToProject,
    ...draftConstraints,
    orderBy("dateStart", "desc"),
    limit(limitBy),
  )
}

export async function getProjectById(
  itemId: string,
): Promise<ProjectType | undefined> {
  return getCollectionItem(collectionName, itemId, transformDocToProject)
}

export async function setProjectById(
  itemId: string,
  data: Partial<ProjectType>,
) {
  return setCollectionItem(collectionName, itemId, data)
}

async function transformDocToProject(
  docSnap: QueryDocumentSnapshot,
): Promise<ProjectType> {
  const data = docSnap.data()
  const project = {
    id: docSnap.id,
    ...data,
    code: undefined,
    dateStart: data.dateStart.toDate(),
    dateEnd: data.dateEnd?.toDate(),
  } as unknown as ProjectType

  const newIcon = project.icon ? await toImageUrl(project.icon) : undefined
  const newGallery = await Promise.all(
    (project.gallery || []).map(async (i) => ({
      ...i,
      url: await toImageUrl(i.url),
    })),
  )
  const newContent = project.content
    ? await convertImageLinksInText(project.content)
    : undefined

  return {
    ...project,
    icon: newIcon,
    gallery: newGallery,
    content: newContent,
  }
}
