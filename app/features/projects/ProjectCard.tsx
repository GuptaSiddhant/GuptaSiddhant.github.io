import Article from "~/components/Article"
import Image from "~/components/Image"
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
      {icon ? <ProjectIcon url={icon} title={title} /> : null}
      <div className="text-3xl font-bold">{title}</div>
      <div className="text-yellow-500 font-black uppercase">
        @ {association?.replace("-", " ")}
      </div>
      <Article.Tags tags={tags} />
      {imagePosition === "right" && description ? <p>{description}</p> : null}
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
    <Image
      src={url}
      alt={`${title}-icon`}
      className={"w-10 h-10 rounded mb-4"}
    />
  )
}
