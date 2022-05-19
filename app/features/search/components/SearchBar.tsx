import { useFetcher } from "@remix-run/react"
import clsx from "clsx"
import CloseIcon from "remixicon-react/CloseCircleLineIcon"
import SearchIcon from "remixicon-react/Search2LineIcon"
import LoadingIcon from "remixicon-react/Loader4LineIcon"

import Button from "~/ui/Button"
import { InputWithRef } from "~/ui/Input"

import {
  useSearchDispatch,
  closeSearchBar,
  useSearchState,
  updateSearchTerm,
  updateEntries,
} from "../store"
import type { SearchCategory, SearchFetcherData } from "../types"
import { useEffect } from "react"

export default function SearchBar({
  inputRef,
}: {
  inputRef: React.RefObject<HTMLInputElement>
}) {
  const { searchTerm } = useSearchState()
  const dispatch = useSearchDispatch()

  const { Form, submit, state, data } = useFetcher<SearchFetcherData>()
  const isLoading = state !== "idle"

  useEffect(() => {
    if (data) {
      const results: Record<string, SearchCategory> = Object.entries(
        data,
      ).reduce(
        (acc, [key, val]) => ({
          ...acc,
          [key]: {
            title: key,
            entries: val.map((entry) => ({
              ...entry,
              icon: entry.icon || entry.cover,
              href: `/${key}/${entry.id}`,
            })),
          },
        }),
        {},
      )

      dispatch(updateEntries(results))
    }
  }, [data, dispatch])

  return (
    <Form method="get" action="/search" className="relative">
      <div
        aria-hidden="true"
        role="presentation"
        className={clsx("absolute top-0 left-0 p-2 text-gray-500")}
        onClick={() => inputRef.current?.focus()}
      >
        {isLoading ? (
          <LoadingIcon aria-label="Loading" className="animate-spin" />
        ) : (
          <SearchIcon aria-label="Search" />
        )}
      </div>

      <InputWithRef
        ref={inputRef}
        name="q"
        key={String(open)}
        value={searchTerm}
        className="w-full bg-gray-900 px-10"
        onChange={(e) => {
          dispatch(updateSearchTerm(e.target.value))
          submit(e.target.form)
        }}
      />
      <input type="hidden" name="field" value="id" />
      <input type="hidden" name="field" value="title" />
      <input type="hidden" name="field" value="subtitle" />
      <input type="hidden" name="field" value="cover" />
      <input type="hidden" name="field" value="icon" />
      <input type="hidden" name="limit" value="10" />

      <Button
        className={clsx("absolute right-0 top-0")}
        title="Close palette"
        onClick={() => dispatch(closeSearchBar())}
      >
        <CloseIcon />
        <span className="sr-only">Close palette</span>
      </Button>
    </Form>
  )
}
