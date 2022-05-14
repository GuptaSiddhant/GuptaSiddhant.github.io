import type { LoaderFunction } from "@remix-run/node"

import { updateProjectList } from "f-projects"
import { apiTypeCallback } from "helpers/api"

/** Projects API endpoint. */
export const loader: LoaderFunction = async ({ request }) => {
  return apiTypeCallback(request, {
    list: updateProjectList,
  })
}

export function CatchBoundary() {}
