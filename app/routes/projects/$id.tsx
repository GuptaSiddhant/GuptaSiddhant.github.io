import { useLoaderData, type LoaderFunction, type MetaFunction } from "remix"

import { getProjectById } from "~/helpers/projects"
import Markdown from "~/components/Markdown"
import type { ProjectContent } from "~/types"
import clsx from "clsx"

export const meta: MetaFunction = () => {
  return {
    title: "Projects",
    description: "Projects of Siddhant Gupta.",
  }
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id
  if (!id) throw new Error("Project id is required.")

  const project = await getProjectById(id)

  return project
}

export default function Project(): JSX.Element {
  const { data, content } = useLoaderData<ProjectContent>()
  const { title, gallery = [] } = data
  const showcaseImage = gallery[0]?.url

  return (
    <section>
      <h1 className="content">{title}</h1>
      <div
        className={clsx(
          "rounded-xl",
          "bg-depth",
          "border-8 border-depth",
          "min-h-screen-50",
          "overflow-hidden",
          "xl:w-10/12",
          "mx-auto",
        )}
      >
        <img src={showcaseImage} alt={title} className="img-cover" />
      </div>
      <div className="content">
        <Markdown value={content} />
      </div>
    </section>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <section>
      <h1>{"There was an error"}</h1>
      <p>{error.message}</p>
    </section>
  )
}
