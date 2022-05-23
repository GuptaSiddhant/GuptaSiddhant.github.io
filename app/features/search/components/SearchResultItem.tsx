import clsx from "clsx"

import type { Teaser } from "~/types"
import Hotkeys from "~/ui/Hotkeys"
import type { PropsWithChildren } from "~/ui/types"

import usePerformEntryAction from "../hooks/usePerformEntryAction"
import type { SearchEntry } from "../types"

export function SearchResultItem({
  id,
  title,
  cover,
  icon,
  baseLink,
}: Teaser & { baseLink: string }): JSX.Element {
  return (
    <EntryResultItem
      entry={{
        id,
        title,
        href: `${baseLink}${id}`,
        icon:
          icon || cover ? (
            <img
              src={icon || cover}
              alt={title}
              className="aspect-square h-8 rounded-sm object-cover inline-block mr-4"
            />
          ) : null,
      }}
    />
  )
}

export function SearchResultHeader({
  children,
  className,
}: PropsWithChildren): JSX.Element | null {
  return (
    <li
      className={clsx(
        className,
        "border-b-[1px] border-gray-600 px-4 pt-1 bg-secondary",
        "sticky top-0 font-black mt-4 text-sm tracking-wider uppercase",
      )}
    >
      {children}
    </li>
  )
}

interface ResultItemProps {
  entry: SearchEntry
  className?: string
}

export function EntryResultItem({
  entry,
  className,
}: ResultItemProps): JSX.Element | null {
  const { title, shortcut, icon, href, perform } = entry

  return (
    <li className="m-1 border-b-[0.5px] border-gray-700">
      <a
        data-result
        className={clsx(
          className,
          "rounded px-3 py-2 h-full w-full",
          "hover:bg-tertiary focus:bg-tertiary",
          "cursor-pointer",
          "flex justify-between items-center",
        )}
        href={href}
        onClick={perform}
      >
        <span>
          {icon ? (
            typeof icon === "string" ? (
              <img
                src={icon}
                alt={title}
                className="aspect-square h-8 rounded-sm object-cover inline-block mr-4"
              />
            ) : (
              icon
            )
          ) : null}
          {title}
        </span>
        {shortcut ? <Hotkeys keys={shortcut} /> : null}
      </a>
    </li>
  )
}
