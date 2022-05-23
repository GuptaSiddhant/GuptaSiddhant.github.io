import { Link } from "@remix-run/react"
import clsx from "clsx"

import { formatDate } from "~/helpers/format"

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
          "bg-default group-hover:bg-secondary group-focus:bg-secondary",
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
            <div className="italic text-base text-secondary">{subtitle}</div>
          ) : null}
          {date ? (
            <time dateTime={date} className="text-sm text-tertiary">
              {formatDate(date)}
            </time>
          ) : null}

          {teaser ? null : (
            <div className="mt-4 text-base">
              {description ? (
                <span className="text-tertiary">{description} </span>
              ) : null}
              <span className="text-link whitespace-nowrap">
                {"Read post >"}
              </span>
            </div>
          )}
        </main>
      </article>
    </Link>
  )
}
