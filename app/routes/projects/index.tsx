import { useLoaderData, type LoaderFunction, type MetaFunction } from "remix"

import Section from "~/layouts/Section"
import ProjectGrid from "~/components/ProjectGrid"
import { getAllProjects } from "~/helpers/projects"
import type { ProjectContent } from "~/types"

export const meta: MetaFunction = () => {
  return {
    title: "Projects",
    description: "Projects of Siddhant Gupta.",
  }
}

export const loader: LoaderFunction = async () => {
  return await getAllProjects()
}

export default function Projects(): JSX.Element {
  const data = useLoaderData<ProjectContent[]>()

  return (
    <Section className="flex-col">
      <p>Here are some of the projects I have worked on.</p>
      <ProjectGrid projects={data} />
    </Section>
  )
}
