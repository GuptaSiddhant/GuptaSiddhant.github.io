import { json, type LoaderFunction } from "@remix-run/node"

import { getBlogPostsList, filterBlogPostsWithQueryAndTags } from "f-blog"
import { getProjectList, filterProjectsWithQueryAndTags } from "f-projects"
import { type SearchFetcherData, type SearchFetcherDataKey } from "f-search"
import { errorResponse } from "helpers/api"
import type { Teaser } from "types"

export const loader: LoaderFunction = async ({ request }) => search(request)

export function CatchBoundary() {}

async function search(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url)

  const query = searchParams.get("q")
  if (query === null) return errorResponse("Parameter 'q' is required.", 400)
  if (!query) {
    const result: SearchFetcherData = { blog: [], projects: [] }
    return json(result)
  }

  const fields = searchParams.getAll("field") as Array<keyof Teaser>
  if (!fields?.length)
    return errorResponse("At least one (1) 'field' parameter is required.", 400)

  try {
    const [blogPosts, projects] = await Promise.all([
      getBlogPostsList(),
      getProjectList(),
    ])

    const result: SearchFetcherData = {
      blog: filterBlogPostsWithQueryAndTags(blogPosts, query, [])
        .sort(sortPredicate)
        .map((item) => transformPredicate(item, ...fields)),
      projects: filterProjectsWithQueryAndTags(projects, query, [])
        .sort(sortPredicate)
        .map((item) => transformPredicate(item, ...fields)),
    }

    return json(result)
  } catch {
    return errorResponse("Error searching blog posts and projects.")
  }
}

function sortPredicate({ id: a }: Teaser, { id: b }: Teaser) {
  if (a < b) return -1
  else return 1
}

function transformPredicate(item: Teaser, ...fields: Array<keyof Teaser>) {
  if (fields.length === 0) return item

  return fields.reduce(
    (acc, field) => ({ ...acc, [field]: item[field] }),
    {} as Pick<Teaser, SearchFetcherDataKey>,
  )
}
