import type { LoaderFunction } from "@remix-run/node"
import {
  getBlogPostsList,
  filterBlogPostsWithQueryAndTags,
  getBlogPostById,
} from "~/features/blog"
import {
  filterProjectsWithQueryAndTags,
  getProjectList,
  getProjectById,
} from "~/features/projects"
import { getAllTestimonies, getTestimonyById } from "~/features/testimonials"
import { errorResponse } from "~/helpers/api"

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
  if (!type) return errorResponse("Parameter 'type' is required.", 400)

  const id = searchParams.get("id")
  const query = searchParams.get("q") || ""
  const selectedTags =
    searchParams.get("tags")?.split(",") || searchParams.getAll("tag") || []

  switch (type.toLowerCase()) {
    case ApiTypes.Testimonies: {
      if (id) {
        return getTestimonyById(id).catch(() =>
          errorResponse(`Testimony with id '${id}' not found.`),
        )
      }
      return getAllTestimonies()
    }

    case ApiTypes.Projects: {
      if (id) {
        return getProjectById(id).catch(() =>
          errorResponse(`Project with id '${id}' not found.`),
        )
      }
      const projects = await getProjectList()
      return filterProjectsWithQueryAndTags(projects, query, selectedTags)
    }

    case ApiTypes.Blog: {
      if (id) {
        return getBlogPostById(id).catch(() =>
          errorResponse(`Blog post with id '${id}' not found.`),
        )
      }
      const blogPosts = await getBlogPostsList()
      return filterBlogPostsWithQueryAndTags(blogPosts, query, selectedTags)
    }

    default: {
      const supportedTypes = Object.values(ApiTypes)
      const supportedTypesString = supportedTypes
        .map((type) => `'${type}'`)
        .join(", ")
      return errorResponse(
        `Parameter 'type' must be one of: ${supportedTypesString}.`,
        400,
      )
    }
  }
}

export function CatchBoundary() {}
