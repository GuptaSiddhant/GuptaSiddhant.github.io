import clsx from "clsx"
import { type ChangeEvent } from "react"
import { useLoaderData, useSubmit, type MetaFunction } from "remix"

import Article from "~/components/Article"
import Grid from "~/components/Grid"
import Image from "~/components/Image"
import { SearchField } from "~/components/Input"
import Tag, { TagList } from "~/components/Tag"
import {
  getAllProjects,
  filterProjectsByTags,
  filterProjectsByQuery,
  generateUniqueTags,
} from "~/helpers/projects"
import Section from "~/layouts/Section"
import type { LoaderFunctionProps, ProjectContent, ProjectData } from "~/types"

export const meta: MetaFunction = () => {
  return {
    title: "Projects",
    description: "Projects of Siddhant Gupta.",
  }
}

interface LoaderData {
  projects: ProjectContent[]
  tags: string[]
  searchQuery: string | null
  selectedTags: string[]
}

export async function loader({
  request,
}: LoaderFunctionProps): Promise<LoaderData> {
  const { searchParams } = new URL(request.url)
  const querySearchParam = searchParams.get("q")
  const tagsSearchParam = searchParams.get("tags")

  const projects = await getAllProjects()
  const tags = generateUniqueTags(projects)
  const selectedTags = tagsSearchParam
    ? decodeURIComponent(tagsSearchParam)?.split(",")
    : []

  const filteredProjectsBySelectedTags = filterProjectsByTags(
    projects,
    selectedTags,
  )

  const filteredProjectsByQuery = filterProjectsByQuery(
    filteredProjectsBySelectedTags,
    querySearchParam,
  )

  return {
    tags,
    selectedTags,
    searchQuery: querySearchParam,
    projects: filteredProjectsByQuery,
  }
}

export default function Projects(): JSX.Element {
  return (
    <Section className="flex-col">
      <div className="flex flex-row flex-wrap items-center gap-4">
        <Search />
        <TagFilter />
      </div>

      <ProjectGrid />
    </Section>
  )
}

function Search(): JSX.Element {
  const submit = useSubmit()
  const { selectedTags, searchQuery } = useLoaderData<LoaderData>()

  function handleChange(query: string) {
    submit({ q: query, tags: selectedTags.join(",") }, { replace: true })
  }

  return (
    <SearchField
      placeholder="Search in projects..."
      value={searchQuery || ""}
      onChange={handleChange}
      aria-label="Search"
    />
  )
}

function TagFilter(): JSX.Element | null {
  const submit = useSubmit()
  const { tags, selectedTags, searchQuery } = useLoaderData<LoaderData>()

  function handleTagsChange(tags: string[]) {
    submit({ tags: tags.join(","), q: searchQuery || "" }, { replace: true })
  }

  return tags.length ? (
    <TagList
      onChange={handleTagsChange}
      value={selectedTags}
      aria-label="Filter by tags"
      reset
    >
      {tags.map((tag) => (
        <Tag key={tag} value={tag}>
          {tag}
        </Tag>
      ))}
    </TagList>
  ) : null
}

function ProjectGrid() {
  const { projects } = useLoaderData<LoaderData>()
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
          <h2>No projects found.</h2>
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
