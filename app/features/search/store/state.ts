import type { SearchEntry, SearchState } from "../types"

export const defaultEntries: SearchEntry[] = [
  {
    label: "Blog",
    shortcut: ["b"],
    keywords: "writing words",
    id: "blog",
    href: "/blog",
  },
  {
    label: "Testimonials",
    shortcut: ["t"],
    keywords: "testimonials, testimony",
    id: "testimonials",
    href: "/#testimonials",
  },
  {
    label: "Projects",
    shortcut: ["p"],
    keywords: "project",
    id: "projects",
    href: "/projects",
  },
]

export const defaultState: SearchState = {
  entries: defaultEntries,
  open: false,
}
