import clsx from "clsx"

import Card from "~/components/atoms/Card"
import Image, { type ImageProps } from "~/components/atoms/Image"
import { TagList } from "~/components/Tag"
import type { BaseComponentProps } from "~/types"

export interface ArticleProps extends BaseComponentProps {
  imagePosition?: "bottom" | "right"
  imageProps?: ImageProps
}

/** Article card component */
export default function Article({
  className,
  children,
  imagePosition = "bottom",
  imageProps,
}: ArticleProps): JSX.Element | null {
  const featured = imagePosition === "right"

  return (
    <Card
      as="article"
      tabIndex={0}
      className={clsx(
        "justify-between flex-col gap-8 pb-0",
        featured && "sm:flex-row sm:pr-0",
        className,
      )}
    >
      <div className={clsx(featured && "flex-1")}>{children}</div>
      {imageProps?.src ? (
        <Image
          {...imageProps}
          className={clsx(
            "flex-1 w-full rounded",
            "shadow-sm dark:shadow-md",
            "bg-depth",
            "translate-y-1 max-h-80",
            featured && "sm:translate-x-1 sm:max-h-full",
            imageProps.className,
          )}
        />
      ) : null}
    </Card>
  )
}

Article.Tape = ArticleTape
Article.Tags = ArticleTags

function ArticleTape({
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

function ArticleTags({ tags = [] }: { tags?: string[] }): JSX.Element | null {
  return (
    <TagList
      aria-label="Tags"
      className="mt-4"
      tags={tags}
      checkIsTagDisabled={() => true}
    />
  )
}
