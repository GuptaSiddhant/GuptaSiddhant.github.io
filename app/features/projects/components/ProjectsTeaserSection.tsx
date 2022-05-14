import clsx from "clsx"
import { Link } from "@remix-run/react"

import { InternalLink } from "ui/Link"
import Section, { proseWidth } from "ui/Section"
import TeaserCard from "ui/TeaserCard"
import { Caption, H2 } from "ui/typography"

import type { ProjectTeaser } from "../types"

export default function ProjectsTeaserSection({
  id = "projects",
  projects,
  children,
}: {
  id?: string
  projects: ProjectTeaser[]
  children?: React.ReactNode
}): JSX.Element | null {
  if (projects.length === 0) return null

  return (
    <Section id={id}>
      <div className={clsx("flex flex-col gap-4", proseWidth)}>
        {children ?? (
          <>
            <Caption>
              <Link to={"#" + id}>Projects</Link>
            </Caption>
            <H2 className="!p-0">Stuff I've been tinkering with</H2>
            <InternalLink to="/projects">View all projects</InternalLink>
          </>
        )}
      </div>

      <ul
        className={clsx(
          "flex gap-4 sm:gap-10",
          "w-full overflow-auto py-4 px-4 sm:px-10",
          "snap-x snap-mandatory",
          projects.length <= 3 && proseWidth,
        )}
      >
        {projects.map((project) => (
          <TeaserCard key={project.id} {...project} linkBaseUrl="/projects/" />
        ))}
      </ul>
    </Section>
  )
}
