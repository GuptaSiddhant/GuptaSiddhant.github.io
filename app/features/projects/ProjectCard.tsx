import clsx from "clsx"

import ContentCard from "~/components/organisms/ContentCard"
import type { ProjectData } from "./types"

export function ProjectCard({
  project,
  className,
  featured,
}: {
  project: ProjectData
  className?: string
  featured?: boolean
}): JSX.Element {
  const { association, description, draft, icon, tags, title } = project
  const imageSrc = project.gallery?.[0]?.url
  const imageAlt = project.gallery?.[0]?.alt || title

  return (
    <ContentCard
      imageProps={{ src: imageSrc, alt: imageAlt }}
      featured={featured}
      className={className}
    >
      <div
        className={clsx(
          "flex gap-4 flex-row justify-between items-center",
          featured && "sm:flex-col-reverse sm:items-start",
        )}
      >
        <div>
          <ContentCard.Title>{title}</ContentCard.Title>
          <ContentCard.Subtitle>
            @ {association?.replace("-", " ")}
          </ContentCard.Subtitle>
        </div>
        <ContentCard.Icon url={icon} title={title} />
      </div>
      {featured ? (
        <ContentCard.Description>{description}</ContentCard.Description>
      ) : null}
      <ContentCard.Tags tags={tags} featured={featured} />
      {draft ? (
        <ContentCard.Tape variant="green">Draft</ContentCard.Tape>
      ) : null}
    </ContentCard>
  )
}
