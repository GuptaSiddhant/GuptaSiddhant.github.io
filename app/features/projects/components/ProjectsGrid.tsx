import { useSubmit } from "@remix-run/react"
import { Section } from "~/ui/layout"

import type { ProjectType } from "../types"
import ProjectCard from "./ProjectCard"

export default function ProjectsGrid({
  projects,
}: {
  projects: ProjectType[]
}): JSX.Element {
  const submit = useSubmit()

  if (projects.length === 0) {
    return (
      <Section>
        <div className="text-center text-gray-500 text-2xl italic">
          No projects found with the given filters.
          <br />
          Try changing or clearing them.
          <br />
          <button
            onClick={() => submit({})}
            className="text-sm m-4 px-2 py-1 text-gray-300 hover:text-gray-200 active:text-gray-400 border-[1px] border-current rounded"
          >
            Clear all the filters
          </button>
        </div>
      </Section>
    )
  }

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
