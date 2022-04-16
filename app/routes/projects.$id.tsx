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
  const cover = project.gallery?.[0]?.url

  return (
    <>
      <ProjectStickyHeader {...project} />
      <ProjectHero {...project}>
        <a
          href="#maincontent"
          className="no-underline"
          title="Jump to main content"
        >
          ↓
        </a>
      </ProjectHero>

      <img
        src={cover}
        alt={project.title}
        className="max-h-screen-main object-cover"
      />

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

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <>
      <h2>Error occurred!</h2>
      <p>{error.message}</p>
      <InternalLink to="/projects">{"Back to Projects"}</InternalLink>
      <pre>{error.stack}</pre>
    </>
  )
}
