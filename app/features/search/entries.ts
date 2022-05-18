import type { SearchCategory } from "./types"

export const navigation: SearchCategory = {
  title: "Navigate",
  entries: [
    {
      id: "home",
      title: "Go to Home",
      shortcut: ["Shift", "h"],
      keywords: ["home", "index"],
      href: "/",
    },
    {
      id: "about",
      title: "Go to About",
      shortcut: ["Shift", "a"],
      keywords: ["about", "life"],
      href: "/about",
    },
    {
      id: "blog",
      title: "Go to Blog",
      shortcut: ["Shift", "b"],
      keywords: ["writing", "words"],
      href: "/blog",
    },
    {
      id: "projects",
      title: "Go to Projects",
      shortcut: ["Shift", "p"],
      keywords: ["project"],
      href: "/projects",
    },
    {
      id: "testimonials",
      title: "Go to Testimonials",
      shortcut: ["Shift", "t"],
      keywords: ["testimonials", "testimony"],
      href: "/#testimonials",
    },
  ],
}
