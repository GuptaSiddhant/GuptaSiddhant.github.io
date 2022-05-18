import { createContext, useReducer, type Dispatch } from "react"

import { navigation } from "../entries"
import type { SearchAction, SearchState } from "../types"

const initialState: SearchState = {
  results: { navigation },
  open: false,
  searchTerm: "",
}

export const SearchStateContext = createContext<SearchState>(initialState)
export const SearchDispatchContext =
  createContext<Dispatch<SearchAction> | null>(null)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    (state: SearchState, action: SearchAction) => ({
      ...state,
      ...(typeof action === "function" ? action(state) : action),
    }),
    initialState,
  )

  return (
    <SearchStateContext.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  )
}
