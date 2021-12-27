import {
  redirect,
  useLoaderData,
  type LoaderFunction,
  type MetaFunction,
} from "remix"

import Markdown from "~/components/Markdown"
import ShowcaseImage from "~/components/ShowcaseImage"
import {
  getProjectById,
  ProjectTitle,
  ProjectInfo,
  ProjectFooter,
  type ProjectContent,
  type ProjectData,
} from "~/features/projects"
import Prose from "~/components/layouts/Prose"
import { filterPageDraft } from "~/helpers"
import Heading from "~/components/Heading"
import { Paragraph } from "~/components/Text"

export const meta: MetaFunction = (props) => {
  const data: ProjectData = props.data.project.data
  const { title, description = "" } = data

  return {
    title,
    description,
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
  const { title, gallery } = data

  return (
    <Prose>
      <ProjectTitle {...data} />
      <ProjectInfo data={data} />
      <ShowcaseImage src={gallery?.[0]?.url} alt={title} />
      <Markdown code={code} />
      <ProjectFooter project={nextProject} />
    </Prose>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <Prose>
      <Heading as="h1">{"Error with the project"}</Heading>
      <Paragraph>{error.message}</Paragraph>
    </Prose>
  )
}
