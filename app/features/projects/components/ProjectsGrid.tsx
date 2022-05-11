import FilterError from "~/ui/FilterError"
import Section from "~/ui/Section"

import type { ProjectType } from "../types"
import ProjectCard from "./ProjectCard"

export default function ProjectsGrid({
  projects,
}: {
  projects: ProjectType[]
}): JSX.Element {
  if (projects.length === 0)
    return <FilterError>No projects found with the given filters.</FilterError>

  return (
    <Section id="projects" className="!p-10">
      <div className="grid grid-flow-row-dense auto-rows-fr grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-h-[400px]">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}
