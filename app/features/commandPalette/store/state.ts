import type { CommandPaletteEntry, CommandPaletteState } from "../types"

export const defaultEntries: CommandPaletteEntry[] = [
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

export const defaultState: CommandPaletteState = {
  entries: defaultEntries,
  open: false,
}
