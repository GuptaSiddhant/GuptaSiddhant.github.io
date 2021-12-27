import { useLoaderData, type MetaFunction } from "remix"

import FilterForm from "~/components/FilterForm"
import {
  getAllProjects,
  filterProjectsByTags,
  filterProjectsByQuery,
  ProjectGrid,
  type ProjectContent,
} from "~/features/projects"
import { generateUniqueTags } from "~/helpers"
import Section from "~/components/layouts/Section"
import type { LoaderFunctionProps } from "~/types"

export const meta: MetaFunction = () => {
  return {
    title: "Projects",
    description: "Projects of Siddhant Gupta.",
  }
}

interface LoaderData {
  projects: ProjectContent[]
  tags: string[]
  searchQuery?: string
  selectedTags: string[]
}

export async function loader({
  request,
}: LoaderFunctionProps): Promise<LoaderData> {
  const { searchParams } = new URL(request.url)
  const querySearchParam = searchParams.get("q")
  const tagsSearchParams = searchParams.getAll("tags")

  const projects = await getAllProjects()
  const tags = generateUniqueTags(projects)
  const selectedTags = tagsSearchParams || []

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
    searchQuery: querySearchParam ?? undefined,
    projects: filteredProjectsByQuery,
  }
}

export default function Projects(): JSX.Element {
  const { projects, ...data } = useLoaderData<LoaderData>()

  return (
    <Section className="flex-col">
      <FilterForm {...data} searchPlaceholder="Search the projects..." />
      <ProjectGrid projects={projects} />
    </Section>
  )
}
