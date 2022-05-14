import type { LoaderFunction } from "@remix-run/node"

import { updateBlogList } from "f-blog"
import { apiTypeCallback } from "helpers/api"

/** Projects API endpoint. */
export const loader: LoaderFunction = async ({ request }) => {
  return apiTypeCallback(request, {
    list: updateBlogList,
  })
}

export function CatchBoundary() {}
