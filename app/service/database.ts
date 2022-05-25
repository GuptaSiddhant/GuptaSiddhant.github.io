import {
  addDoc,
  collection,
  doc,
  setDoc,
  type DocumentData,
  type QueryDocumentSnapshot,
  type PartialWithFieldValue,
  type QueryConstraint,
  type QuerySnapshot,
  type DocumentSnapshot,
} from "firebase/firestore"

import cache, { createKey, CacheType } from "./cache"
import { firestore } from "./firebase"

export enum FirestoreCollection {
  Projects = "projects",
  Blog = "blog",
  Info = "info",
  Testimonies = "testimonies",
}

/** Get firestore collection of docs and transform it to a list of required item. */
export async function getCollection<T = DocumentData>(
  collectionName: FirestoreCollection,
  transformDocumentSnapshot: (doc: QueryDocumentSnapshot) => T | Promise<T>,
  ...constraints: QueryConstraint[]
): Promise<T[]> {
  // const queryRef = query(collection(firestore, collectionName), ...constraints)
  const querySnapshot = await cache.fetch<QuerySnapshot<DocumentData>>(
    createKey(CacheType.FirestoreCollection, collectionName),
  )

  return Promise.all((querySnapshot?.docs || []).map(transformDocumentSnapshot))
}

/** Get a firestore doc and transform it to required item. */
export async function getCollectionItem<T = DocumentData>(
  collectionName: FirestoreCollection,
  itemId: string,
  transformDocumentSnapshot: (doc: QueryDocumentSnapshot) => T | Promise<T>,
): Promise<T> {
  const docSnapshot = await cache.fetch<DocumentSnapshot<DocumentData>>(
    createKey(CacheType.FirestoreDocument, `${collectionName}/${itemId}`),
  )

  if (!docSnapshot?.exists())
    throw new Error(`Entry "${collectionName}/${itemId}" not found.`)

  return transformDocumentSnapshot(docSnapshot)
}

/** Create/update a firestore doc. */
export async function setCollectionItem<
  T = PartialWithFieldValue<DocumentData>,
>(
  collectionName: FirestoreCollection,
  itemId: string,
  data: T,
): Promise<string> {
  if (itemId) {
    const docRef = doc(firestore, collectionName, itemId)
    await setDoc(docRef, data, { merge: true })

    return itemId
  }

  const collectionRef = collection(firestore, collectionName)
  const docRef = await addDoc(collectionRef, data)

  return docRef.id
}

export async function updateInfoList<T extends { id: string }>(
  collectionName: FirestoreCollection,
  list: T[],
) {
  const data: Record<string, T> = list.reduce(
    (acc, item) => ({ ...acc, [item.id]: item }),
    {},
  )

  return setCollectionItem(FirestoreCollection.Info, collectionName, data)
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
