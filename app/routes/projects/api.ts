import { json } from "remix"

import { generateResponseForPages } from "~/helpers/api"
import { getAllProjects } from "~/helpers/projects"
import type { LoaderFunctionProps, LoaderFunctionReturn } from "~/types"

export async function loader({
  request,
}: LoaderFunctionProps): LoaderFunctionReturn {
  const projects = await getAllProjects()

  return json(generateResponseForPages(request, projects))
}

export function CatchBoundary() {}
