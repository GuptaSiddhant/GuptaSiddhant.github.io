import { type FormEvent } from "react"
import {
  Form,
  useLoaderData,
  useSubmit,
  type LoaderFunction,
  type MetaFunction,
} from "remix"

import Section from "~/layouts/Section"
import ProjectGrid from "~/components/ProjectGrid"
import { getAllProjects } from "~/helpers/projects"
import type { ProjectContent } from "~/types"
import Tag, { TagList } from "~/components/Tag"

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
      ? allProjects.filter(
          (project) =>
            (project.data.tags || []).some((tag) => selectedTags.includes(tag)),
          // selectedTags.some((tag) => (project.data.tags || []).includes(tag)),
        )
      : allProjects

  const projects = querySearchParam
    ? filteredProjects.filter((project) =>
        project.id.includes(querySearchParam),
      )
    : filteredProjects

  const allTags = [
    ...new Set(
      allProjects
        .map((project) => project.data.tags || [])
        .flat()
        .sort(),
    ),
  ]

  return { tags: allTags, projects, selectedTags }
}

export default function Projects(): JSX.Element {
  const submit = useSubmit()
  const { projects, tags, selectedTags } = useLoaderData<{
    projects: ProjectContent[]
    tags: string[]
    selectedTags: string[]
  }>()

  // function handleSearchChange(event: FormEvent<HTMLFormElement>) {
  //   submit(event.currentTarget, { replace: true })
  // }

  function handleTagsChange(tags: string[]) {
    submit({ tags: tags.join(",") }, { replace: true })
  }

  return (
    <Section className="flex-col">
      <Form>
        {/* <input name="q" type="search" onChange={handleSearchChange} /> */}
        {tags.length ? (
          <TagList
            label="Filter tags:"
            onChange={handleTagsChange}
            // value={selectedTags}
          >
            {tags.map((tag) => (
              <Tag key={tag} value={tag}>
                {tag}
              </Tag>
            ))}
          </TagList>
        ) : null}
      </Form>

      <ProjectGrid projects={projects} />
    </Section>
  )
}
