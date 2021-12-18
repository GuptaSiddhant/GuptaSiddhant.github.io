import clsx from "clsx"
import { Link } from "remix"
import type { ContentCommonData, PageContent } from "~/types"

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
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item) => {
        const isFeatured = checkIfFeatured?.(item)

        return (
          <li
            key={item.id}
            style={{ height: "500px" }}
            className={isFeatured ? "col-span-full" : undefined}
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
