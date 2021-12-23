import ContentCard from "~/components/ContentCard"
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
  const { date, draft, subtitle, tags, title } = post
  const imageSrc = post.gallery?.[0]?.url
  const imageAlt = post.gallery?.[0]?.alt || title

  return (
    <ContentCard
      imageProps={{ src: imageSrc, alt: imageAlt }}
      imagePosition={imagePosition}
      className={className}
    >
      <ContentCard.Title>{title}</ContentCard.Title>
      <ContentCard.Subtitle>{formatDate(date)}</ContentCard.Subtitle>
      <ContentCard.Tags tags={tags} />
      <ContentCard.Description>{subtitle}</ContentCard.Description>
      {draft ? (
        <ContentCard.Tape variant="green">Draft</ContentCard.Tape>
      ) : null}
    </ContentCard>
  )
}
