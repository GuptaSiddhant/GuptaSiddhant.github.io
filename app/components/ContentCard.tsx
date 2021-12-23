import clsx from "clsx"

import Card from "~/components/atoms/Card"
import Image, { type ImageProps } from "~/components/atoms/Image"
import TagList from "~/components/TagList"
import type { BaseComponentProps } from "~/types"
import { Paragraph } from "./Text"

export interface ContentCardProps extends BaseComponentProps {
  imagePosition?: "bottom" | "right"
  imageProps?: ImageProps
}

/** ContentCard card component */
export default function ContentCard({
  className,
  children,
  imagePosition = "bottom",
  imageProps,
}: ContentCardProps): JSX.Element | null {
  const featured = imagePosition === "right"

  return (
    <Card
      as="article"
      tabIndex={0}
      className={clsx(
        "p-0 justify-between flex-col gap-0",
        featured && "sm:flex-row sm:pr-0",
        className,
      )}
    >
      <div className={clsx("m-8 flex flex-col gap-4", featured && "flex-1")}>
        {children}
      </div>
      <ContentCardImage {...imageProps} featured={featured} />
    </Card>
  )
}

ContentCard.Icon = ContentCardIcon
ContentCard.Image = ContentCardImage
ContentCard.Subtitle = ContentCardSubtitle
ContentCard.Tags = ContentCardTags
ContentCard.Tape = ContentCardTape
ContentCard.Title = ContentCardTitle
ContentCard.Description = ContentCardDescription

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
}: {
  tags?: string[]
}): JSX.Element | null {
  return (
    <TagList
      aria-label="Tags"
      tags={tags}
      checkIsTagDisabled={() => true}
      size="sm"
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
}: ImageProps & {
  featured?: boolean
}): JSX.Element | null {
  return imageProps?.src ? (
    <Image
      imageClassName="rounded-none"
      {...imageProps}
      className={clsx(
        "flex-1 w-full bg-depth",
        "shadow-sm dark:shadow-md",
        "max-h-80",
        featured && "sm:max-h-full",
        imageProps.className,
      )}
    />
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
    <Image src={url} alt={`${title}-icon`} className={"w-10 h-10 rounded"} />
  ) : null
}
