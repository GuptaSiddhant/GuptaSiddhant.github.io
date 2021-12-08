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
        "bg-hover hover:shadow-xl",
        "rounded-2xl",
        "h-full overflow-hidden",
        "p-8",
        "flex flex-col justify-between",
        "transition-transform duration-300",
        "hover:scale-102",
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
            "flex-1",
            "rounded",
            "bg-depth",
            "w-full",
            "overflow-hidden",
            "translate-y-10",
            "shadow-sm",
            "dark:shadow-md",
            "max-h-80",
          )}
        >
          <img
            src={showcaseImage}
            alt={showcaseImageCaption}
            className={"img-cover"}
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
    <div
      className={clsx(
        "w-10 h-10 rounded",
        "mb-4",
        "bg-base",
        "overflow-hidden",
      )}
    >
      <img
        className={clsx("h-full w-full object-fit")}
        src={url}
        alt={`${title}-icon`}
      />
    </div>
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
        "select-none",
        variant === "yellow" && "bg-yellow-400 text-yellow-900",
        variant === "purple" && "bg-purple-300 text-purple-900",
        variant === "green" && "bg-green-300 text-green-900",
      )}
    >
      {children}
    </div>
  )
}
