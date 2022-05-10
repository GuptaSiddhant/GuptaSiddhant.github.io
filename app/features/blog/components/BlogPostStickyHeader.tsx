import Breadcrumbs from "~/ui/Breadcrumbs"

import StickyHeader from "~/ui/StickyHeader"

import { type BlogPostType } from ".."

export default function BlogPostStickyHeader(_: BlogPostType): JSX.Element {
  return (
    <StickyHeader className={"justify-between"}>
      <Breadcrumbs />
    </StickyHeader>
  )
}
