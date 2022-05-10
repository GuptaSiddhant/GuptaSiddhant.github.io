import { FeatureFlag, useFeatureFlag } from "~/features/featureFlags"

export default function useCommandPaletteFeatureFlag(): boolean {
  return useFeatureFlag(
    FeatureFlag.CommandPalette,
    FeatureFlag.CommandPaletteDev,
  )
}
