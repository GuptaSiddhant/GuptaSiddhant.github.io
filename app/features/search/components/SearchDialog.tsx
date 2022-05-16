import { Dialog } from "@reach/dialog"
import { useFetcher } from "@remix-run/react"
import clsx from "clsx"
import { useRef } from "react"

import { useSearchDispatch, useSearchState, closeSearchBar } from "../store"
import useKeydown from "../hooks/useKeydown"
import type { SearchFetcherData } from "../types"
import SearchBar from "./SearchBar"
import SearchResult from "./SearchResult"

export default function SearchDialog() {
  const { open } = useSearchState()
  const dispatch = useSearchDispatch()

  const searchFetcher = useFetcher<SearchFetcherData>()
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useKeydown(containerRef, inputRef)

  return (
    <Dialog
      ref={containerRef}
      isOpen={open}
      onDismiss={() => dispatch(closeSearchBar())}
      initialFocusRef={inputRef}
      aria-label="SearchBar"
      className={clsx(
        "animate-appear relative",
        "bg-gray-800 p-4 rounded-lg mx-4 md:mx-auto",
        "flex gap-4 flex-col md:w-[60vw] max-h-full",
        "mt-[5vh] md:mt-[10vh] h-[90vh] sm:h-[60vh]",
      )}
    >
      <SearchBar fetcher={searchFetcher} inputRef={inputRef} />
      <SearchResult fetcher={searchFetcher} />
    </Dialog>
  )
}
