import { type ReactNode } from "react"
import dialogStyles from "@reach/dialog/styles.css"

import { CommandPaletteProvider } from "./store/context"
import Palette from "./components/CommandPalette"

export default function CommandPalette({ children }: { children: ReactNode }) {
  return (
    <CommandPaletteProvider>
      <Palette />
      {children}
    </CommandPaletteProvider>
  )
}

export * from "./store"
export { dialogStyles }
