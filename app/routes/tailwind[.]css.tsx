import { join } from "path"
import { serveTailwindCss } from "remix-tailwind"

export function loader() {
  const cssFilePath = join("app", "styles", "tailwind.css")

  return serveTailwindCss(cssFilePath)
}

export function CatchBoundary() {}
