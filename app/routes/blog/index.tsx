import { useLoaderData, type MetaFunction } from "remix"

import FilterForm from "~/components/organisms/FilterForm"
import Section from "~/components/templates/Section"
import { BlogGrid, getBlog, filterBlogByRequest } from "~/features/blog"
import { generateUniqueTags } from "~/helpers"
import { LoaderFunctionProps, AwaitedReturn } from "~/types"

export const meta: MetaFunction = () => {
  return {
    title: "Blog",
    description: "Blog of Siddhant Gupta.",
  }
}

export async function loader({ request }: LoaderFunctionProps) {
  const blog = await getBlog()
  const tags = generateUniqueTags(blog)

  const { selectedTags, searchQuery, filteredBlog } = filterBlogByRequest(
    blog,
    request,
  )

  return {
    tags,
    selectedTags,
    searchQuery,
    blog: filteredBlog,
  }
}

export default function Blog(): JSX.Element {
  const { blog, ...filterData } = useLoaderData<AwaitedReturn<typeof loader>>()

  return (
    <Section id="filter" className="flex-col">
      <FilterForm {...filterData} searchPlaceholder="Search the blog..." />
      <BlogGrid posts={blog} />
    </Section>
  )
}
