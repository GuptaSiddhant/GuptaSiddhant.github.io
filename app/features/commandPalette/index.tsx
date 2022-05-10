import { type ReactNode } from "react"

import { CommandPaletteProvider } from "./store/context"
import Palette from "./components/CommandPalette"
import useCommandPaletteFeatureFlag from "./hooks/useCommandPaletteFeatureFlag"

export default function CommandPalette({ children }: { children: ReactNode }) {
  const isCommandPaletteEnabled = useCommandPaletteFeatureFlag()

  return (
    <CommandPaletteProvider>
      {isCommandPaletteEnabled ? <Palette /> : null}
      {children}
    </CommandPaletteProvider>
  )
}

export * from "./store"
export { useCommandPaletteFeatureFlag }
