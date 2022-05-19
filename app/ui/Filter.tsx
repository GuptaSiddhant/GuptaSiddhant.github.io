import { useCallback } from "react"

import type { FetcherWithComponents } from "~/types"

import Input from "./Input"
import Section from "./Section"
import Tags from "./Tags"
import { type PropsWithChildren } from "./types"

export interface FilterDataType {
  availableTags: string[]
  query: string
  selectedTags: string[]
}

export interface FilterProps<T = any> {
  tags: string[]
  fetcher: FetcherWithComponents<T>
  placeholder?: string
  action: string
}

export default function Filter<T extends FilterDataType>({
  fetcher: { data, submit, Form },
  tags,
  action,
  placeholder = "Filter...",
}: FilterProps<T>): JSX.Element {
  const { availableTags = tags, query = "", selectedTags = [] } = data || {}

  const TagComponent = useCallback(
    ({ tag }: { tag: string }) => {
      const isAvailable = availableTags.includes(tag.toLowerCase())
      const isSelected = selectedTags.includes(tag.toLowerCase())

      return (
        <Tags.Checkbox
          label={tag}
          value={tag.toLowerCase()}
          name="tag"
          disabled={!isAvailable && !isSelected}
          defaultChecked={isSelected}
        />
      )
    },
    [availableTags, selectedTags],
  )

  return (
    <Form
      id="filter-form"
      className="relative"
      action={action}
      onChange={(e) => submit(e.currentTarget)}
      onReset={() => submit(null)}
    >
      <Input
        type="search"
        name="q"
        className="w-full md:-mx-4 md:w-full-m4"
        placeholder={placeholder}
        defaultValue={query}
      />
      <Tags.List
        tags={tags}
        className="justify-center"
        TagComponent={TagComponent}
      />
      {selectedTags.length > 0 || query.length > 0 ? (
        <Tags.Button
          type="reset"
          className="absolute top-1 right-1 md:-right-3"
        >
          Clear
        </Tags.Button>
      ) : undefined}
    </Form>
  )
}

Filter.Error = FilterError

function FilterError({
  children = "No items found with the given filters.",
  handleClear,
  ...props
}: PropsWithChildren<{ handleClear: () => void }>): JSX.Element {
  return (
    <Section {...props}>
      <div className="text-center text-gray-500 text-2xl italic">
        {children}
        <br />
        Try changing or clearing them.
        <br />
        <button
          onClick={handleClear}
          className="text-sm m-4 px-2 py-1 text-gray-300 hover:text-gray-200 active:text-gray-400 border-[1px] border-current rounded"
        >
          Clear all the filters
        </button>
      </div>
    </Section>
  )
}
