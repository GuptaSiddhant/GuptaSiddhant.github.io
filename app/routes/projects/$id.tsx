import {
  redirect,
  useLoaderData,
  type LoaderFunction,
  type MetaFunction,
} from "remix"
import clsx from "clsx"

import { getProjectById } from "~/helpers/projects"
import Markdown from "~/components/Markdown"
import Image from "~/components/Image"
import InfoBanner from "~/components/Info"
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
      <InfoBanner data={data} className="prose" />
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
      <h1>{"Error with the project"}</h1>
      <p>{error.message}</p>
    </section>
  )
}
