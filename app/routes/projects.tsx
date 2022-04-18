import { json, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";

import {
  getAllProjects,
  filterProjectsWithQueryAndTags,
  ProjectsGrid,
  type ProjectType,
} from "~/features/projects"
import { filterUniqueTagsByOccurrence } from "~/helpers"
import Input from "~/ui/Input"
import { SectionProse } from "~/ui/layout"
import Tags from "~/ui/Tags"
import { H1 } from "~/ui/typography"

interface LoaderData {
  projects: ProjectType[]
  tags: string[]
  selectedTags: string[]
  query: string
}

export const loader: LoaderFunction = async ({ request }) => {
  const projects = await getAllProjects()
  const availableTags = projects
    .flatMap((project) => project.tags)
    .filter(Boolean)
  const uniqueTags = filterUniqueTagsByOccurrence(availableTags)

  const searchParams = new URL(request.url).searchParams
  const query = searchParams.get("q")?.trim() || ""
  const selectedTags = searchParams.getAll("tag") ?? []
  const filteredProjects = filterProjectsWithQueryAndTags(
    projects,
    query,
    selectedTags,
  )

  return json({
    projects: filteredProjects,
    tags: uniqueTags,
    selectedTags,
    query,
  })
}

export default function Projects(): JSX.Element {
  const { projects } = useLoaderData<LoaderData>()

  return (
    <>
      <SectionProse id="hero">
        <div>
          <H1>Projects</H1>
          <p className="mt-4 text-gray-100">
            I have been busy over the years, trying different things. Some are
            big, some are small and some are unfinished. Nonetheless, I am proud
            of each one of them.
          </p>
        </div>
        <ProjectsFilter />
      </SectionProse>
      <ProjectsGrid projects={projects} />
    </>
  )
}

function ProjectsFilter(): JSX.Element {
  const { tags, selectedTags, query } = useLoaderData<LoaderData>()
  const submit = useSubmit()

  return (
    <Form
      id="filter-form"
      className="relative"
      onChange={(e) => submit(e.currentTarget)}
      onReset={() => submit({})}
    >
      <Input
        type="search"
        name="q"
        className="w-full md:-mx-4 md:w-full-m4"
        placeholder="Filter projects..."
        defaultValue={query}
      />
      <Tags.List
        tags={tags}
        className=" justify-center"
        TagComponent={({ tag }) => (
          <Tags.Checkbox
            label={tag}
            value={tag.toLowerCase()}
            name="tag"
            defaultChecked={selectedTags.includes(tag.toLowerCase())}
          />
        )}
      />
      {selectedTags.length > 0 || query.length > 0 ? (
        <Tags.Button type="reset" className="absolute top-1 -right-3">
          Clear
        </Tags.Button>
      ) : undefined}
    </Form>
  )
}
