import clsx from "clsx"
import CloseIcon from "remixicon-react/CloseCircleLineIcon"

import Button from "ui/Button"
import { InputWithRef } from "ui/Input"
import type { FetcherWithComponents } from "types"

import { useSearchDispatch, closeSearchBar, updateSearchTerm } from "../store"
import type { SearchFetcherData } from "../types"

export default function SearchBar({
  fetcher,
  inputRef,
}: {
  fetcher: FetcherWithComponents<SearchFetcherData>
  inputRef: React.RefObject<HTMLInputElement>
}) {
  const { Form, submit } = fetcher
  const dispatch = useSearchDispatch()

  return (
    <Form method="get" action="/search">
      <input type="hidden" name="field" value="id" />
      <input type="hidden" name="field" value="title" />
      <input type="hidden" name="field" value="cover" />
      <input type="hidden" name="field" value="icon" />
      <input type="hidden" name="limit" value="10" />
      <InputWithRef
        ref={inputRef}
        name="q"
        key={String(open)}
        defaultValue={""}
        className="w-full bg-gray-900"
        onChange={(e) => {
          dispatch(updateSearchTerm(e.target.value))
          submit(e.target.form)
        }}
      />
      <Button
        className={clsx("absolute right-3.5 sm:right-4 top-3.5 sm:top-4")}
        title="Close palette"
        onClick={() => dispatch(closeSearchBar())}
      >
        <CloseIcon />
        <span className="sr-only">Close palette</span>
      </Button>
    </Form>
  )
}
