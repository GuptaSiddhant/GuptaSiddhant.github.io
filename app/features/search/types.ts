import type { ReactNode } from "react"
import type { Teaser } from "types"

export interface SearchState {
  open: boolean
  entries: SearchEntry[]
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

export interface SearchFetcherData {
  blog: SearchFetcherDataValue
  projects: SearchFetcherDataValue
}

export type SearchFetcherDataKey = "id" | "title" | "cover"
export type SearchFetcherDataValue<
  T extends keyof Teaser = SearchFetcherDataKey,
> = Array<Pick<Teaser, T>>
