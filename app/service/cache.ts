import { collection, doc, getDoc, getDocs, query } from "firebase/firestore"
import LRUCache from "lru-cache"

import { firestore } from "./firebase"

export enum CacheType {
  FirestoreCollection = "firestoreCollection",
  FirestoreDocument = "firestoreDocument",
}

const _1_DAY_IN_MS_ = 1_000 * 60 * 60 * 24
const cacheTtlInMs =
  Number.parseInt(process.env?.CACHE_TTL || "0", 10) || _1_DAY_IN_MS_

const keySeparator = "---"

async function fetchMethod(key: string): Promise<any> {
  console.log("[Fetching]", key)
  const [type, path] = key.split(keySeparator)

  switch (type) {
    case CacheType.FirestoreCollection: {
      return await getDocs(query(collection(firestore, path)))
    }
    case CacheType.FirestoreDocument: {
      return await getDoc(doc(firestore, path))
    }
    default:
      return undefined
  }
}

const cache =
  global.cache ||
  (global.cache = new LRUCache<string, any>({
    max: 100,
    ttl: cacheTtlInMs,
    fetchMethod,
  }))

export default cache

export function createKey(type: CacheType, value: string) {
  return [type, value].join(keySeparator)
}
