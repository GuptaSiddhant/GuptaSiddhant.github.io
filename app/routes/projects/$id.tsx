import {
  Link,
  LoaderFunction,
  MetaFunction,
  Outlet,
  useLoaderData,
} from "remix"
import { getHeadingClassName } from "~/components/atoms/Heading"
import { getProjectById, ProjectType } from "~/features/projects"
import { compileMdx } from "~/service/mdx.server"

export const meta: MetaFunction = ({ data }) => ({
  title: data?.work?.title || "Work",
})

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id
  if (!id) throw new Error("Project id is required.")

  const project = await getProjectById(id)
  const code = project.content
    ? (await compileMdx(JSON.parse(project.content))).code
    : undefined

  return { project, code }
}

export interface ProjectContext {
  project: ProjectType
  code?: string
}

export default function WorkPage() {
  const { project, code } = useLoaderData<ProjectContext>()

  return (
    <main className="container-mx">
      <Link to="..">
        <p className={getHeadingClassName(6)}>Back to all projects</p>
      </Link>
      <Outlet context={{ project, code }} />
    </main>
  )
}
