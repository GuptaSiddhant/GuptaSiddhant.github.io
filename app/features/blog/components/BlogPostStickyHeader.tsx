import { Link } from "@remix-run/react"
import clsx from "clsx"

import StickyHeader from "~/ui/StickyHeader"

import { type BlogPostType } from ".."
// import BlogPostActions from "./BlogPostActions"

export default function BlogPostStickyHeader({
  title,
}: BlogPostType): JSX.Element {
  return (
    <StickyHeader className={"justify-between"}>
      <Link
        to="#main"
        className={clsx(
          "text-xl font-bold text-gray-200 hover:text-white",
          "text-ellipsis overflow-hidden whitespace-nowrap",
        )}
      >
        {title}
      </Link>
      {/* <ProjectActions /> */}
    </StickyHeader>
  )
}
