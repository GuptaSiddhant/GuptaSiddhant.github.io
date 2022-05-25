import {
  getCollection,
  orderBy,
  type QueryDocumentSnapshot,
  getCollectionItem,
  FirestoreCollection,
} from "~/service/database"
import type { Testimony } from "../types"

const collectionName = FirestoreCollection.Testimonies

export async function getAllTestimonies(
  limitBy: number = 10,
): Promise<Testimony[]> {
  return getCollection(
    collectionName,
    transformDocToTestimony,
    orderBy("date", "desc"),
  ).then((list) => list.slice(0, limitBy))
}

export async function getTestimonyById(itemId: string): Promise<Testimony> {
  return getCollectionItem(collectionName, itemId, transformDocToTestimony)
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
