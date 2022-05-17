export enum FeatureFlag {}
// Search = "search",

export interface FeatureFlags extends Record<FeatureFlag, boolean> {}
