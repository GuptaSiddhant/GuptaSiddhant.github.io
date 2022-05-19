import { getCollectionItem } from "~/service/database"
import { type FeatureFlags } from "./types"

export async function getAllFeatureFlags(): Promise<FeatureFlags> {
  return getCollectionItem(
    "info",
    "feature-flags",
    (docSnap) => docSnap.data() as any,
  )
}
