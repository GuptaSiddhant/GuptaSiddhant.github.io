import {
  Link,
  useLoaderData,
  type LoaderFunction,
  type MetaFunction,
} from "remix"
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
      url: url + "?h=400",
    })),
  }))
}

export default function Projects(): JSX.Element {
  const data = useLoaderData<ProjectType[]>()

  return (
    <main>
      <h1>Projects</h1>
      <p>Here are some of the projects I have worked on.</p>
      <section className="my-10">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((project) => (
            <li key={project.slug.current} className="h-full">
              <Link data-customColor to={project.slug.current}>
                <Article {...project} />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

function Article({
  logoUrl,
  title,
  association,
  tags,
  gallery,
}: ProjectType): JSX.Element {
  const showcaseImage = gallery?.[0]?.url || logoUrl
  const showcaseImageCaption = gallery?.[0]?.caption || title

  return (
    <article className="flex flex-col h-full gap-4 p-4 rounded-3xl transition-transform hover:bg-gray-100 dark:hover:bg-gray-800  hover:scale-105">
      <div className="rounded-xl bg-gray-200 dark:bg-black p-2 h-80 overflow-hidden">
        <img
          src={showcaseImage}
          alt={showcaseImageCaption}
          className="rounded object-cover w-full h-full"
        />
      </div>
      <div className="text-yellow-500 font-black uppercase">
        @ {association}
      </div>
      <div className="flex-1 text-2xl font-bold">{title}</div>

      <div className="flex flex-wrap">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </article>
  )
}
