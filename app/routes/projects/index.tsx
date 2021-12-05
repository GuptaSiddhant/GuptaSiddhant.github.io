import {
  Link,
  useLoaderData,
  type LoaderFunction,
  type MetaFunction,
} from "remix"
import { useHover } from "@react-aria/interactions"

import Tag from "~/components/Tag"

import type { ProjectType } from "~/types"

export const meta: MetaFunction = () => {
  return {
    title: "Projects",
    description: "Projects of Siddhant Gupta.",
  }
}

export const loader: LoaderFunction = async () => {
  const BASE_URL =
    "https://lxjtqhm1.api.sanity.io/v1/data/query/production?query="
  const projectsQuery = `* 
    | [_type == "project"] 
    | { _id, slug, title, isCurrent, startDate, endDate, link, description,
      "logoUrl": logo.asset -> url, "association": association -> company, "tags": tags[] -> value,       
      "gallery": gallery[] { caption, "url": asset -> url }
      } 
    | order(isCurrent desc, endDate desc)`
  const encodedQuery = encodeURIComponent(projectsQuery)
  const data = await fetch(BASE_URL + encodedQuery).then((res) => res.json())

  return data.result.map((item: any) => ({
    ...item,
    gallery: item.gallery?.map(({ url, caption }: any) => ({
      caption,
      url: url + "?h=400",
    })),
  }))
}

export default function Projects(): JSX.Element {
  const data = useLoaderData<ProjectType[]>()

  return (
    <section>
      <p>Here are some of the projects I have worked on.</p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((project) => (
          <li key={project._id} className="h-full">
            <Link
              data-custom-color
              prefetch="intent"
              to={project.slug.current}
              state={{ id: project._id }}
            >
              <Article {...project} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Article({
  logoUrl,
  title,
  association,
  tags,
  gallery,
}: ProjectType): JSX.Element {
  const { hoverProps, isHovered } = useHover({})

  const showcaseImage1 = gallery?.[0]?.url || logoUrl
  const showcaseImage2 = gallery?.[1]?.url || showcaseImage1
  const showcaseImage = isHovered ? showcaseImage2 : showcaseImage1
  const showcaseImageCaption = gallery?.[0]?.caption || title

  return (
    <article
      className="flex flex-col h-full gap-4 p-4 rounded-2xl transition-transform hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105"
      {...hoverProps}
    >
      <div className="rounded-lg bg-gray-200 dark:bg-black p-2 h-80 overflow-hidden">
        <img
          src={showcaseImage}
          alt={showcaseImageCaption}
          className="rounded-sm object-cover w-full h-full"
        />
      </div>
      <div className="text-yellow-500 font-black uppercase">{association}</div>
      <div className="flex-1 text-2xl font-bold">{title}</div>

      <div className="flex flex-wrap gap-2 mb-1">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </article>
  )
}
