import type { ReactNode } from "react"

export interface CommandPaletteState {
  open: boolean
  entries: CommandPaletteEntry[]
}

export interface CommandPaletteEntry {
  id: string
  label: string
  icon?: ReactNode
  shortcut?: string[]
  keywords?: string
  href?: string
  perform?: () => void
  entries?: CommandPaletteEntry[]
}

export type CommandPaletteAction =
  | {
      type: "TOGGLE_OPEN"
      payload?: boolean
    }
  | {
      type: "ADD_ENTRY"
      payload: CommandPaletteEntry
    }
  | {
      type: "REMOVE_ENTRY"
      payload: CommandPaletteEntry["id"]
    }
  | {
      type: "UPDATE_ENTRY"
      payload: Partial<CommandPaletteEntry>
    }
