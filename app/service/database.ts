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
import { logToFirebase } from "./analytics"

function logFirestoreEvent(eventParams: {
  collectionName: string
  itemId?: string
  type: "new" | "update" | "get" | "delete" | "get-all"
}) {
  logToFirebase("firestore_event", eventParams)
}

export async function getCollection<T = DocumentData>(
  collectionName: string,
  transformDocumentSnapshot: (doc: QueryDocumentSnapshot) => T,
  ...constraints: QueryConstraint[]
): Promise<T[]> {
  const queryRef = query(
    collection(firestoreInstance, collectionName),
    ...constraints,
  )
  const querySnapshot = await getDocs(queryRef)
  logFirestoreEvent({ collectionName, type: "get-all" })

  return querySnapshot.docs.map(transformDocumentSnapshot)
}

export async function getCollectionItem<T = DocumentData>(
  collectionName: string,
  itemId: string,
  transformDocumentSnapshot: (doc: QueryDocumentSnapshot) => T,
): Promise<T> {
  const docRef = doc(firestoreInstance, collectionName, itemId)
  const docSnapshot = await getDoc(docRef)
  logFirestoreEvent({ collectionName, type: "get", itemId })
  if (!docSnapshot.exists())
    throw new Error(`Entry "${collectionName}/${itemId}" not found.`)

  return transformDocumentSnapshot(docSnapshot)
}

export async function setCollectionItem<
  T = PartialWithFieldValue<DocumentData>,
>(collectionName: string, itemId: string, data: T): Promise<string> {
  if (itemId) {
    const docRef = doc(firestoreInstance, collectionName, itemId)
    await setDoc(docRef, data, { merge: true })
    logFirestoreEvent({ collectionName, type: "update", itemId })

    return itemId
  }

  const collectionRef = collection(firestoreInstance, collectionName)
  const docRef = await addDoc(collectionRef, data)
  logFirestoreEvent({ collectionName, type: "new", itemId: docRef.id })

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
