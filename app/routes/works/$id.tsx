import {
  Link,
  LoaderFunction,
  MetaFunction,
  Outlet,
  useLoaderData,
} from "remix"
import { getHeadingClassName } from "~/components/atoms/Heading"
import { getWorkItemById, WorkType } from "~/features/works"
import { compileMdx } from "~/service/mdx.server"

export const meta: MetaFunction = ({ data }) => ({
  title: data?.work?.title || "Work",
})

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id
  if (!id) throw new Error("Project id is required.")

  const work = await getWorkItemById(id)
  const code = work.content
    ? (await compileMdx(JSON.parse(work.content))).code
    : undefined

  return { work, code }
}

export interface WorkContext {
  work: WorkType
  code?: string
}

export default function WorkPage() {
  const { work, code } = useLoaderData<WorkContext>()

  return (
    <main className="container-mx">
      <Link to="..">
        <p className={getHeadingClassName(6)}>Back to all works</p>
      </Link>
      <h1 className={getHeadingClassName(1)}>{work.title}</h1>
      <Outlet context={{ work, code }} />
    </main>
  )
}
