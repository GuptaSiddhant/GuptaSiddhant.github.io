import { useLoaderData, type MetaFunction } from "remix"

import { getBlog, checkIfFeaturedBlogPost } from "~/features/blog"
import {
  FeaturedSection,
  HeroSection,
  type FeaturedGridProps,
} from "~/features/home"
import { getAllProjects, checkIfFeaturedProject } from "~/features/projects"

export let meta: MetaFunction = () => {
  return {
    title: "Siddhant Gupta",
    description: "Home of Siddhant Gupta.",
  }
}

interface LoaderData extends FeaturedGridProps {}

export async function loader() {
  const featuredBlog = (await getBlog()).filter(checkIfFeaturedBlogPost)
  const featuredProjects = (await getAllProjects()).filter(
    checkIfFeaturedProject,
  )

  return { projects: featuredProjects, blog: featuredBlog }
}

export default function Index() {
  const { projects, blog } = useLoaderData<LoaderData>()

  return (
    <main>
      <HeroSection />
      <FeaturedSection projects={projects} blog={blog} />
    </main>
  )
}

export { ErrorBoundary } from "~/components/ErrorBoundary"
