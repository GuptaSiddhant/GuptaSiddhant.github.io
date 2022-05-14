export enum FeatureFlag {
  Search = "search",
  SearchDev = "search-dev",
}

export interface FeatureFlags extends Record<FeatureFlag, boolean> {}
