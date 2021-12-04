import { Link, NavLink } from "remix"

import Icon from "~/components/Icon"
import type { RootData } from "~/types"

interface HeaderProps extends RootData {}

const navLinks = [
  // {
  //   to: "/about",
  //   className: navLinkClassName,
  //   children: "About",
  // },
  {
    to: "/career",
    className: navLinkClassName,
    children: "Career",
  },
  {
    to: "/education",
    className: navLinkClassName,
    children: "Education",
  },
  {
    to: "/projects",
    className: navLinkClassName,
    children: "Projects",
  },
  {
    to: "/blog",
    className: navLinkClassName,
    children: "Blog",
  },
]

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/guptasiddhant9",
    children: <Icon name="linkedin" />,
  },
  {
    href: "https://github.com/guptasiddhant",
    children: <Icon name="github" />,
  },
]

export default function Header({ name }: HeaderProps): JSX.Element {
  return (
    <header className="x-container flex flex-row justify-between items-center">
      <Link
        to="/"
        title={name}
        className="hover:no-underline font-bold text-3xl leading-normal text-gray-900 dark:text-white my-5 border-0"
      >
        {name}
      </Link>

      <nav aria-label="Main navigation">
        <ul className="flex text-lg font-normal gap-8 items-center justify-end">
          {navLinks.map((link) => (
            <li key={link.to} className="hidden lg:block">
              <NavLink {...link} />
            </li>
          ))}
          {socialLinks.map((link) => (
            <li key={link.href}>
              <a target="_blank" {...link} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

function navLinkClassName({ isActive }: { isActive: boolean }) {
  return [isActive ? "text-white" : ""].join(" ")
}
