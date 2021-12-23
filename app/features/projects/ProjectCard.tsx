import clsx from "clsx"

import ContentCard from "~/components/ContentCard"
import Image from "~/components/atoms/Image"
import type { ProjectData } from "./types"

export function ProjectCard({
  project,
  className,
  imagePosition = "bottom",
}: {
  project: ProjectData
  className?: string
  imagePosition?: "bottom" | "right"
}): JSX.Element {
  const { association, description, draft, icon, tags, title } = project
  const imageSrc = project.gallery?.[0]?.url
  const imageAlt = project.gallery?.[0]?.alt || title
  const isBig = imagePosition === "right"

  return (
    <ContentCard
      imageProps={{ src: imageSrc, alt: imageAlt }}
      imagePosition={imagePosition}
      className={className}
    >
      <div
        className={clsx(
          isBig ? "flex-col-reverse" : "flex-row justify-between items-center",
          "flex gap-4",
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
      <ContentCard.Tags tags={tags} />
      {isBig ? (
        <ContentCard.Description>{description}</ContentCard.Description>
      ) : null}
      {draft ? (
        <ContentCard.Tape variant="green">Draft</ContentCard.Tape>
      ) : null}
    </ContentCard>
  )
}
