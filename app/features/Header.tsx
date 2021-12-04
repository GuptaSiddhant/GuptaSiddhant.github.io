import clsx from "clsx"
import { Link, NavLink } from "remix"

import Icon from "~/components/Icon"
import type { RootData } from "~/types"

interface HeaderProps extends RootData {}

const navLinks = [
  // {
  //   to: "/about",
  //   children: "About",
  // },
  {
    to: "/projects",
    children: "Projects",
  },
  {
    to: "/career",
    children: "Career",
  },
  {
    to: "/education",
    children: "Education",
  },
  {
    to: "/blog",
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
    <header className="x-container flex flex-row justify-between items-baseline">
      <Link
        to="/"
        title={name}
        data-customColor
        data-customBorder
        className="font-bold text-xl leading-normal text-gray-900 dark:text-white my-5 border-0 select-none"
      >
        {name}
      </Link>

      <nav aria-label="Main navigation">
        <ul className="flex text-lg font-normal gap-8 items-center justify-end">
          {navLinks.map(({ to, children }) => {
            return (
              <li key={to} className="hidden lg:block select-none">
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    clsx(
                      isActive
                        ? "text-blue-900 dark:text-blue-50"
                        : "text-blue-700 dark:text-blue-300",
                    )
                  }
                  data-customColor
                >
                  {children}
                </NavLink>
              </li>
            )
          })}
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
