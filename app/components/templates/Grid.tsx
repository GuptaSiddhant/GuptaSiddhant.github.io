import clsx from "clsx"
import { CSSGrid, measureItems, makeResponsive } from "react-stonecutter"
import { Link } from "remix"

import type { ContentCommonData, PageContent } from "~/types"

const StoneGrid = makeResponsive(CSSGrid, { maxWidth: 1920 })
export interface GridProps<T extends ContentCommonData> {
  className?: string
  items: PageContent<T>[]
  renderItem: (item: PageContent<T>) => JSX.Element | null
  checkIfFeatured?: (item: PageContent<T>) => boolean
  generateLink?: (item: PageContent<T>) => string
  fallback?: JSX.Element | null
}

/** Grid component */
export default function Grid<T extends ContentCommonData = ContentCommonData>({
  className,
  items,
  renderItem,
  checkIfFeatured,
  generateLink,
  fallback,
}: GridProps<T>): JSX.Element | null {
  return items.length > 0 ? (
    <ul
      className={clsx(
        "h-full",
        "grid gap-8 grid-flow-row-dense",
        "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5",
        className,
      )}
    >
      {items.map((item) => {
        const isFeatured = checkIfFeatured?.(item)

        return (
          <li
            key={item.id}
            style={{ height: "500px" }}
            className={clsx(
              isFeatured ? "col-span-full lg:col-span-2" : undefined,
              "animate-appear",
            )}
          >
            <Link
              data-custom-color
              prefetch="intent"
              to={generateLink?.(item) || item.id}
            >
              {renderItem(item)}
            </Link>
          </li>
        )
      })}
    </ul>
  ) : (
    fallback || (
      <div className="opacity-50">
        <h1>No items found.</h1>
      </div>
    )
  )
}
