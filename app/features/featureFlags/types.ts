export enum FeatureFlag {
  CommandPalette = "command-palette",
  CommandPaletteDev = "command-palette-dev",
}

export interface FeatureFlags extends Record<FeatureFlag, boolean> {}
