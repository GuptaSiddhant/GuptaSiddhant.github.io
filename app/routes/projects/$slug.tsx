import {
  // Link,
  useLoaderData,
  type LoaderFunction,
  type MetaFunction,
} from "remix"

import type { ProjectType } from "~/types"

export const meta: MetaFunction = () => {
  return {
    title: "Projects",
    description: "Projects of Siddhant Gupta.",
  }
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const slug = params.slug

  const BASE_URL =
    "https://lxjtqhm1.api.sanity.io/v1/data/query/production?query="
  const projectsQuery = `*
    | [_type == "project" && slug.current == "${slug}"]
    | { slug, title, isCurrent, startDate, endDate, link, description,
      "logoUrl": logo.asset -> url, "association": association -> company, "tags": tags[] -> value,
      "gallery": gallery[] { caption, "url": asset -> url,  }
    }
    | order(isCurrent desc, endDate desc)`
  const encodedQuery = encodeURIComponent(projectsQuery)
  const data = await fetch(BASE_URL + encodedQuery).then((res) => res.json())

  return data.result.map((item: any) => ({
    ...item,
    gallery: item.gallery?.map(({ url, caption }: any) => ({
      caption,
      url: url + "?h=1000",
    })),
  }))[0]
}

export default function Projects(): JSX.Element {
  const { title, gallery, logoUrl } = useLoaderData<ProjectType>()
  const showcaseImage = gallery?.[0]?.url || logoUrl

  return (
    <section>
      <h1 className="xl:w-2/3">{title}</h1>
      <div className="rounded-lg bg-gray-200 dark:bg-black p-2 h-screen-60 overflow-hidden">
        <img
          src={showcaseImage}
          alt={title}
          className="rounded-sm object-cover w-full h-full"
        />
      </div>
    </section>
  )
}
