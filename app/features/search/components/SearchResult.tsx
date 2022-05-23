import clsx from "clsx"
import { Fragment } from "react"

import { useSearchState } from "../store"
import { SearchResultHeader, EntryResultItem } from "./SearchResultItem"

export default function SearchResult() {
  const { results } = useSearchState()
  console.log(results)

  return (
    <output
      className={clsx(
        "overflow-scroll h-full w-full list-none",
        "flex flex-col relative",
      )}
    >
      {Object.entries(results).map(([id, category]) =>
        category.entries.length > 0 ? (
          <Fragment key={id}>
            <SearchResultHeader key={"category-" + id}>
              {category.title}
            </SearchResultHeader>
            {category.entries.map((entry) => (
              <EntryResultItem key={id + "-" + entry.id} entry={entry} />
            ))}
          </Fragment>
        ) : null,
      )}
    </output>
  )
}

function SearchResultsEmpty(): JSX.Element {
  return (
    <output className="flex flex-col gap-4 items-center justify-center h-full text-disabled text-lg">
      <p>No results found for your search.</p>
      <p>Try a different search term.</p>
    </output>
  )
}
