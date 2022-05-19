import type { LoaderFunction } from "@remix-run/node"

import { updateProjectList } from "~/features/projects"
import { apiTypeCallback } from "~/helpers/api"

/** Projects API endpoint. */
export const loader: LoaderFunction = async ({ request }) => {
  return apiTypeCallback(request, {
    list: updateProjectList,
  })
}

export function CatchBoundary() {}
