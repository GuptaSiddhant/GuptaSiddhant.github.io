import { createContext, useContext } from "react"
import { __IS_DEV__ } from "~/helpers"
import { type FeatureFlag, type FeatureFlags } from "./types"

export const FeatureFlagsContext = createContext<FeatureFlags | undefined>(
  undefined,
)

export function useFeatureFlags(): FeatureFlags | undefined {
  return useContext(FeatureFlagsContext)
}

export function useFeatureFlag(id: FeatureFlag, devId?: FeatureFlag): boolean {
  const flags = useFeatureFlags()
  if (!flags) return false

  const flagId = __IS_DEV__ && devId ? devId : id
  return flags[flagId]
}
