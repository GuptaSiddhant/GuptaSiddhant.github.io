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
  lastScrollPosition: undefined,
}
