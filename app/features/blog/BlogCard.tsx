import ContentCard from "~/components/ContentCard"
import { formatDate } from "~/helpers"
import type { BlogPostData } from "./types"

export function BlogPostCard({
  post,
  className,
  featured,
}: {
  post: BlogPostData
  className?: string
  featured?: boolean
}): JSX.Element {
  const { date, draft, subtitle, tags, title } = post
  const imageSrc = post.gallery?.[0]?.url
  const imageAlt = post.gallery?.[0]?.alt || title

  return (
    <ContentCard
      imageProps={{ src: imageSrc, alt: imageAlt }}
      featured={featured}
      className={className}
    >
      <div>
        <ContentCard.Title>{title}</ContentCard.Title>
        <ContentCard.Subtitle>{formatDate(date)}</ContentCard.Subtitle>
      </div>
      <ContentCard.Description>{subtitle}</ContentCard.Description>
      <ContentCard.Tags tags={tags} featured={featured} />
      {draft ? (
        <ContentCard.Tape variant="green">Draft</ContentCard.Tape>
      ) : null}
    </ContentCard>
  )
}
