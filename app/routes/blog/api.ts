import { json } from "remix"

import { generateResponseForPages } from "~/helpers/api"
import { getBlog } from "~/helpers/blog"
import type { LoaderFunctionProps, LoaderFunctionReturn } from "~/types"

export async function loader({
  request,
}: LoaderFunctionProps): LoaderFunctionReturn {
  const blog = await getBlog()

  return json(generateResponseForPages(request, blog))
}

export function CatchBoundary() {}
