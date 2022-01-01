import { useLoaderData, type MetaFunction } from "remix"

import FilterForm, { useFilterForm } from "~/components/organisms/FilterForm"
import Section from "~/components/templates/Section"
import { BlogGrid, type BlogPostContent, getBlog } from "~/features/blog"
import { LoaderFunctionProps, AwaitedReturn } from "~/types"

export const meta: MetaFunction = () => {
  return {
    title: "Blog",
    description: "Blog of Siddhant Gupta.",
  }
}

export async function loader({}: LoaderFunctionProps) {
  return await getBlog()
}

export default function Blog(): JSX.Element {
  const blog = useLoaderData<AwaitedReturn<typeof loader>>()
  const { items, filterFormProps } = useFilterForm<BlogPostContent>(
    blog,
    ({ id, data }, query) =>
      [id, data.title, data.subtitle].some((field) => field?.includes(query)),
  )

  return (
    <Section id="filter" className="flex-col">
      <FilterForm {...filterFormProps} searchPlaceholder="Search the blog..." />
      <BlogGrid posts={items} />
    </Section>
  )
}
