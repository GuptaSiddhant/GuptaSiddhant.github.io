import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node"
import { useCatch, useLoaderData } from "@remix-run/react"

import {
  getProjectById,
  getCrossSellProjects,
  ProjectHero,
  ProjectStickyHeader,
  ProjectsTeaserSection,
  useLogViewProjectEvent,
  type ProjectType,
  type ProjectTeaserType,
} from "f-projects"
import MarkdownSection from "f-mdx"

import { Crumb, type MatchedCrumbProps } from "ui/Breadcrumbs"
import Section from "ui/Section"
import { InternalLink } from "ui/Link"
import { H2 } from "ui/typography"

interface LoaderData {
  project: ProjectType
  crossSellProjects: ProjectTeaserType[]
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id
  if (!id) throw new Error("Project id is required")

  try {
    const project = await getProjectById(id)
    if (!project) throw new Error(`Project (${id}) not found.`)
    const crossSellProjects = await getCrossSellProjects(project)

    return json<LoaderData>({ project, crossSellProjects })
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
  const { project, crossSellProjects } = useLoaderData<LoaderData>()
  const cover = project?.gallery?.[0]?.url

  useLogViewProjectEvent(project)

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

      <ProjectsTeaserSection projects={crossSellProjects}>
        <H2 className="!p-0">There are some others...</H2>
        <InternalLink to="/projects">View all projects</InternalLink>
      </ProjectsTeaserSection>
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
      <pre className="whitespace-pre-wrap">{error.stack}</pre>
    </Section.Prose>
  )
}

export const handle = {
  breadcrumb: (match: MatchedCrumbProps<LoaderData>): JSX.Element => (
    <Crumb match={match}>{match.data.project.title}</Crumb>
  ),
}
