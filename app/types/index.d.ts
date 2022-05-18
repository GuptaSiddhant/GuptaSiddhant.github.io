import { type useFetcher } from "@remix-run/react"
import { type Fetcher } from "@remix-run/react/transition"

export interface Teaser {
  id: string
  title: string
  subtitle?: string
  cover?: string
  icon?: string
}

export type FetcherWithComponents<T> = ReturnType<typeof useFetcher> &
  Fetcher<T>
