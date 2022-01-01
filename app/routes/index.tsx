import { useLoaderData, type MetaFunction } from "remix"

import { getBlog, checkIfFeaturedBlogPost } from "~/features/blog"
import { FeaturedSection, HeroSection } from "~/features/home"
import { getAllProjects, checkIfFeaturedProject } from "~/features/projects"
import type { AwaitedReturn } from "~/types"

export let meta: MetaFunction = () => {
  return {
    title: "Siddhant Gupta",
    description: "Home of Siddhant Gupta.",
  }
}

export async function loader() {
  const featuredBlog = (await getBlog()).filter(checkIfFeaturedBlogPost)
  const featuredProjects = (await getAllProjects()).filter(
    checkIfFeaturedProject,
  )

  return { projects: featuredProjects, blog: featuredBlog }
}

export default function Index() {
  const { projects, blog } = useLoaderData<AwaitedReturn<typeof loader>>()

  return (
    <main>
      <HeroSection />
      <FeaturedSection projects={projects} blog={blog} />
    </main>
  )
}
