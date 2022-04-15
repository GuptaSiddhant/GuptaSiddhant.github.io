import { json, useLoaderData, type LoaderFunction } from "remix"

import {
  getProjectById,
  ProjectHero,
  ProjectStickyHeader,
  type ProjectType,
} from "~/features/projects"
import { compileMdx } from "~/service/mdx.server"
import { InternalLink } from "~/ui/Link"

import Markdown from "~/ui/Markdown"

interface LoaderData {
  project: ProjectType
  code: string
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id
  if (!id) throw new Error("Project id is required")

  const project = await getProjectById(id)
  if (!project) throw new Error(`Project (${id}) not found`)

  const { code } = await compileMdx(project.content || "")

  return json<LoaderData>({ project, code })
}

export default function ProjectPage(): JSX.Element {
  const { project, code } = useLoaderData<LoaderData>()
  const { gallery, title } = project
  const cover = gallery?.[0]?.url

  return (
    <>
      <ProjectStickyHeader {...project} />
      <ProjectHero {...project} />

      <img src={cover} alt={title} className="max-h-screen-main object-cover" />

      <Markdown code={code} />
    </>
  )
}

export function CatchBoundary() {
  return (
    <>
      <h2>Could not find the project!</h2>
      <InternalLink to="/projects">{"Back to Projects"}</InternalLink>
    </>
  )
}
