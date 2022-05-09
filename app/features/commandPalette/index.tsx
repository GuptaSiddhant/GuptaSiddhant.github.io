import dialogStyles from "@reach/dialog/styles.css"
import { type ReactNode } from "react"

import { CommandPaletteProvider } from "./store/context"
import Palette from "./components/CommandPalette"
import { FeatureFlag, useFeatureFlag } from "../featureFlags"

export default function CommandPalette({ children }: { children: ReactNode }) {
  const isCommandPaletteEnabled = useFeatureFlag(
    FeatureFlag.CommandPalette,
    FeatureFlag.CommandPaletteDev,
  )

  return (
    <CommandPaletteProvider>
      {isCommandPaletteEnabled ? <Palette /> : null}
      {children}
    </CommandPaletteProvider>
  )
}

export * from "./store"
export { dialogStyles }
