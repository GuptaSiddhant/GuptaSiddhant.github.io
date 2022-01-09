import { json, Link, useLoaderData, type LoaderFunction } from "remix"
import { getHeadingClassName } from "~/components/atoms/Heading"
import { WorkType, getAllWorks } from "~/features/works"
import Overdrive from "react-overdrive"
import { Fragment } from "react"
import TagList from "~/components/molecules/TagList"
import clsx from "clsx"

export const loader: LoaderFunction = async () => {
  return json(await getAllWorks())
}

export default function Works(): JSX.Element {
  const works = useLoaderData<WorkType[]>()

  return (
    <main className="container mx-auto px-8">
      <h1 className={getHeadingClassName(1)}>Works</h1>

      <ul className="list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {works.map((work) => (
          <Link key={work.id} to={work.id} data-custom-border data-custom-color>
            <WorkCard work={work} />
          </Link>
        ))}
      </ul>
    </main>
  )
}

function WorkCard({ work }: { work: WorkType }) {
  const { id, title, gallery, tags } = work
  const { url, alt } = gallery?.[0] || {}

  return (
    <Overdrive id={id} element="li">
      <div
        className={clsx(
          `w-full h-[400px] relative overflow-hidden rounded group`,
          "flex flex-col justify-end",
        )}
      >
        {url ? (
          <img
            src={url}
            alt={alt}
            className="absolute object-cover -z-10 w-full h-full inset-0"
          />
        ) : null}
        <div
          className={clsx(
            "p-4 pt-8 text-white ",
            "bg-gradient-to-t from-gray-500 to-transparent",
            "group-hover:bg-none group-hover:bg-gray-500 group-hover:bg-opacity-50",
            "group-hover:backdrop-blur-sm",
            "transition-[backdrop-filter] duration-300",
          )}
        >
          <div className={getHeadingClassName(5)}>{title}</div>
          {tags ? (
            <TagList
              tags={tags}
              size="sm"
              className={clsx(
                "transition-[max-height] duration-300 mt-2",
                "max-h-0 group-hover:max-h-40",
                "opacity-0 group-hover:opacity-100",
              )}
              tagClassName="bg-blue-800"
              checkIsTagDisabled={() => true}
            />
          ) : null}
        </div>
      </div>
    </Overdrive>
  )
}
