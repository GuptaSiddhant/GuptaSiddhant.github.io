import { createContext, useReducer, type Dispatch } from "react"

import type { CommandPaletteAction, CommandPaletteState } from "../types"
import { defaultState } from "./state"
import reducer from "./reducer"

export const CommandPaletteStateContext =
  createContext<CommandPaletteState>(defaultState)
export const CommandPaletteDispatchContext =
  createContext<Dispatch<CommandPaletteAction> | null>(null)

export function CommandPaletteProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, dispatch] = useReducer(reducer, defaultState)

  return (
    <CommandPaletteStateContext.Provider value={state}>
      <CommandPaletteDispatchContext.Provider value={dispatch}>
        {children}
      </CommandPaletteDispatchContext.Provider>
    </CommandPaletteStateContext.Provider>
  )
}
