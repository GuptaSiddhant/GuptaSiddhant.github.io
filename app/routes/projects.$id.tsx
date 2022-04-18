import { json, LoaderFunction } from "@remix-run/node"
import { useCatch, useLoaderData } from "@remix-run/react"

import {
  getProjectById,
  ProjectHero,
  ProjectStickyHeader,
  type ProjectType,
} from "~/features/projects"
// import { compileMdx } from "~/service/mdx.server"
import { SectionProse } from "~/ui/layout"
import { InternalLink } from "~/ui/Link"

// import Markdown from "~/ui/Markdown"
import { H2 } from "~/ui/typography"

interface LoaderData {
  project: ProjectType
  code: string
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id
  if (!id) throw new Error("Project id is required")

  const project = await getProjectById(id)

  if (!project) {
    throw new Error(`Project (${id}) not found`)
  }

  try {
    // const { code } = await compileMdx(JSON.parse(project.content || ""))
    return json<LoaderData>({ project, code: "" })
  } catch (e) {
    console.error(e)
    throw new Error(`Project (${id}) could not be compiled. ` + e)
  }
}

export default function ProjectPage(): JSX.Element {
  const { project } = useLoaderData<LoaderData>()

  const cover = project?.gallery?.[0]?.url

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
        alt={project?.title}
        className="max-h-screen-main object-cover"
      />

      {/* <Markdown code={code} /> */}
    </>
  )
}

export function CatchBoundary() {
  const catchError = useCatch()
  return (
    <SectionProse>
      <H2>Could not find the project!</H2>
      <InternalLink to="/projects">{"Back to Projects"}</InternalLink>
      <pre className="whitespace-pre-wrap">
        {JSON.stringify(catchError, null, 2)}
      </pre>
    </SectionProse>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <SectionProse>
      <H2>Error occurred!</H2>
      <p>{error.message}</p>
      <InternalLink to="/projects">{"Back to Projects"}</InternalLink>
      <pre>{error.stack}</pre>
    </SectionProse>
  )
}
