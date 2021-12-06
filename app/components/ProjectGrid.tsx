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
  return (
    <ul
      className={clsx(
        "grid gap-8 grid-flow-row-dense",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {projects.map((project) => {
        const featured =
          !disabledFeatured &&
          (!!project.data.featured || !project.data.dateEnd)

        const card = <ProjectCard {...project.data} featured={featured} />

        return (
          <li
            key={project.id}
            className={clsx("h-full", featured && "sm:col-span-2")}
          >
            {project.content ? (
              <Link data-custom-color prefetch="intent" to={project.id}>
                {card}
              </Link>
            ) : (
              card
            )}
          </li>
        )
      })}
    </ul>
  )
}
