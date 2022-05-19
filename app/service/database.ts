import {
  getFirestore,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  orderBy,
  type DocumentData,
  type QueryDocumentSnapshot,
  type PartialWithFieldValue,
  type QueryConstraint,
} from "firebase/firestore"

import { __IS_DEV__ } from "~/helpers"
import firebaseApp from "./firebase"

const firestore = getFirestore(firebaseApp)

/** Get firestore collection of docs and transform it to a list of required item. */
export async function getCollection<T = DocumentData>(
  collectionName: string,
  transformDocumentSnapshot: (doc: QueryDocumentSnapshot) => T | Promise<T>,
  ...constraints: QueryConstraint[]
): Promise<T[]> {
  const queryRef = query(collection(firestore, collectionName), ...constraints)
  const querySnapshot = await getDocs(queryRef)

  return Promise.all(querySnapshot.docs.map(transformDocumentSnapshot))
}

/** Get a firestore doc and transform it to required item. */
export async function getCollectionItem<T = DocumentData>(
  collectionName: string,
  itemId: string,
  transformDocumentSnapshot: (doc: QueryDocumentSnapshot) => T | Promise<T>,
): Promise<T> {
  const docRef = doc(firestore, collectionName, itemId)
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
    const docRef = doc(firestore, collectionName, itemId)
    await setDoc(docRef, data, { merge: true })

    return itemId
  }

  const collectionRef = collection(firestore, collectionName)
  const docRef = await addDoc(collectionRef, data)

  return docRef.id
}

// Useful re-exports
export {
  endAt,
  endBefore,
  limit,
  orderBy,
  startAfter,
  startAt,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
  type QueryConstraint,
} from "firebase/firestore"

export const draftConstraints = __IS_DEV__
  ? []
  : [where("draft", "!=", true), orderBy("draft")]
