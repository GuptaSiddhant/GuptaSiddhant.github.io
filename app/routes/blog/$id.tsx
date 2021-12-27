import clsx from "clsx"
import {
  redirect,
  useLoaderData,
  type LoaderFunction,
  type MetaFunction,
} from "remix"

import Figure from "~/components/Figure"
import Markdown from "~/components/Markdown"
import {
  getBlogPostById,
  BlogInfo,
  type BlogPostContent,
} from "~/features/blog"
import Prose from "~/components/layouts/Prose"
import { filterPageDraft } from "~/helpers"

export const meta: MetaFunction = () => {
  return {
    title: "Blog",
    description: "Blog of Siddhant Gupta.",
  }
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id
  if (!id) throw new Error("Blog post id is required.")

  const blogPost = await getBlogPostById(id)

  if (!filterPageDraft(blogPost)) return redirect(`..`)

  return blogPost
}

export default function BlogPost(): JSX.Element {
  const { data, code } = useLoaderData<BlogPostContent>()
  const { title, gallery = [] } = data
  const showcaseImage = gallery[0]?.url

  return (
    <Prose>
      <h1>{title}</h1>
      <BlogInfo data={data} />
      {showcaseImage ? (
        <Figure
          src={showcaseImage}
          alt={title}
          className={clsx(
            "rounded-xl",
            "border-8 border-depth",
            "-mx-4",
            "aspect-w-16 aspect-h-9",
          )}
        />
      ) : null}

      <Markdown code={code} />
    </Prose>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <Prose>
      <h1>{"Error with the project"}</h1>
      <p>{error.message}</p>
      <p>Go back</p>
    </Prose>
  )
}
