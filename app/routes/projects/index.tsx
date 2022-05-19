import { json, type LoaderFunction } from "@remix-run/node"
import { useFetcher, useLoaderData } from "@remix-run/react"

import {
  getProjectList,
  ProjectCard,
  useLogViewMultipleProjectsEvent,
  type ProjectTeaser,
} from "~/features/projects"

import { getUniqueTagsFromObjects } from "~/helpers"
import Filter from "~/ui/Filter"
import Section from "~/ui/Section"
import { H1 } from "~/ui/typography"

import { type ProjectsAPIResponse } from "./api"

interface LoaderData {
  projects: ProjectTeaser[]
  tags: string[]
}

export const loader: LoaderFunction = async () => {
  const projects = await getProjectList(100)
  const tags = getUniqueTagsFromObjects(projects)

  return json<LoaderData>({ projects, tags })
}

export default function Projects(): JSX.Element {
  const { projects, tags } = useLoaderData<LoaderData>()
  const projectsFilterFetcher = useFetcher<ProjectsAPIResponse>()
  const filteredProjects = projectsFilterFetcher?.data?.projects ?? projects

  useLogViewMultipleProjectsEvent(projects)

  return (
    <>
      <Section.Hero>
        <div>
          <H1>Projects</H1>
          <p className="mt-4 text-gray-100">
            I have been busy over the years, trying different things. Some are
            big, some are small and some are unfinished. Nonetheless, I am proud
            of each one of them.
          </p>
        </div>
        <Filter
          action="api"
          placeholder="Filter projects..."
          fetcher={projectsFilterFetcher}
          tags={tags}
        />
      </Section.Hero>

      {filteredProjects.length > 0 ? (
        <Section id="projects" className="!p-10">
          <div className="grid grid-flow-row-dense auto-rows-fr grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-h-[400px]">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Section>
      ) : (
        <Filter.Error handleClear={() => projectsFilterFetcher.submit(null)}>
          No projects found with the given filters.
        </Filter.Error>
      )}
    </>
  )
}
