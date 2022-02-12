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
import { getFileURLWithPath } from "~/service/storage"

const collectionName = "projects"

export async function getAllProjects(
  limitBy: number = 10,
): Promise<ProjectType[]> {
  const draftConstraints = __IS_DEV__
    ? []
    : [where("draft", "!=", true), orderBy("draft")]

  return await getCollection(
    collectionName,
    transformDocToProject,
    ...draftConstraints,
    orderBy("dateStart", "desc"),
    limit(limitBy),
  )
}

export async function getProjectById(itemId: string) {
  return getCollectionItem(collectionName, itemId, transformDocToProject)
}

export async function setProjectById(
  itemId: string,
  data: Partial<ProjectType>,
) {
  return await setCollectionItem(collectionName, itemId, data)
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

  return {
    ...project,
    icon: newIcon,
    gallery: newGallery,
  }
}

async function toImageUrl(path: string) {
  if (path.startsWith("/") || path.startsWith("http")) return path
  return await getFileURLWithPath(path)
}

export interface ProjectType {
  id: string
  association?: string
  dateStart: string
  dateEnd?: string
  icon?: string
  externalLink?: string
  github?: string
  links?: ProjectLink[]
  content?: string

  title: string
  draft?: boolean
  featured?: boolean
  gallery?: { url: string; alt: string }[]
  tags?: string[]
  subtitle?: string
  description?: string
}

interface ProjectLink {
  url: string
  title?: string
  type?: ProjectLinkType
}

type ProjectLinkType =
  | "github"
  | "demo"
  | "blog"
  | "homepage"
  | "npm"
  | "prototype"
  | "design"
