import clsx from "clsx"
import { type ReactNode } from "react"

import Tag, { TagList } from "~/components/Tag"
import Image from "./Image"
import type { ProjectData } from "~/types"

export default function Article(project: ProjectData): JSX.Element {
  const { icon, title, association, tags, dateEnd, featured } = project
  const isCurrent = !dateEnd

  return (
    <article
      tabIndex={0}
      className={clsx(
        "relative",
        "bg-hover hover:shadow-xl",
        "rounded-2xl",
        "overflow-hidden",
        "h-full p-8",
        "flex flex-col justify-between",
        "transition-transform duration-300",
        "hover:scale-102",
        "group",
      )}
    >
      <div>
        {icon ? <Icon url={icon} title={title} /> : null}
        <div className="text-3xl font-bold">{title}</div>
        <div className="text-yellow-500 font-black uppercase">
          @ {association?.replace("-", " ")}
        </div>
        <Tags tags={tags} />
      </div>
      <ShowcaseImage {...project} />
      {featured ? <Tape variant="purple">Featured</Tape> : null}
      {isCurrent ? <Tape variant="green">Current</Tape> : null}
    </article>
  )
}

function Tags({ tags = [] }: { tags?: string[] }): JSX.Element | null {
  return tags.length ? (
    <TagList aria-label="Tags">
      {tags.sort().map((tag) => (
        <Tag key={tag} value={tag} isDisabled>
          {tag}
        </Tag>
      ))}
    </TagList>
  ) : null
}

function Icon({ url, title }: { url: string; title: string }): JSX.Element {
  return (
    <Image
      src={url}
      alt={`${title}-icon`}
      className={"w-10 h-10 rounded mb-4"}
    />
  )
}

function ShowcaseImage({
  gallery = [],
  title,
}: ProjectData): JSX.Element | null {
  const imageSrc = gallery[0]?.url
  const imageAlt = gallery[0]?.alt || title
  const className = clsx(
    "flex-1",
    "rounded",
    "w-full",
    "translate-y-10",
    "shadow-sm",
    "dark:shadow-md",
    "max-h-80",
    "bg-depth",
  )

  return imageSrc ? (
    <Image src={imageSrc} alt={imageAlt} className={className} />
  ) : null
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
