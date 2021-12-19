import { generateResponseForBlog } from "~/features/blog"
import type { LoaderFunctionProps } from "~/types"

export async function loader({ request }: LoaderFunctionProps) {
  return generateResponseForBlog(request)
}

export function CatchBoundary() {}
