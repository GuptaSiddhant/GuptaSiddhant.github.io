import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node"
import { useCatch, useLoaderData } from "@remix-run/react"

import {
  getProjectById,
  ProjectHero,
  ProjectStickyHeader,
  type ProjectType,
} from "~/features/projects"

import { SectionProse } from "~/ui/layout"
import { InternalLink } from "~/ui/Link"

import MarkdownSection from "~/ui/MarkdownSection"
import { H2 } from "~/ui/typography"

interface LoaderData {
  project: ProjectType
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id
  if (!id) throw new Error("Project id is required")

  const project = await getProjectById(id)

  if (!project) {
    throw new Error(`Project (${id}) not found`)
  }

  try {
    return json<LoaderData>({ project })
  } catch (e) {
    console.error(e)
    throw new Error(`Project (${id}) could not be compiled. ` + e)
  }
}

export const meta: MetaFunction = ({ data }: { data: LoaderData }) => {
  return {
    title: data.project.title,
    description: data.project.description || data.project.subtitle,
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
        className="max-h-screen-main object-cover aspect-video w-full"
        loading="eager"
      />

      <MarkdownSection>{JSON.parse(project.content || '""')}</MarkdownSection>
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
