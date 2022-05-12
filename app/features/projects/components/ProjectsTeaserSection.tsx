import clsx from "clsx"
import { Link } from "@remix-run/react"

import { InternalLink } from "~/ui/Link"
import Section, { proseWidth } from "~/ui/Section"
import { Caption, H2 } from "~/ui/typography"

import type { ProjectTypeMinimal } from "../types"
import ProjectTeaserCard from "./ProjectTeaserCard"

export default function ProjectsTeaserSection({
  projects,
}: {
  projects: ProjectTypeMinimal[]
}): JSX.Element {
  return (
    <Section id="projects">
      <div className={clsx("flex flex-col gap-4", proseWidth)}>
        <Caption>
          <Link to="#projects">Projects</Link>
        </Caption>
        <H2 className="!p-0">Stuff I've been tinkering with</H2>
        <InternalLink to="/projects">View all projects</InternalLink>
      </div>

      <ul
        className={clsx(
          "flex gap-4 sm:gap-10",
          "w-full overflow-auto py-4 px-4 sm:px-10",
          "snap-x snap-mandatory",
        )}
      >
        {projects.map((project) => (
          <ProjectTeaserCard key={project.id} {...project} />
        ))}
      </ul>
    </Section>
  )
}
