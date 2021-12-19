import Grid from "~/components/Grid"
import { ProjectCard } from "./ProjectCard"
import type { ProjectContent } from "./types"

export function ProjectGrid({ projects }: { projects: ProjectContent[] }) {
  const checkIfFeatured = (project: ProjectContent) => !project.data.dateEnd

  const renderItem = (project: ProjectContent) => (
    <ProjectCard
      project={project.data}
      imagePosition={checkIfFeatured(project) ? "right" : "bottom"}
    />
  )

  return (
    <Grid
      items={projects}
      renderItem={renderItem}
      checkIfFeatured={checkIfFeatured}
      fallback={
        <div className="opacity-50">
          <h2>No projects found.</h2>
          <p>Maybe clearing filters might help.</p>
        </div>
      }
    />
  )
}
