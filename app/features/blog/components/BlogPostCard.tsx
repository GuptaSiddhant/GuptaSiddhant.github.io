import { Link } from "@remix-run/react"
import clsx from "clsx"

import { formatDate } from "helpers/format"

import type { BlogPostTeaser } from "../types"

export default function BlogPostCard({
  blogPost,
  teaser,
}: {
  blogPost: BlogPostTeaser
  teaser?: boolean
}): JSX.Element {
  const { id, title, subtitle, description, date, cover } = blogPost

  return (
    <Link to={id} prefetch="intent" className="group ">
      <article
        className={clsx(
          "relative md:-mx-4 rounded-lg",
          "bg-black group-hover:bg-gray-800 group-focus:bg-gray-800",
          "grid overflow-clip grid-cols-1 grid-rows-[150px_auto] md:grid-cols-[250px_1fr] md:grid-rows-none",
        )}
      >
        <aside className={clsx("w-full h-full self-stretch overflow-hidden")}>
          {cover ? (
            <img
              src={cover}
              alt={title}
              className={clsx(
                "object-cover w-full h-full",
                "transition-transform duration-300",
                "group-hover:scale-105 group-focus:scale-105",
              )}
            />
          ) : null}
        </aside>

        <main className="p-4 flex-1 self-center">
          <div className="font-bold text-xl my-2">{title}</div>
          {subtitle ? (
            <div className="italic text-base text-gray-200">{subtitle}</div>
          ) : null}
          {date ? (
            <time dateTime={date} className="text-sm text-gray-300">
              {formatDate(date)}
            </time>
          ) : null}

          {teaser ? null : (
            <div className="mt-4 text-base">
              {description ? (
                <span className="text-gray-300">{description} </span>
              ) : null}
              <span className="text-blue-400 whitespace-nowrap">
                {"Read post >"}
              </span>
            </div>
          )}
        </main>
      </article>
    </Link>
  )
}
