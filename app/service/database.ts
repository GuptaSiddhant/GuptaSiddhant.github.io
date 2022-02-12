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
  type QueryConstraint,
} from "firebase/firestore"

import { firestoreInstance } from "./firebase"

export async function getCollection<T = DocumentData>(
  collectionName: string,
  transformDocumentSnapshot: (doc: QueryDocumentSnapshot) => T | Promise<T>,
  ...constraints: QueryConstraint[]
): Promise<T[]> {
  const queryRef = query(
    collection(firestoreInstance, collectionName),
    ...constraints,
  )
  const querySnapshot = await getDocs(queryRef)

  let items: T[] = []
  for (const docSnap of querySnapshot.docs) {
    const item = await transformDocumentSnapshot(docSnap)
    items.push(item)
  }

  return items
}

export async function getCollectionItem<T = DocumentData>(
  collectionName: string,
  itemId: string,
  transformDocumentSnapshot: (doc: QueryDocumentSnapshot) => T | Promise<T>,
): Promise<T> {
  const docRef = doc(firestoreInstance, collectionName, itemId)
  const docSnapshot = await getDoc(docRef)

  if (!docSnapshot.exists())
    throw new Error(`Entry "${collectionName}/${itemId}" not found.`)

  return await transformDocumentSnapshot(docSnapshot)
}

export async function setCollectionItem<
  T = PartialWithFieldValue<DocumentData>,
>(collectionName: string, itemId: string, data: T): Promise<string> {
  if (itemId) {
    const docRef = doc(firestoreInstance, collectionName, itemId)
    await setDoc(docRef, data, { merge: true })

    return itemId
  }

  const collectionRef = collection(firestoreInstance, collectionName)
  const docRef = await addDoc(collectionRef, data)

  return docRef.id
}

// Useful re-exports
export {
  where,
  orderBy,
  startAt,
  startAfter,
  limit,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore"
