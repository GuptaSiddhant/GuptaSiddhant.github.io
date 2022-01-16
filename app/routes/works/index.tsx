import clsx from "clsx"
import { json, MetaFunction, type LoaderFunction, useLoaderData } from "remix"

import { getHeadingClassName } from "~/components/atoms/Heading"
import { WorkType, getAllWorks } from "~/features/works"
import WorkCard from "~/features/works/WorkCard"

export const meta: MetaFunction = () => ({
  title: "GS Works",
})

export const loader: LoaderFunction = async () => {
  return json(await getAllWorks())
}

export default function Works(): JSX.Element {
  const works = useLoaderData<WorkType[]>()

  return (
    <main className="container-mx">
      <h1 className={getHeadingClassName(1)}>All Works</h1>

      <ul className="list-none grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-flow-row-dense gap-8">
        {works.map((work) => (
          <li key={work.id} className={clsx(work.featured && "md:col-span-2")}>
            <WorkCard work={work} />
          </li>
        ))}
      </ul>
    </main>
  )
}
