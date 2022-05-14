import type { LoaderFunction } from "@remix-run/node"
import {
  getAllBlogPosts,
  filterBlogPostsWithQueryAndTags,
  getBlogPostById,
} from "f-blog"
import {
  filterProjectsWithQueryAndTags,
  getAllProjects,
  getProjectById,
} from "f-projects"
import { getAllTestimonies, getTestimonyById } from "f-testimonials"

enum ApiTypes {
  Blog = "blog",
  Projects = "projects",
  Testimonies = "testimonies",
}

/**
 * General purpose API endpoint for all GS data.
 */
export const loader: LoaderFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url)

  const type = searchParams.get("type")
  if (!type) return error("Parameter 'type' is required.", 400)

  const id = searchParams.get("id")
  const query = searchParams.get("q") || ""
  const selectedTags =
    searchParams.get("tags")?.split(",") || searchParams.getAll("tag") || []

  switch (type.toLowerCase()) {
    case ApiTypes.Testimonies: {
      if (id) {
        return getTestimonyById(id).catch(() =>
          error(`Testimony with id '${id}' not found.`),
        )
      }
      return getAllTestimonies()
    }

    case ApiTypes.Projects: {
      if (id) {
        return getProjectById(id).catch(() =>
          error(`Project with id '${id}' not found.`),
        )
      }
      const projects = await getAllProjects()
      return filterProjectsWithQueryAndTags(projects, query, selectedTags)
    }

    case ApiTypes.Blog: {
      if (id) {
        return getBlogPostById(id).catch(() =>
          error(`Blog post with id '${id}' not found.`),
        )
      }
      const blogPosts = await getAllBlogPosts()
      return filterBlogPostsWithQueryAndTags(blogPosts, query, selectedTags)
    }

    default: {
      const supportedTypes = Object.values(ApiTypes)
      const supportedTypesString = supportedTypes
        .map((type) => `'${type}'`)
        .join(", ")
      return error(
        `Parameter 'type' must be one of: ${supportedTypesString}.`,
        400,
      )
    }
  }
}

export function CatchBoundary() {}

function error(message: string, status: number = 404) {
  return new Response(message, {
    status,
  })
}
