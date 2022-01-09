import { Link, LoaderFunction, useLoaderData } from "remix"
import { getHeadingClassName } from "~/components/atoms/Heading"
import { getWorkItemById, WorkType } from "~/features/works"
import Overdrive from "react-overdrive"
import ShowcaseImage from "~/components/molecules/ShowcaseImage"

export const loader: LoaderFunction = ({ params }) => {
  const id = params.id
  if (!id) throw new Error("Project id is required.")

  return getWorkItemById(id)
}

export default function WorkPage() {
  const work = useLoaderData<WorkType>()
  const { url, alt } = work.gallery?.[0] || {}

  return (
    <main className="container mx-auto px-8">
      <Link to="..">
        <p className={getHeadingClassName(6)}>Back</p>
      </Link>
      <h1 className={getHeadingClassName(1)}>{work.title}</h1>
      <Overdrive id={work.id}>
        <ShowcaseImage src={url} alt={alt} />
      </Overdrive>
      <pre className="whitespace-pre-wrap">{JSON.stringify(work, null, 2)}</pre>
    </main>
  )
}
