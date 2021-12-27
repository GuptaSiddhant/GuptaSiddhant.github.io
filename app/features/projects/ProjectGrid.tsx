import Grid from "~/components/layouts/Grid"
import { ProjectCard } from "./ProjectCard"
import { checkIfFeaturedProject } from "./helpers"
import type { ProjectContent } from "./types"

export function ProjectGrid({ projects }: { projects: ProjectContent[] }) {
  const renderItem = (project: ProjectContent) => (
    <ProjectCard
      project={project.data}
      featured={checkIfFeaturedProject(project)}
    />
  )

  return (
    <Grid
      items={projects}
      renderItem={renderItem}
      checkIfFeatured={checkIfFeaturedProject}
      fallback={
        <div className="opacity-50">
          <h2>No projects found.</h2>
          <p>Maybe clearing filters might help.</p>
        </div>
      }
    />
  )
}
