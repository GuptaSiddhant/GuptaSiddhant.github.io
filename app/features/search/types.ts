import type { ReactNode } from "react"
import type { Teaser } from "types"

export interface SearchState {
  open: boolean
  searchTerm: string
  results: Record<string, SearchCategory>
}

export interface SearchCategory {
  title: string
  entries: SearchEntry[]
}

export interface SearchEntry {
  id: string
  title: string
  subtitle?: string
  icon?: ReactNode
  shortcut?: string[]
  keywords?: string[]
  href?: string
  perform?: () => void
}

export type SearchAction =
  | Partial<SearchState>
  | ((state: SearchState) => Partial<SearchState>)

export type SearchFetcherData = Record<"blog" | "projects", Teaser[]>
