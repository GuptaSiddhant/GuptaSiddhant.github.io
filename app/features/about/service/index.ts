import { FirestoreCollection, getCollectionItem } from "~/service/database"
import type { About } from "../types"

export { getAllTestimonies, getTestimonyById } from "./testimonies"

const collectionName = FirestoreCollection.Info

export async function getAbout(): Promise<About> {
  return getCollectionItem(collectionName, "about", (doc) => {
    const data = doc.data()

    return { ...data, name: data.name || "Siddhant Gupta" } as About
  })
}
