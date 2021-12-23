import ContentCard from "~/components/ContentCard"
import { Paragraph } from "~/components/Text"
import { formatDate } from "~/helpers"
import type { BlogPostData } from "./types"

export function BlogPostCard({
  post,
  className,
  imagePosition = "bottom",
}: {
  post: BlogPostData
  className?: string
  imagePosition?: "bottom" | "right"
}): JSX.Element {
  const { title, subtitle, date, tags } = post
  const imageSrc = post.gallery?.[0]?.url
  const imageAlt = post.gallery?.[0]?.alt || title

  return (
    <ContentCard
      imageProps={{ src: imageSrc, alt: imageAlt }}
      imagePosition={imagePosition}
      className={className}
    >
      <div className="text-3xl font-bold">{title}</div>
      <div className="text-yellow-500 font-black uppercase">
        {formatDate(date)}
      </div>
      <ContentCard.Tags tags={tags} />
      <Paragraph>{subtitle}</Paragraph>
    </ContentCard>
  )
}
