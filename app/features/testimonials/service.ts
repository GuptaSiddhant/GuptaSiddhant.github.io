import { __IS_DEV__ } from "~/helpers"
import {
  getCollection,
  orderBy,
  limit,
  where,
  type QueryDocumentSnapshot,
} from "~/service/database"
import type { Testimony } from "./types"

const COLLECTION_NAME = "testimonies"

export async function getAllTestimonies(
  limitBy: number = 10,
): Promise<Testimony[]> {
  const draftConstraints = __IS_DEV__
    ? []
    : [where("draft", "!=", true), orderBy("draft")]

  return getCollection(
    COLLECTION_NAME,
    transformDocToTestimony,
    ...draftConstraints,
    orderBy("date", "desc"),
    limit(limitBy),
  )
}

// Helpers

function transformDocToTestimony(docSnap: QueryDocumentSnapshot): Testimony {
  const data = docSnap.data()
  return {
    ...data,
    id: docSnap.id,
    date: data.date?.toDate(),
  } as unknown as Testimony
}

// function generateId({ id, association, title }: Testimony) {
//   return (
//     id ||
//     [association, title]
//       .filter(Boolean)
//       .join(" ")
//       .toLowerCase()
//       .normalize("NFD")
//       .replace(/[\u0300-\u036f]/g, "")
//       .replace(/\s/g, "-")
//   )
// }

// export async function uploadTestimonies() {
//   testimonies.forEach((testimony) => {
//     setCollectionItem(COLLECTION_NAME, generateId(testimony), {
//       ...testimony,
//       date: new Date(testimony.date),
//     })
//   })
// }
