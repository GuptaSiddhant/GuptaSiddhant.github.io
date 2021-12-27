import clsx from "clsx"

import Card from "~/components/atoms/Card"
import Img, { type ImgProps } from "~/components/atoms/Img"
import TagList from "~/components/TagList"
import type { BaseComponentProps } from "~/types"
import { Paragraph } from "./Text"

export interface ContentCardProps extends BaseComponentProps {
  featured?: boolean
  imageProps?: ImgProps
}

/** ContentCard card component */
export default function ContentCard({
  className,
  children,
  featured,
  imageProps,
}: ContentCardProps): JSX.Element | null {
  return (
    <Card
      as="article"
      tabIndex={0}
      className={clsx(
        "!p-0 justify-between flex-col",
        featured && "sm:flex-row",
        className,
      )}
    >
      <div
        className={clsx(
          "m-8 flex flex-col gap-4",
          featured && "sm:w-2/5 lg:w-1/3",
        )}
      >
        {children}
      </div>
      <ContentCardImage {...imageProps} featured={featured} />
    </Card>
  )
}

ContentCard.Description = ContentCardDescription
ContentCard.Icon = ContentCardIcon
ContentCard.Image = ContentCardImage
ContentCard.Subtitle = ContentCardSubtitle
ContentCard.Tags = ContentCardTags
ContentCard.Tape = ContentCardTape
ContentCard.Title = ContentCardTitle

function ContentCardTitle({
  children,
  className,
}: BaseComponentProps): JSX.Element | null {
  return <div className={clsx("text-3xl font-bold", className)}>{children}</div>
}

function ContentCardSubtitle({
  children,
  className,
}: BaseComponentProps): JSX.Element | null {
  return (
    <div className={clsx("text-yellow-500 font-black uppercase", className)}>
      {children}
    </div>
  )
}

function ContentCardDescription({
  children,
  className,
}: BaseComponentProps): JSX.Element | null {
  return children ? (
    <Paragraph className={clsx("my-0", className)}>{children}</Paragraph>
  ) : null
}

function ContentCardTags({
  tags = [],
  featured,
}: {
  tags?: string[]
  featured?: boolean
}): JSX.Element | null {
  const className = clsx(
    !featured && "absolute left-7 right-7 bottom-7 z-10 flex-wrap-reverse",
  )

  return (
    <TagList
      aria-label="Tags"
      tags={tags}
      checkIsTagDisabled={() => true}
      size="sm"
      className={className}
      tagClassName="bg-blue-100 dark:bg-blue-900"
    />
  )
}

function ContentCardTape({
  children,
  className,
  variant,
}: BaseComponentProps & {
  variant: "yellow" | "green" | "purple"
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
        "z-10",
        variant === "yellow" && "bg-yellow-400 text-yellow-900",
        variant === "purple" && "bg-purple-300 text-purple-900",
        variant === "green" && "bg-green-300 text-green-900",
        className,
      )}
    >
      {children}
    </div>
  )
}

function ContentCardImage({
  featured,
  ...imageProps
}: ImgProps & {
  featured?: boolean
}): JSX.Element | null {
  return imageProps?.src ? (
    <div
      className={clsx(
        "flex-1 w-full bg-depth",
        "shadow-sm dark:shadow-md",
        imageProps.className,
      )}
    >
      <Img {...imageProps} className="!rounded-none" />
    </div>
  ) : null
}

function ContentCardIcon({
  url,
  title = "content",
}: {
  url?: string
  title?: string
}): JSX.Element | null {
  return url ? (
    <div className="w-10 h-10 rounded bg-black">
      <Img src={url} alt={`${title}-icon`} />
    </div>
  ) : null
}
