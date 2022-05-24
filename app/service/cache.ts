import { collection, doc, getDoc, getDocs, query } from "firebase/firestore"
import LRUCache from "lru-cache"

import { firestore } from "./firebase"

const cache =
  global.cache ||
  (global.cache = new LRUCache<string, any>({
    max: 100,
    ttl: 1000 * 60 * 60 * 24, // 1 day
    fetchMethod,
  }))

export default cache

export enum CacheType {
  Collection = "collection",
  Document = "document",
}

const keySeparator = "---"
export function createKey(type: CacheType, value: string) {
  return [type, value].join(keySeparator)
}

async function fetchMethod(key: string) {
  console.log("[Fetching]", key)
  const [type, path] = key.split(keySeparator)

  switch (type) {
    case CacheType.Collection: {
      return await getDocs(query(collection(firestore, path)))
    }
    case CacheType.Document: {
      return await getDoc(doc(firestore, path))
    }
    default:
      return undefined
  }
}
