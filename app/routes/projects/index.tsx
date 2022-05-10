import { json, type LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import {
  getAllProjects,
  filterProjectsWithQueryAndTags,
  ProjectsGrid,
  type ProjectType,
} from "~/features/projects"
import { getUniqueTagsFromObjects } from "~/helpers"
import Filter, { type FilterProps } from "~/ui/Filter"
import { SectionProse } from "~/ui/layout"
import { H1 } from "~/ui/typography"

interface LoaderData extends FilterProps {
  projects: ProjectType[]
}

export const loader: LoaderFunction = async ({ request }) => {
  const projects = await getAllProjects()
  const allTags = getUniqueTagsFromObjects(projects)

  const searchParams = new URL(request.url).searchParams
  const query = searchParams.get("q")?.trim() || ""
  const selectedTags = searchParams.getAll("tag") ?? []
  const filteredProjects = filterProjectsWithQueryAndTags(
    projects,
    query,
    selectedTags,
  )
  const availableTags = getUniqueTagsFromObjects(filteredProjects)

  return json<LoaderData>({
    projects: filteredProjects,

    // filterProps
    allTags,
    availableTags,
    selectedTags,
    query,
    placeholder: "Filter projects...",
  })
}

export default function Projects(): JSX.Element {
  const { projects, ...filterProps } = useLoaderData<LoaderData>()

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
        <Filter {...filterProps} />
      </SectionProse>
      <ProjectsGrid projects={projects} />
    </>
  )
}
