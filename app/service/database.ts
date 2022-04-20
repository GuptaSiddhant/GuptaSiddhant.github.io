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

/** Get firestore collection of docs and transform it to a list of required item. */
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

  return Promise.all(querySnapshot.docs.map(transformDocumentSnapshot))
}

/** Get a firestore doc and transform it to required item. */
export async function getCollectionItem<T = DocumentData>(
  collectionName: string,
  itemId: string,
  transformDocumentSnapshot: (doc: QueryDocumentSnapshot) => T | Promise<T>,
): Promise<T> {
  const docRef = doc(firestoreInstance, collectionName, itemId)
  const docSnapshot = await getDoc(docRef)

  if (!docSnapshot.exists())
    throw new Error(`Entry "${collectionName}/${itemId}" not found.`)

  return transformDocumentSnapshot(docSnapshot)
}

/** Create/update a firestore doc. */
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
