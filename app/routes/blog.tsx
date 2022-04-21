import { json, type LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import {
  getAllBlogPosts,
  filterBlogPostsWithQueryAndTags,
  BlogList,
  type BlogPostType,
} from "~/features/blog"

import { getUniqueTagsFromObjects } from "~/helpers"
import Filter, { type FilterProps } from "~/ui/Filter"
import { SectionProse } from "~/ui/layout"
import { H1 } from "~/ui/typography"

interface LoaderData extends FilterProps {
  blogPosts: BlogPostType[]
}

export const loader: LoaderFunction = async ({ request }) => {
  const blogPosts = await getAllBlogPosts()
  const allTags = getUniqueTagsFromObjects(blogPosts)

  const searchParams = new URL(request.url).searchParams
  const query = searchParams.get("q")?.trim() || ""
  const selectedTags = searchParams.getAll("tag") ?? []
  const filteredBlogPosts = filterBlogPostsWithQueryAndTags(
    blogPosts,
    query,
    selectedTags,
  )
  const availableTags = getUniqueTagsFromObjects(filteredBlogPosts)

  return json<LoaderData>({
    blogPosts: filteredBlogPosts,

    // filterProps
    allTags,
    availableTags,
    selectedTags,
    query,
    placeholder: "Filter blog posts...",
  })
}

export default function Blog(): JSX.Element {
  const { blogPosts, ...filterProps } = useLoaderData<LoaderData>()

  return (
    <>
      <SectionProse id="hero">
        <div>
          <H1>Blog</H1>
          <p className="mt-4 text-gray-100">
            Thoughts on somethings. Sometimes everything.
          </p>
        </div>
        <Filter {...filterProps} />
      </SectionProse>

      <BlogList blogPosts={blogPosts} />
    </>
  )
}
