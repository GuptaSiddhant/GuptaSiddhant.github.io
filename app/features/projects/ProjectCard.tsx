import Article from "~/components/Article"
import Image from "~/components/atoms/Image"
import { Paragraph } from "~/components/Text"
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
  const { icon, title, association, tags, description } = project
  const imageSrc = project.gallery?.[0]?.url
  const imageAlt = project.gallery?.[0]?.alt || title

  return (
    <Article
      imageProps={{ src: imageSrc, alt: imageAlt }}
      imagePosition={imagePosition}
      className={className}
    >
      <div className="flex gap-4 items-center">
        {icon ? <ProjectIcon url={icon} title={title} /> : null}
        <div>
          <div className="text-3xl font-bold">{title}</div>
          <div className="text-yellow-500 font-black uppercase">
            @ {association?.replace("-", " ")}
          </div>
        </div>
      </div>
      <Article.Tags tags={tags} />
      {imagePosition === "right" && description ? (
        <Paragraph>{description}</Paragraph>
      ) : null}
    </Article>
  )
}

export function ProjectIcon({
  url,
  title,
}: {
  url: string
  title: string
}): JSX.Element {
  return (
    <Image src={url} alt={`${title}-icon`} className={"w-10 h-10 rounded"} />
  )
}
