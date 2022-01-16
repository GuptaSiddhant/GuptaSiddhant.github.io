import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  type DocumentData,
  type QueryDocumentSnapshot,
  type PartialWithFieldValue,
} from "firebase/firestore"
import { firestore } from "~/firebase"

export type { DocumentData, QueryDocumentSnapshot }

export async function getCollection<T = DocumentData>(
  collectionName: string,
  transformDocumentSnapshot: (doc: QueryDocumentSnapshot) => T,
): Promise<T[]> {
  const queryRef = query(collection(firestore, collectionName))
  const querySnapshot = await getDocs(queryRef)

  return querySnapshot.docs.map(transformDocumentSnapshot)
}

export async function getCollectionItem<T = DocumentData>(
  collectionName: string,
  itemId: string,
  transformDocumentSnapshot: (doc: QueryDocumentSnapshot) => T,
): Promise<T> {
  const docRef = doc(firestore, collectionName, itemId)
  const docSnapshot = await getDoc(docRef)
  if (!docSnapshot.exists())
    throw new Error(`Entry "${collectionName}/${itemId}" not found.`)

  return transformDocumentSnapshot(docSnapshot)
}

export async function setCollectionItem<
  T = PartialWithFieldValue<DocumentData>,
>(collectionName: string, itemId: string, data: T): Promise<string> {
  if (itemId) {
    const docRef = doc(firestore, collectionName, itemId)
    await setDoc(docRef, data, { merge: true })

    return itemId
  }

  console.warn("Creating new entry with auto-ID in collection:", collectionName)
  const collectionRef = collection(firestore, collectionName)
  const docRef = await addDoc(collectionRef, data)
  console.log("Document written with ID: ", docRef.id)

  return docRef.id
}
