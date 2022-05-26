import {
  FirestoreCollection,
  getCollectionItem,
  getCollection,
} from "~/service/database"
import type { About, Career, Education } from "../types"

export { getAllTestimonies, getTestimonyById } from "./testimonies"

const collectionName = FirestoreCollection.Info

export async function getAbout(): Promise<About> {
  return getCollectionItem(collectionName, "about", (doc) => {
    const data = doc.data()

    return { ...data, name: data.name || "Siddhant Gupta" } as About
  })
}

export async function getAllEducation() {
  return getCollection<Education>(FirestoreCollection.Education)
}

export async function getAllCareer() {
  return getCollection<Career>(FirestoreCollection.Career)
}
