import type { SearchEntry } from "../types"

export const defaultEntries: SearchEntry[] = [
  {
    label: "Home",
    shortcut: ["Shift", "h"],
    keywords: "home, index",
    id: "home",
    href: "/",
  },
  {
    label: "Blog",
    shortcut: ["Shift", "b"],
    keywords: "writing words",
    id: "blog",
    href: "/blog",
  },
  {
    label: "Projects",
    shortcut: ["Shift", "p"],
    keywords: "project",
    id: "projects",
    href: "/projects",
  },
  {
    label: "Testimonials",
    shortcut: ["Shift", "t"],
    keywords: "testimonials, testimony",
    id: "testimonials",
    href: "/#testimonials",
  },
]
