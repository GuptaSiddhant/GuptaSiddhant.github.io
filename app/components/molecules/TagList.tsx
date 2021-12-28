import clsx from "clsx"

import Tag, { type TagProps } from "~/components/atoms/Tag"

export interface TagListProps {
  className?: string
  label?: string
  tags: string[]
  checkIsTagSelected?: (tag: string) => boolean
  checkIsTagDisabled?: (tag: string) => boolean
  size?: TagProps["size"]
  tagClassName?: string
}

export default function TagList({
  className,
  tags,
  size,
  label = "Filter by tags",
  tagClassName,
  checkIsTagSelected,
  checkIsTagDisabled,
}: TagListProps): JSX.Element | null {
  if (tags.length < 1) return null

  return (
    <fieldset
      className={clsx("flex flex-wrap flex-row gap-2 items-center", className)}
      aria-label={label}
    >
      {tags.map((tag) => (
        <Tag
          key={tag}
          isSelected={checkIsTagSelected?.(tag)}
          isDisabled={checkIsTagDisabled?.(tag)}
          size={size}
          className={tagClassName}
        >
          {tag}
        </Tag>
      ))}
    </fieldset>
  )
}
