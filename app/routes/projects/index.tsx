import clsx from "clsx"
import { json, MetaFunction, type LoaderFunction, useLoaderData } from "remix"

import { getHeadingClassName } from "~/components/atoms/Heading"
import { ProjectType, getAllProjects } from "~/features/projects"
import ProjectCard from "~/features/projects/ProjectCard"

export const meta: MetaFunction = () => ({
  title: "GS Projects",
})

export const loader: LoaderFunction = async () => {
  return json(await getAllProjects())
}

export default function Projects(): JSX.Element {
  const projects = useLoaderData<ProjectType[]>()

  return (
    <main className="container-mx">
      <h1 className={getHeadingClassName(1)}>All Works</h1>

      <ul className="list-none grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-flow-row-dense gap-8">
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx(project.featured && "md:col-span-2")}
          >
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </main>
  )
}
