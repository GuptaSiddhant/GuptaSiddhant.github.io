import clsx from "clsx"
import {
  redirect,
  useLoaderData,
  type LoaderFunction,
  type MetaFunction,
} from "remix"

import ShowcaseImage from "~/components/ShowcaseImage"
import Markdown from "~/components/Markdown"
import {
  getProjectById,
  getNextProject,
  ProjectTitle,
  ProjectInfo,
  ProjectFooter,
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

interface LoaderData {
  project: ProjectContent
  nextProject: ProjectContent | null
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id
  if (!id) throw new Error("Project id is required.")

  const { project, nextProject } = await getProjectById(id)

  if (!filterPageDraft(project)) return redirect(`..`)

  return { project, nextProject }
}

export default function Project(): JSX.Element {
  const {
    project: { data, code },
    nextProject,
  } = useLoaderData<LoaderData>()
  const { title, subtitle, description, gallery = [] } = data
  const showcaseImage = gallery[0]?.url

  return (
    <Prose>
      <ProjectTitle {...data} />
      <ProjectInfo data={data} />
      <ShowcaseImage src={showcaseImage} alt={title} />
      <Markdown code={code} />
      <ProjectFooter project={nextProject} />
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
