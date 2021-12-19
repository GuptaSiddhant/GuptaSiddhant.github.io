import { generateResponseForProjects } from "~/features/projects"
import type { LoaderFunctionProps } from "~/types"

export async function loader({ request }: LoaderFunctionProps) {
  return generateResponseForProjects(request)
}

export function CatchBoundary() {}
