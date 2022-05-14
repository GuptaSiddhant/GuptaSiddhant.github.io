import type { LoaderFunction } from "@remix-run/node"

import { updateBlogList } from "f-blog"
import { getErrorMessage } from "helpers/catch-error"

/** Projects API endpoint. */
export const loader: LoaderFunction = async ({ request }) => {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")

  try {
    switch (type) {
      case "list":
        return updateBlogList()
      default:
        return error(`Unknown action type '${type}'`)
    }
  } catch (e) {
    return error(getErrorMessage(e), 400)
  }
}

export function CatchBoundary() {}

function error(message: string, status: number = 404) {
  return new Response(message, { status })
}
