import {
  Link,
  useLoaderData,
  type LoaderFunction,
  type MetaFunction,
} from "remix"
import { getAllProjects } from "~/helpers/projects"

import type { ProjectContent } from "~/types"

import Article from "~/components/Article"
import clsx from "clsx"

export const meta: MetaFunction = () => {
  return {
    title: "Projects",
    description: "Projects of Siddhant Gupta.",
  }
}

export const loader: LoaderFunction = async () => {
  const projects = await getAllProjects()

  return projects
}

export default function Projects(): JSX.Element {
  const data = useLoaderData<ProjectContent[]>()

  return (
    <section>
      <p>Here are some of the projects I have worked on.</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 grid-flow-row-dense">
        {data.map((project) => {
          const featured = !!project.data.featured || !project.data.dateEnd
          return (
            <li
              key={project.id}
              className={clsx("h-full", featured && "sm:col-span-2")}
            >
              <Link
                data-custom-color
                prefetch="intent"
                to={project.content ? project.id : "."}
              >
                <Article {...project.data} />
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
