import { createContext, useReducer, type Dispatch } from "react"

import { defaultEntries } from "./entries"
import reducer from "./reducer"
import type { SearchAction, SearchState } from "../types"

const initialState: SearchState = {
  entries: defaultEntries,
  open: false,
  searchTerm: "",
}

export const SearchStateContext = createContext<SearchState>(initialState)
export const SearchDispatchContext =
  createContext<Dispatch<SearchAction> | null>(null)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <SearchStateContext.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchStateContext.Provider>
  )
}
