import { useLoaderData, type MetaFunction } from "remix"

import { HeroSection, FeaturedSection, TestimonySection } from "~/features/home"
import { getAllProjects, checkIfFeaturedProject } from "~/features/projects"
import type { AwaitedReturn } from "~/types"

export let meta: MetaFunction = () => {
  return {
    title: "Siddhant Gupta",
    description: "Home of Siddhant Gupta.",
  }
}

export async function loader() {
  const featuredProjects = (await getAllProjects()).filter(
    checkIfFeaturedProject,
  )

  return { projects: featuredProjects, blog: [] }
}

export default function Index() {
  const { projects, blog } = useLoaderData<AwaitedReturn<typeof loader>>()

  return (
    <main>
      <HeroSection />
      <FeaturedSection projects={projects} blog={blog} />
      <TestimonySection />
    </main>
  )
}
