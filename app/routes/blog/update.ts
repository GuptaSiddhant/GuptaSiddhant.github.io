import type { LoaderFunction } from "@remix-run/server-runtime"

import { updateBlogList } from "~/features/blog"
import { apiTypeCallback } from "~/helpers/api"

/** Projects API endpoint. */
export const loader: LoaderFunction = async ({ request }) => {
  return apiTypeCallback(request, {
    list: updateBlogList,
  })
}

export function CatchBoundary() {}
