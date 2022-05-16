import clsx from "clsx"

import type { FetcherWithComponents } from "types"

import { useSearchState } from "../store"
import usePerformEntryAction from "../hooks/usePerformEntryAction"
import type { SearchEntry, SearchFetcherData } from "../types"
import type { ComponentPropsWithoutRef } from "react"

export default function SearchResult({
  fetcher,
}: {
  fetcher: FetcherWithComponents<SearchFetcherData>
}) {
  const { entries } = useSearchState()
  const { data } = fetcher

  return (
    <ul
      className={clsx(
        "overflow-scroll h-full w-full list-none",
        "flex flex-col gap-1",
      )}
    >
      {entries.map((entry) => (
        <>
          <ResultItem key={entry.id} className="font-bold" entry={entry} />
          {data?.[entry.id as keyof SearchFetcherData]?.map(
            ({ id, title, cover }) => (
              <ResultItem
                key={entry.id + "-" + id}
                entry={{
                  id,
                  label: title,
                  href: `/${entry.id}/${id}`,
                  icon: cover,
                }}
              />
            ),
          )}
        </>
      ))}
    </ul>
  )
}

interface ResultItemProps {
  entry: SearchEntry
  className?: string
}

function ResultItem({ entry, className }: ResultItemProps): JSX.Element | null {
  const { label, shortcut } = entry

  const perform = usePerformEntryAction()

  return (
    <li className="m-1 border-b-[0.5px] border-gray-700">
      <button
        data-result
        className={clsx(
          className,
          "rounded px-3 py-2 h-full w-full",
          "hover:bg-gray-700 focus:bg-gray-700",
          "cursor-pointer",
          "flex justify-between items-center",
        )}
        onClick={() => perform(entry)}
      >
        <span>{label}</span>
        <Hotkeys keys={shortcut} />
      </button>
    </li>
  )
}

function Hotkeys({ keys }: { keys?: string[] }): JSX.Element | null {
  if (!keys?.length) return null
  return (
    <span>
      {keys.map((key) => (
        <Kbd key={key}>{key.length === 1 ? key.toUpperCase() : key}</Kbd>
      ))}
    </span>
  )
}

function Kbd(props: ComponentPropsWithoutRef<"kbd">): JSX.Element {
  return (
    <kbd
      {...props}
      className={clsx(
        " text-gray-300 bg-gray-800",
        "border-[1px] border-gray-500 shadow rounded-sm",
        "inline-block font-normal text-sm font-monospace",
        "whitespace-nowrap px-1 py-0.5 ml-1",
      )}
    />
  )
}
