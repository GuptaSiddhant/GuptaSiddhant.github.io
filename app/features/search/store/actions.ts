import { navigation } from "../entries"
import type { SearchAction, SearchCategory } from "../types"

export { useSearchDispatch } from "."

export function closeSearchBar(): SearchAction {
  return { open: false, searchTerm: "" }
}
export function openSearchBar(): SearchAction {
  return { open: true }
}
export function toggleSearchBarOpen(): SearchAction {
  return (state) => {
    const open = !state.open
    return {
      open,
      searchTerm: open ? "" : state.searchTerm,
    }
  }
}

export function updateSearchTerm(searchTerm: string): SearchAction {
  return (state) => ({
    searchTerm,
    results: {
      ...state.results,
      navigation: searchTerm
        ? {
            ...navigation,
            entries: navigation.entries.filter((e) =>
              [e.title.toLowerCase(), ...(e.keywords || [])].some((text) =>
                text.includes(searchTerm.toLowerCase()),
              ),
            ),
          }
        : navigation,
    },
  })
}

export function updateEntries(
  results: Record<string, SearchCategory>,
): SearchAction {
  return (state) => {
    return { results: { ...state.results, ...results } }
  }
}
