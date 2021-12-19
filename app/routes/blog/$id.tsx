import clsx from "clsx"
import {
  redirect,
  useLoaderData,
  type LoaderFunction,
  type MetaFunction,
} from "remix"

import Image from "~/components/Image"
import Markdown from "~/components/Markdown"
import {
  getBlogPostById,
  BlogInfo,
  type BlogPostContent,
} from "~/features/blog"

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

  if (blogPost.data.draft) {
    return redirect(`..`)
  }

  return blogPost
}

export default function BlogPost(): JSX.Element {
  const { data, content } = useLoaderData<BlogPostContent>()
  const { title, gallery = [] } = data
  const showcaseImage = gallery[0]?.url

  return (
    <section>
      <h1 className="prose">{title}</h1>
      <BlogInfo data={data} className="prose" />
      {showcaseImage ? (
        <Image
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

      <div className="prose">
        <Markdown value={content} />
      </div>
    </section>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return (
    <section>
      <h1 className="prose">{"Error with the project"}</h1>
      <p className="prose">{error.message}</p>
      <p>Go back</p>
    </section>
  )
}
