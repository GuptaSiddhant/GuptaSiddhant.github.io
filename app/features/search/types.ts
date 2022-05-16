import type { ReactNode } from "react"
import type { Teaser } from "types"

export interface SearchState {
  open: boolean
  entries: SearchEntry[]
  searchTerm: string
}

export interface SearchEntry {
  id: string
  label: string
  icon?: ReactNode
  shortcut?: string[]
  keywords?: string
  href?: string
  perform?: () => void
  entries?: SearchEntry[]
}

export type SearchAction =
  | {
      type: "TOGGLE_OPEN"
      payload?: boolean
    }
  | {
      type: "ADD_ENTRY"
      payload: SearchEntry
    }
  | {
      type: "REMOVE_ENTRY"
      payload: SearchEntry["id"]
    }
  | {
      type: "UPDATE_ENTRY"
      payload: Partial<SearchEntry>
    }
  | {
      type: "UPDATE_SEARCH_TERM"
      payload: string
    }

export type SearchFetcherData = Record<"blog" | "projects", Teaser[]>
