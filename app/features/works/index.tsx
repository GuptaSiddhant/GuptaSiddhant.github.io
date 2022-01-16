import {
  getCollection,
  getCollectionItem,
  setCollectionItem,
  type QueryDocumentSnapshot,
} from "~/service/firestore"
import { sortByDate } from "~/helpers"

const collectionName = "projects"

export async function getAllWorks() {
  const works = await getCollection(collectionName, transformDocToWorkItem)
  return works.sort((a, b) => sortByDate(a.dateEnd, b.dateEnd))
}

export async function getWorkItemById(itemId: string) {
  return getCollectionItem(collectionName, itemId, transformDocToWorkItem)
}

export async function setWorkItemById(itemId: string, data: Partial<WorkType>) {
  setCollectionItem(collectionName, itemId, data)
}

function transformDocToWorkItem(docSnap: QueryDocumentSnapshot): WorkType {
  const data = docSnap.data()

  return {
    id: docSnap.id,
    ...data,
    code: undefined,
    dateStart: data.dateStart.toDate(),
    dateEnd: data.dateEnd?.toDate(),
  } as unknown as WorkType
}

export interface WorkType {
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
