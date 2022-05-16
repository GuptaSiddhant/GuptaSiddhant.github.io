import { type ReactNode } from "react"

import { SearchProvider } from "./store/context"
import SearchDialog from "./components/SearchDialog"
import useSearchFeatureFlag from "./hooks/useSearchFeatureFlag"

export default function Search({ children }: { children: ReactNode }) {
  const isSearchEnabled = useSearchFeatureFlag()

  return (
    <SearchProvider>
      {isSearchEnabled ? <SearchDialog /> : null}
      {children}
    </SearchProvider>
  )
}

export * from "./store"
export {
  type SearchFetcherData,
  type SearchFetcherDataValue,
  type SearchFetcherDataKey,
} from "./types"
export { useSearchFeatureFlag }
