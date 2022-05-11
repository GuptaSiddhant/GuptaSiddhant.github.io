import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node"
import { useCatch, useLoaderData } from "@remix-run/react"

import {
  getProjectById,
  ProjectHero,
  ProjectStickyHeader,
  type ProjectType,
} from "~/features/projects"
import MarkdownSection from "~/features/mdx"

import { Crumb, type MatchedCrumbProps } from "~/ui/Breadcrumbs"
import Section from "~/ui/Section"
import { InternalLink } from "~/ui/Link"
import { H2 } from "~/ui/typography"

interface LoaderData {
  project: ProjectType
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id
  if (!id) throw new Error("Project id is required")

  try {
    const project = await getProjectById(id)
    if (!project) throw new Error(`Project (${id}) not found.`)

    return json<LoaderData>({ project })
  } catch (e) {
    throw new Error(`Failed to load project (${id}): ${e}`)
  }
}

export const meta: MetaFunction = ({ data }: { data: LoaderData }) => {
  if (!data?.project) return {}

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
      <ProjectHero {...project} />

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
    <Section.Prose>
      <H2>Could not find the project!</H2>
      <InternalLink to="/projects">{"Back to Projects"}</InternalLink>
      <pre className="whitespace-pre-wrap">
        {JSON.stringify(catchError, null, 2)}
      </pre>
    </Section.Prose>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Section.Prose>
      <H2>Error occurred!</H2>
      <p>{error.message}</p>
      <InternalLink to="/projects">{"Back to Projects"}</InternalLink>
      <pre>{error.stack}</pre>
    </Section.Prose>
  )
}

export const handle = {
  breadcrumb: (match: MatchedCrumbProps<LoaderData>): JSX.Element => (
    <Crumb match={match}>{match.data.project.title}</Crumb>
  ),
}
