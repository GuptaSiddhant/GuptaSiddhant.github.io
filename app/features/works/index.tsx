import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  type QueryDocumentSnapshot,
} from "firebase/firestore"
import { firestore } from "~/firebase"
import { sortByDate } from "~/helpers"

const COLLECTION_NAME = "projects"

export async function getAllWorks() {
  const queryRef = query(collection(firestore, COLLECTION_NAME))
  const querySnapshot = await getDocs(queryRef)
  const works = querySnapshot.docs.map(firestoreDocToWorkItem)
  const sortedWorks = works.sort((a, b) => sortByDate(a.dateEnd, b.dateEnd))

  return sortedWorks
}

export async function getWorkItemById(id: string) {
  const docRef = doc(firestore, COLLECTION_NAME, id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return firestoreDocToWorkItem(docSnap)
  } else {
    throw new Error("Project (" + id + ") not found.")
  }
}

export async function setWorkItemById(id: string, data: Partial<WorkType>) {
  const docRef = doc(firestore, COLLECTION_NAME, id)
  setDoc(docRef, data, { merge: true })
}

function firestoreDocToWorkItem(doc: QueryDocumentSnapshot): WorkType {
  const data = doc.data()

  return {
    id: doc.id,
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
