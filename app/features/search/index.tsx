import { type ReactNode } from "react"

import { SearchProvider } from "./store/context"
import SearchDialog from "./components/SearchDialog"

export default function Search({ children }: { children: ReactNode }) {
  return (
    <SearchProvider>
      <SearchDialog />
      {children}
    </SearchProvider>
  )
}

export * from "./store"
export { type SearchFetcherData } from "./types"
