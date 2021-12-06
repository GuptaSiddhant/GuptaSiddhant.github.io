import clsx from "clsx"
import { useHover } from "@react-aria/interactions"
import { type ReactNode } from "react"

import Tag from "~/components/Tag"
import type { ProjectData } from "~/types"

export default function Article({
  icon,
  title,
  association,
  gallery = [],
  tags = [],
  dateEnd,
  featured,
}: ProjectData): JSX.Element {
  const { isHovered, hoverProps } = useHover({})
  const showcaseImage = gallery[0]?.url
  const showcaseImageCaption = gallery[0]?.alt || title
  const isCurrent = !dateEnd

  return (
    <article
      {...hoverProps}
      className={clsx(
        "relative",
        "bg-hover hover:scale-102 hover:shadow-xl",
        "rounded-2xl",
        "h-full overflow-hidden",
        "p-8",
        "flex flex-col justify-between",
        "transition-transform duration-300",
        // "max-h-screen-50 min-h-card",
      )}
    >
      <div>
        {icon ? <Icon {...icon} isHovered={isHovered} title={title} /> : null}
        <div className="text-3xl font-bold">{title}</div>
        <div className="text-yellow-500 font-black uppercase">
          @ {association?.replace("-", " ")}
        </div>
        {tags.length ? (
          <div className="flex flex-wrap gap-2 mt-4 mb-1">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        ) : null}
      </div>
      {showcaseImage ? (
        <div
          className={clsx(
            "flex-1 rounded-lg bg-depth w-full overflow-hidden translate-y-10 shadow-sm dark:shadow-md",
            "max-h-80",
          )}
        >
          <img
            src={showcaseImage}
            alt={showcaseImageCaption}
            className="rounded-sm object-cover w-full h-full"
          />
        </div>
      ) : null}
      {featured ? <Tape variant="purple">Featured</Tape> : null}
      {isCurrent ? <Tape variant="green">Current</Tape> : null}
    </article>
  )
}

function Icon({
  url,
  title,
  isHovered,
  variant = "mixed",
}: NonNullable<ProjectData["icon"]> & {
  title: string
  isHovered: boolean
}): JSX.Element {
  return (
    <img
      style={{ height: "40px" }}
      className={clsx(
        "object-fit mb-4",
        isHovered
          ? variant === "light"
            ? "black dark:filter-none"
            : variant === "dark"
            ? "dark:black"
            : "filter-none"
          : "white dark:black",
      )}
      src={url}
      alt={`${title}-icon`}
    />
  )
}

function Tape({
  children,
  variant,
}: {
  variant: "yellow" | "green" | "purple"
  children: ReactNode
}): JSX.Element {
  return (
    <div
      className={clsx(
        "absolute -right-8 top-8",
        "rotate-45",
        "w-40",
        "flex justify-center items-center",
        "font-bold",
        "shadow-md",
        variant === "yellow" && "bg-yellow-400 text-yellow-900",
        variant === "purple" && "bg-purple-300 text-purple-900",
        variant === "green" && "bg-green-300 text-green-900",
      )}
    >
      {children}
    </div>
  )
}
