import { useContext } from "react"

import { SearchDispatchContext, SearchStateContext } from "./context"

export function useSearchState() {
  const state = useContext(SearchStateContext)
  if (!state) {
    throw new Error("useSearch must be used within the App")
  }
  return state
}

export function useSearchDispatch() {
  const dispatch = useContext(SearchDispatchContext)
  if (!dispatch) {
    throw new Error("useCommandPalette must be used within the App")
  }
  return dispatch
}

export * from "./actions"
