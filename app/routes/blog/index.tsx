import { json, type LoaderFunction } from "@remix-run/node"
import { useFetcher, useLoaderData } from "@remix-run/react"

import {
  getAllBlogPosts,
  BlogPostCard,
  type BlogPostType,
} from "~/features/blog"

import { getUniqueTagsFromObjects } from "~/helpers"
import Filter from "~/ui/Filter"
import Section from "~/ui/Section"
import { H1 } from "~/ui/typography"

import { type BlogPostsAPIResponse } from "./api"

interface LoaderData {
  blogPosts: BlogPostType[]
  tags: string[]
}

export const loader: LoaderFunction = async ({ request }) => {
  const blogPosts = await getAllBlogPosts()
  const tags = getUniqueTagsFromObjects(blogPosts)

  return json<LoaderData>({ blogPosts, tags })
}

export default function Blog(): JSX.Element {
  const { blogPosts, tags } = useLoaderData<LoaderData>()
  const blogPostsFilterFetcher = useFetcher<BlogPostsAPIResponse>()
  const filteredBlogPosts = blogPostsFilterFetcher?.data?.blogPosts ?? blogPosts

  return (
    <>
      <Section.Hero>
        <div>
          <H1>Blog</H1>
          <p className="mt-4 text-gray-100">
            Thoughts on somethings. Sometimes everything.
          </p>
        </div>
        <Filter
          action="api"
          placeholder="Filter blog..."
          fetcher={blogPostsFilterFetcher}
          tags={tags}
        />
      </Section.Hero>

      {filteredBlogPosts.length > 0 ? (
        <Section.Prose className="!pt-10">
          <ul className={"flex gap-8 flex-col"}>
            {blogPosts.map((post) => (
              <BlogPostCard key={post.id} blogPost={post} />
            ))}
          </ul>
        </Section.Prose>
      ) : (
        <Filter.Error handleClear={() => blogPostsFilterFetcher.submit(null)}>
          No blog posts found with the given filters.
        </Filter.Error>
      )}
    </>
  )
}
