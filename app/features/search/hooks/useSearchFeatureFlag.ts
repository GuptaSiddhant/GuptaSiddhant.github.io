import { FeatureFlag, useFeatureFlag } from "f-featureFlags"

export default function useSearchFeatureFlag(): boolean {
  return useFeatureFlag(FeatureFlag.Search, FeatureFlag.SearchDev)
}
