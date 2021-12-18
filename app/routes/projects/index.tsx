import {
  useLoaderData,
  useSubmit,
  type LoaderFunction,
  type MetaFunction,
} from "remix"

import Article from "~/components/Article"
import Grid from "~/components/Grid"
import Image from "~/components/Image"
import Tag, { TagList } from "~/components/Tag"
import { getAllProjects } from "~/helpers/projects"
import Section from "~/layouts/Section"
import type { ProjectContent, ProjectData } from "~/types"

export const meta: MetaFunction = () => {
  return {
    title: "Projects",
    description: "Projects of Siddhant Gupta.",
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const querySearchParam = url.searchParams.get("q")
  const tagsSearchParam = url.searchParams.get("tags")
  const selectedTags = tagsSearchParam
    ? decodeURIComponent(tagsSearchParam)?.split(",")
    : []

  const allProjects = await getAllProjects()

  const filteredProjects =
    selectedTags.length > 0
      ? allProjects.filter((project) =>
          (project.data.tags || []).some((tag) => selectedTags.includes(tag)),
        )
      : allProjects

  const projects = querySearchParam
    ? filteredProjects.filter((project) =>
        project.id.includes(querySearchParam),
      )
    : filteredProjects

  const allTags = [
    ...new Set(allProjects.map(({ data }) => data.tags || []).flat()),
  ].slice(0, 10)

  return { tags: allTags, projects, selectedTags }
}

export default function Projects(): JSX.Element {
  const submit = useSubmit()
  const { projects, tags, selectedTags } = useLoaderData<{
    projects: ProjectContent[]
    tags: string[]
    selectedTags: string[]
  }>()

  function handleTagsChange(tags: string[]) {
    submit({ tags: tags.join(",") }, { replace: true })
  }

  return (
    <Section className="flex-col">
      {tags.length ? (
        <TagList
          label="Filter tags:"
          onChange={handleTagsChange}
          value={selectedTags}
        >
          {tags.map((tag) => (
            <Tag key={tag} value={tag}>
              {tag}
            </Tag>
          ))}
        </TagList>
      ) : null}

      <ProjectGrid projects={projects} />
    </Section>
  )
}

function ProjectGrid({ projects }: { projects: ProjectContent[] }) {
  const checkIfFeatured = (project: ProjectContent) => !project.data.dateEnd

  const renderItem = (project: ProjectContent) => (
    <ProjectCard
      project={project.data}
      imagePosition={checkIfFeatured(project) ? "right" : "bottom"}
    />
  )

  return (
    <Grid
      items={projects}
      renderItem={renderItem}
      checkIfFeatured={checkIfFeatured}
      fallback={
        <div className="opacity-50">
          <h1>No projects found.</h1>
          <p>Maybe clearing filters might help.</p>
        </div>
      }
    />
  )
}

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

function ProjectIcon({
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
