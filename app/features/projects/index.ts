import { __IS_DEV__ } from "~/helpers"
import {
  getCollection,
  getCollectionItem,
  setCollectionItem,
  orderBy,
  where,
  type QueryDocumentSnapshot,
} from "~/service/firestore"

const collectionName = "projects"

export async function getAllProjects() {
  const draftConstraints = __IS_DEV__
    ? []
    : [where("draft", "!=", true), orderBy("draft")]

  return await getCollection(
    collectionName,
    transformDocToProject,
    ...draftConstraints,
    orderBy("dateStart", "desc"),
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

function transformDocToProject(docSnap: QueryDocumentSnapshot): ProjectType {
  const data = docSnap.data()

  return {
    id: docSnap.id,
    ...data,
    code: undefined,
    dateStart: data.dateStart.toDate(),
    dateEnd: data.dateEnd?.toDate(),
  } as unknown as ProjectType
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
