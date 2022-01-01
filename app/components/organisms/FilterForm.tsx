import { useMemo, useState, type FormEvent } from "react"
import CloseIcon from "remixicon-react/CloseCircleLineIcon"

import Button from "~/components/atoms/Button"
import Input from "~/components/atoms/Input"
import TagList from "~/components/molecules/TagList"
import { generateUniqueTags } from "~/helpers"
import { CommonContent } from "~/types"

export interface FilterFormProps {
  isFormDisabled?: boolean
  tags: string[]
  searchPlaceholder?: string
  selectedTags: string[]
  searchQuery: string
  isResetDisabled: boolean
  handleFormChange: (e: FormEvent<HTMLFormElement>) => void
  handleFormReset: () => void
}

export default function FilterForm({
  isFormDisabled,
  tags,
  selectedTags,
  searchQuery,
  searchPlaceholder,
  isResetDisabled,
  handleFormChange,
  handleFormReset,
}: FilterFormProps): JSX.Element | null {
  if (isFormDisabled) return null

  return (
    <form
      className="flex flex-row flex-wrap items-center gap-4"
      onChange={handleFormChange}
    >
      <Input
        type="search"
        name="query"
        defaultValue={searchQuery}
        placeholder={searchPlaceholder}
        aria-label="Search"
        className="flex-grow sm:flex-grow-0"
      />
      <TagList
        tags={tags}
        checkIsTagSelected={(tag) => selectedTags.includes(tag)}
      />
      {isResetDisabled ? null : (
        <Button
          onClick={handleFormReset}
          type="reset"
          className="flex items-center gap-1 text-red-700 dark:text-red-300"
        >
          <CloseIcon className="inline" /> Reset filters
        </Button>
      )}
    </form>
  )
}

export function useFilterForm<T extends CommonContent>(
  items: T[],
  queryFilterPredicate: (item: T, query: string) => boolean,
) {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  function handleFormChange(e: FormEvent<HTMLFormElement>): void {
    const formData = new FormData(e.currentTarget)
    const query: string = formData.get("query")?.toString() || ""
    const tags: string[] = formData.getAll("tags").map((tag) => tag.toString())
    setSearchQuery(query)
    setSelectedTags(tags)
  }

  function handleFormReset() {
    setSearchQuery("")
    setSelectedTags([])
  }

  const filterFormProps: FilterFormProps = {
    isFormDisabled: items.length < 2,
    tags: generateUniqueTags(items),
    selectedTags,
    searchQuery,
    handleFormChange,
    handleFormReset,
    isResetDisabled:
      selectedTags.length === 0 && (!searchQuery || searchQuery?.length === 0),
  }

  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
          (selectedTags.length === 0 ||
            (item.data.tags || []).some((tag) => selectedTags.includes(tag))) &&
          (searchQuery.length === 0 || queryFilterPredicate(item, searchQuery)),
      ),
    [items, searchQuery, selectedTags],
  )

  return { items: filteredItems, filterFormProps }
}
