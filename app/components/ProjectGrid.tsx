import clsx from "clsx"
import { Link } from "remix"

import ProjectCard from "~/components/ProjectCard"
import type { ProjectContent } from "~/types"

export default function ProjectGrid({
  projects,
  disabledFeatured = false,
  className,
}: {
  projects: ProjectContent[]
  disabledFeatured?: boolean
  className?: string
}) {
  return projects.length > 0 ? (
    <ul
      className={clsx(
        "h-full",
        "grid gap-8 grid-flow-row-dense",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {projects.map((project) => {
        const featured = !disabledFeatured && !!project.data.featured

        return (
          <li key={project.id} style={{ height: "500px" }}>
            <Link
              data-custom-color
              prefetch="intent"
              to={`/projects/${project.id}`}
            >
              <ProjectCard {...project.data} featured={featured} />
            </Link>
          </li>
        )
      })}
    </ul>
  ) : (
    <div className="opacity-50">
      <h1>No projects found.</h1>
      <p>Maybe clearing filters might help.</p>
    </div>
  )
}
