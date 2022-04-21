import { json, type LoaderFunction } from "@remix-run/node"
import { Form, Link, useLoaderData, useSubmit } from "@remix-run/react"
import clsx from "clsx"
import {
  getAllBlogPosts,
  BlogPostCard,
  type BlogPostType,
} from "~/features/blog"

import { filterUniqueTagsByOccurrence } from "~/helpers"
import Input from "~/ui/Input"
import { SectionProse } from "~/ui/layout"
import Tags from "~/ui/Tags"
import { H1 } from "~/ui/typography"

interface LoaderData {
  blogPosts: BlogPostType[]
  tags: string[]
  selectedTags: string[]
  query: string
}

export const loader: LoaderFunction = async ({ request }) => {
  const blogPosts = await getAllBlogPosts()

  const availableTags = blogPosts
    .flatMap((project) => project.tags)
    .filter(Boolean)
  const uniqueTags = filterUniqueTagsByOccurrence(availableTags)

  const searchParams = new URL(request.url).searchParams
  const query = searchParams.get("q")?.trim() || ""
  const selectedTags = searchParams.getAll("tag") ?? []
  //   const filteredProjects = filterProjectsWithQueryAndTags(
  //     blogPosts,
  //     query,
  //     selectedTags,
  //   )

  return json<LoaderData>({
    blogPosts,
    tags: uniqueTags,
    selectedTags,
    query,
  })
}

export default function Blog(): JSX.Element {
  const { blogPosts } = useLoaderData<LoaderData>()

  return (
    <>
      <SectionProse id="hero">
        <div>
          <H1>Blog</H1>
          <p className="mt-4 text-gray-100">
            Thoughts on somethings, sometimes everything.
          </p>
        </div>
        {/* <BlogFilter /> */}
      </SectionProse>

      <SectionProse className="!pt-0">
        <ul className={clsx("flex gap-8 flex-col")}>
          {blogPosts.map((post) => (
            <li key={post.id} className="">
              <BlogPostCard blogPost={post} />
            </li>
          ))}
        </ul>
      </SectionProse>
    </>
  )
}

function BlogFilter(): JSX.Element {
  const { tags, selectedTags, query } = useLoaderData<LoaderData>()
  const submit = useSubmit()

  return (
    <Form
      id="filter-form"
      className="relative"
      onChange={(e) => submit(e.currentTarget)}
      onReset={() => submit({})}
    >
      <Input
        type="search"
        name="q"
        className="w-full md:-mx-4 md:w-full-m4"
        placeholder="Filter blog..."
        defaultValue={query}
      />
      <Tags.List
        tags={tags}
        className=" justify-center"
        TagComponent={({ tag }) => (
          <Tags.Checkbox
            label={tag}
            value={tag.toLowerCase()}
            name="tag"
            defaultChecked={selectedTags.includes(tag.toLowerCase())}
          />
        )}
      />
      {selectedTags.length > 0 || query.length > 0 ? (
        <Tags.Button
          type="reset"
          className="absolute top-1 right-1 md:-right-3"
        >
          Clear
        </Tags.Button>
      ) : undefined}
    </Form>
  )
}
