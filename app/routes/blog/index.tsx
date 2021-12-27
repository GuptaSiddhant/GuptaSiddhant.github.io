import { useLoaderData, type MetaFunction } from "remix"

import FilterForm from "~/components/FilterForm"
import {
  getBlog,
  filterBlogByQuery,
  filterBlogByTags,
  BlogGrid,
  type BlogPostContent,
} from "~/features/blog"
import { generateUniqueTags } from "~/helpers"
import Section from "~/components/layouts/Section"
import { LoaderFunctionProps } from "~/types"

export const meta: MetaFunction = () => {
  return {
    title: "Blog",
    description: "Blog of Siddhant Gupta.",
  }
}

interface LoaderData {
  blog: BlogPostContent[]
  tags: string[]
  searchQuery?: string
  selectedTags: string[]
}

export async function loader({
  request,
}: LoaderFunctionProps): Promise<LoaderData> {
  const { searchParams } = new URL(request.url)
  const querySearchParam = searchParams.get("q")
  const tagsSearchParam = searchParams.get("tags")

  const blog = await getBlog()
  const tags = generateUniqueTags(blog)
  const selectedTags = tagsSearchParam
    ? decodeURIComponent(tagsSearchParam)?.split(",")
    : []

  const filteredBlogBySelectedTags = filterBlogByTags(blog, selectedTags)

  const filteredBlogByQuery = filterBlogByQuery(
    filteredBlogBySelectedTags,
    querySearchParam,
  )

  return {
    tags,
    selectedTags,
    searchQuery: querySearchParam ?? undefined,
    blog: filteredBlogByQuery,
  }
}

export default function Projects(): JSX.Element {
  const { blog, ...filterData } = useLoaderData<LoaderData>()

  return (
    <Section className="flex-col">
      <FilterForm {...filterData} searchPlaceholder="Search the blog..." />
      <BlogGrid posts={blog} />
    </Section>
  )
}
