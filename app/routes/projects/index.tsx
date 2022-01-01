import { useLoaderData, type MetaFunction } from "remix"

import FilterForm, { useFilterForm } from "~/components/organisms/FilterForm"
import Section from "~/components/templates/Section"
import {
  getAllProjects,
  ProjectContent,
  ProjectGrid,
} from "~/features/projects"
import type { AwaitedReturn, LoaderFunctionProps } from "~/types"

export const meta: MetaFunction = () => {
  return {
    title: "Projects",
    description: "Projects of Siddhant Gupta.",
  }
}

export async function loader({}: LoaderFunctionProps) {
  return await getAllProjects()
}

export default function Projects(): JSX.Element {
  const projects = useLoaderData<AwaitedReturn<typeof loader>>()
  const { items, filterFormProps } = useFilterForm<ProjectContent>(
    projects,
    ({ id, data }, query) =>
      [id, data.title, data.association].some((field) =>
        field?.includes(query),
      ),
  )

  return (
    <Section id="filter" className="flex-col">
      <FilterForm
        {...filterFormProps}
        searchPlaceholder="Search the projects..."
      />
      <ProjectGrid projects={items} />
    </Section>
  )
}
