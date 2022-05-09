import { createContext, useContext } from "react"
import { __IS_DEV__ } from "~/helpers"
import { type FeatureFlag, type FeatureFlags } from "./types"

export const FeatureFlagsContext = createContext<FeatureFlags | undefined>(
  undefined,
)

export function useFeatureFlags(): FeatureFlags {
  const context = useContext(FeatureFlagsContext)
  if (!context) {
    throw new Error(
      "useFeatureFlags must be used within a FeatureFlagsProvider",
    )
  }

  return context
}

export function useFeatureFlag(id: FeatureFlag, devId?: FeatureFlag): boolean {
  const flagId = __IS_DEV__ && devId ? devId : id

  return useFeatureFlags()[flagId]
}
