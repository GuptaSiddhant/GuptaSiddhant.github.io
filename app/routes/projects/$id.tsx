import clsx from "clsx"
import {
  redirect,
  useLoaderData,
  type LoaderFunction,
  type MetaFunction,
} from "remix"

import Image from "~/components/atoms/Image"
import Markdown from "~/components/Markdown"
import Heading from "~/components/Heading"
import { Paragraph } from "~/components/Text"
import {
  getProjectById,
  ProjectInfo,
  type ProjectContent,
} from "~/features/projects"
import Prose from "~/components/layouts/Prose"
import { filterPageDraft } from "~/helpers"

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

  if (!filterPageDraft(project)) return redirect(`..`)

  return project
}

export default function Project(): JSX.Element {
  const { data, code } = useLoaderData<ProjectContent>()
  const { title, subtitle, description, gallery = [] } = data
  const showcaseImage = gallery[0]?.url

  return (
    <Prose>
      <div className="mb-8">
        <Heading as="h1" className="!m-0">
          {title}
        </Heading>
        <blockquote>{subtitle || description}</blockquote>
      </div>

      <ProjectInfo data={data} />

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

      <Markdown code={code} />
    </Prose>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <Prose>
      <h1 className="prose">{"Error with the project"}</h1>
      <p className="prose">{error.message}</p>
    </Prose>
  )
}
