import { useLoaderData, type MetaFunction } from "remix"

import FilterForm from "~/components/organisms/FilterForm"
import Section from "~/components/templates/Section"
import {
  getAllProjects,
  filterProjectsByRequest,
  ProjectGrid,
} from "~/features/projects"
import { generateUniqueTags } from "~/helpers"
import type { AwaitedReturn, LoaderFunctionProps } from "~/types"

export const meta: MetaFunction = () => {
  return {
    title: "Projects",
    description: "Projects of Siddhant Gupta.",
  }
}

export async function loader({ request }: LoaderFunctionProps) {
  const projects = await getAllProjects()
  const tags = generateUniqueTags(projects)
  const { searchQuery, selectedTags, filteredProjects } =
    filterProjectsByRequest(projects, request)

  return {
    tags,
    selectedTags,
    searchQuery,
    projects: filteredProjects,
  }
}

export default function Projects(): JSX.Element {
  const { projects, ...filterData } =
    useLoaderData<AwaitedReturn<typeof loader>>()

  return (
    <Section id="filter" className="flex-col">
      <FilterForm {...filterData} searchPlaceholder="Search the projects..." />
      <ProjectGrid projects={projects} />
    </Section>
  )
}
