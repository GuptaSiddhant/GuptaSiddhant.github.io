import { type ReactNode } from "react"

import { SearchProvider } from "./store/context"
import SearchBar from "./components/SearchBar"
import useSearchFeatureFlag from "./hooks/useSearchFeatureFlag"

export default function Search({ children }: { children: ReactNode }) {
  const isSearchEnabled = useSearchFeatureFlag()

  return (
    <SearchProvider>
      {isSearchEnabled ? <SearchBar /> : null}
      {children}
    </SearchProvider>
  )
}

export * from "./store"
export { useSearchFeatureFlag }
