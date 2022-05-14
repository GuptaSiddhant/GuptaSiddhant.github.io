import { createContext, useReducer, type Dispatch } from "react"

import type { SearchAction, SearchState } from "../types"
import { defaultState } from "./state"
import reducer from "./reducer"

export const SearchStateContext = createContext<SearchState>(defaultState)
export const SearchDispatchContext =
  createContext<Dispatch<SearchAction> | null>(null)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, defaultState)

  return (
    <SearchStateContext.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  )
}
