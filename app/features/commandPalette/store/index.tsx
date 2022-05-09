import { useContext } from "react"

import {
  CommandPaletteDispatchContext,
  CommandPaletteStateContext,
} from "./context"

export function useCommandPaletteState() {
  const state = useContext(CommandPaletteStateContext)
  if (!state) {
    throw new Error("useCommandPalette must be used within the App")
  }
  return state
}

export function useCommandPaletteDispatch() {
  const dispatch = useContext(CommandPaletteDispatchContext)
  if (!dispatch) {
    throw new Error("useCommandPalette must be used within the App")
  }
  return dispatch
}

export * from "./actions"
