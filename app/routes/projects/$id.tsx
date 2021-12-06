import { useLoaderData, type LoaderFunction, type MetaFunction } from "remix"

import { getProject } from "~/helpers/projects"
import Markdown from "~/components/Markdown"
import type { ProjectContent } from "~/types"

export const meta: MetaFunction = () => {
  return {
    title: "Projects",
    description: "Projects of Siddhant Gupta.",
  }
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id
  if (!id) throw new Error("Project id is required.")

  const project = await getProject(id)

  return project
}

export default function Projects(): JSX.Element {
  const { data, content } = useLoaderData<ProjectContent>()
  const { title, gallery = [] } = data
  const showcaseImage = gallery[0]?.url

  return (
    <section>
      <h1 className="xl:w-2/3 mx-auto">{title}</h1>
      <div className="rounded-lg bg-depth p-2 h-screen-50 overflow-hidden xl:w-10/12 mx-auto">
        <img
          src={showcaseImage}
          alt={title}
          className="rounded-sm object-cover w-full h-full"
        />
      </div>
      <div className="xl:w-2/3 mx-auto">
        <Markdown value={content} />
      </div>
    </section>
  )
}
