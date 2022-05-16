import { type useFetcher } from "@remix-run/react"
import { type Fetcher } from "@remix-run/react/transition"

export interface Teaser {
  id: string
  title: string
  cover?: string
}

export type FetcherWithComponents<T> = ReturnType<typeof useFetcher> &
  Fetcher<T>
