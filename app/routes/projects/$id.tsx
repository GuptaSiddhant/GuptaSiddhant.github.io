import clsx from "clsx"
import {
  redirect,
  useLoaderData,
  type LoaderFunction,
  type MetaFunction,
} from "remix"

import Image from "~/components/Image"
import Markdown from "~/components/Markdown"
import {
  getProjectById,
  ProjectInfo,
  type ProjectContent,
} from "~/features/projects"

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

  if (project.data.draft) {
    return redirect(`..`)
  }

  return project
}

export default function Project(): JSX.Element {
  const { data, content } = useLoaderData<ProjectContent>()
  const { title, gallery = [] } = data
  const showcaseImage = gallery[0]?.url

  return (
    <section>
      <h1 className="prose">{title}</h1>
      <ProjectInfo data={data} className="prose" />
      {showcaseImage ? (
        <Image
          src={showcaseImage}
          alt={title}
          className={clsx(
            "rounded-xl",
            "border-8 border-depth",
            "-mx-4",
            "aspect-w-16 aspect-h-9",
          )}
        />
      ) : null}

      <div className="prose">
        <Markdown value={content} />
      </div>
    </section>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <section>
      <h1 className="prose">{"Error with the project"}</h1>
      <p className="prose">{error.message}</p>
    </section>
  )
}
