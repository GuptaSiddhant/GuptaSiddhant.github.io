import clsx from "clsx"
import { Fragment, useMemo } from "react"

import type { FetcherWithComponents } from "types"

import { useSearchState } from "../store"
import type { SearchFetcherData, SearchEntry } from "../types"
import {
  SearchResultHeader,
  SearchResultItem,
  EntryResultItem,
} from "./SearchResultItem"

export default function SearchResult({
  fetcher,
}: {
  fetcher: FetcherWithComponents<SearchFetcherData>
}) {
  const { entries, searchTerm } = useSearchState()
  const { data, state } = fetcher
  const isLoading = state === "loading"

  const hasSearchData = useMemo(() => {
    if (isLoading) return true
    if (!data) return false
    for (const key in data) {
      if (data[key as keyof SearchFetcherData].length) return true
    }
    return false
  }, [data, isLoading])

  return (
    <nav
      className={clsx(
        "overflow-scroll h-full w-full list-none",
        "flex flex-col relative",
      )}
    >
      {searchTerm.length > 0 ? (
        data && hasSearchData ? (
          <SearchResultsList {...data} />
        ) : (
          <>
            <SearchResultsEmpty />
            <EntriesList entries={entries} />
          </>
        )
      ) : (
        <EntriesList entries={entries} />
      )}
    </nav>
  )
}

function EntriesList({ entries }: { entries: SearchEntry[] }) {
  return (
    <>
      {entries.map((entry) => (
        <EntryResultItem key={entry.id} className="font-bold" entry={entry} />
      ))}
    </>
  )
}

function SearchResultsList(data: SearchFetcherData): JSX.Element {
  return (
    <>
      {Object.entries(data).map(([key, list]) =>
        list.length > 0 ? (
          <Fragment key={"header-" + key}>
            <SearchResultHeader key={"header-" + key}>
              {key.toUpperCase()}
            </SearchResultHeader>
            {list.map((item) => (
              <SearchResultItem
                key={key + "-" + item.id}
                baseLink={`/${key}/`}
                {...item}
              />
            ))}
          </Fragment>
        ) : null,
      )}
    </>
  )
}

function SearchResultsEmpty(): JSX.Element {
  return (
    <output className="flex flex-col gap-4 items-center justify-center h-full text-gray-500 text-lg">
      <p>No results found for your search.</p>
      <p>Try a different search term.</p>
    </output>
  )
}
