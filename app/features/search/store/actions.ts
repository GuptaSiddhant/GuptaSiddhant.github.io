import type { SearchAction, SearchEntry } from "../types"

export { useSearchDispatch } from "."

export function closeSearchBar(): SearchAction {
  return { type: "TOGGLE_OPEN", payload: false }
}
export function openSearchBar(): SearchAction {
  return { type: "TOGGLE_OPEN", payload: true }
}
export function toggleSearchBarOpen(): SearchAction {
  return { type: "TOGGLE_OPEN" }
}

export function addEntry(entry: SearchEntry): SearchAction {
  return { type: "ADD_ENTRY", payload: entry }
}
export function updateEntry(entry: Partial<SearchEntry>): SearchAction {
  return { type: "UPDATE_ENTRY", payload: entry }
}
export function removeEntry(entry: SearchEntry | string): SearchAction {
  return {
    type: "REMOVE_ENTRY",
    payload: typeof entry === "string" ? entry : entry.id,
  }
}

export function updateSearchTerm(value: string): SearchAction {
  return { type: "UPDATE_SEARCH_TERM", payload: value }
}
