import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node"
import { useCatch, useLoaderData } from "@remix-run/react"

import {
  getProjectById,
  getCrossSellProjects,
  ProjectHero,
  ProjectActions,
  useLogViewProjectEvent,
  type ProjectType,
  type ProjectTeaser,
} from "~/features/projects"
import MarkdownSection from "~/features/mdx"

import { __IS_DEV__ } from "~/helpers"
import Breadcrumbs, { Crumb, type MatchedCrumbProps } from "~/ui/Breadcrumbs"
import { InternalLink } from "~/ui/Link"
import Section from "~/ui/Section"
import StickyHeader from "~/ui/StickyHeader"
import TeaserSection from "~/ui/TeaserSection"
import { H2 } from "~/ui/typography"

interface LoaderData {
  project: ProjectType
  crossSellProjects: ProjectTeaser[]
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
      <StickyHeader>
        <Breadcrumbs />
        <ProjectActions />
      </StickyHeader>

      <ProjectHero {...project} />
      <img
        src={cover}
        alt={project?.title}
        className="max-h-screen-main object-cover aspect-video w-full"
        loading="eager"
      />
      <MarkdownSection>{JSON.parse(project.content || '""')}</MarkdownSection>

      <TeaserSection
        items={crossSellProjects}
        linkBaseUrl="/projects/"
        crossSell
      >
        <H2 className="!p-0">There are some others...</H2>
        <InternalLink to="/projects">View all projects</InternalLink>
      </TeaserSection>
    </>
  )
}

export function CatchBoundary() {
  const catchError = useCatch()

  return (
    <Section.Prose>
      <H2>Could not find the project!</H2>
      <InternalLink to="/projects">{"Back to Projects"}</InternalLink>
      {__IS_DEV__ ? (
        <pre className="whitespace-pre-wrap break-all text-sm text-red-400">
          {JSON.stringify(catchError, null, 2)}
        </pre>
      ) : null}
    </Section.Prose>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Section.Prose>
      <H2>Error occurred!</H2>
      <p>{error.message}</p>
      <InternalLink to="/projects">{"Back to Projects"}</InternalLink>
      {__IS_DEV__ ? (
        <pre className="whitespace-pre-wrap break-all text-sm text-red-400">
          {error.stack}
        </pre>
      ) : null}
    </Section.Prose>
  )
}

export const handle = {
  breadcrumb: (match: MatchedCrumbProps<LoaderData>): JSX.Element => (
    <Crumb match={match}>{match.data.project.title}</Crumb>
  ),
}
