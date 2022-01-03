import {
  redirect,
  useLoaderData,
  type LoaderFunction,
  type MetaFunction,
} from "remix"

import Markdown from "~/components/templates/Markdown"
import ShowcaseImage from "~/components/molecules/ShowcaseImage"
import {
  getProjectById,
  ProjectTitle,
  ProjectInfo,
  ProjectFooter,
  type ProjectContent,
  type ProjectData,
} from "~/features/projects"
import Prose from "~/components/templates/Prose"
import { filterPageDraft } from "~/helpers"
import { H1 } from "~/components/atoms/Heading"
import { Paragraph } from "~/components/atoms/Text"

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id
  if (!id) throw new Error("Project id is required.")

  const { project, nextProject } = await getProjectById(id)

  if (!filterPageDraft(project)) return redirect(`..`)

  return project
}

export default function Project(): JSX.Element {
  const { data, code, content } = useLoaderData<ProjectContent>()
  const { title, gallery } = data

  return <Prose>{title}</Prose>
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <Prose>
      <H1>{"Error with the project"}</H1>
      <Paragraph>{error.message}</Paragraph>
    </Prose>
  )
}
