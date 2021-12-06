import clsx from "clsx"
import { Link, NavLink, type NavLinkProps } from "remix"

import Icon from "~/components/Icon"
import type { RootData } from "~/types"

interface HeaderProps extends RootData {}

const navLinks = [
  // { to: "/about", children: "About" },
  { to: "/projects", children: "Projects" },
  // { to: "/career", children: "Career" },
  // { to: "/education", children: "Education" },
  // { to: "/blog", children: "Blog" },
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
    <header className="x-container flex flex-row justify-between items-center  top-0 bg-base z-50">
      <Logo name={name} />

      <nav aria-label="Main navigation">
        <ul className="flex text-lg font-normal gap-4 sm:gap-6 md:gap-8 items-center justify-end">
          {navLinks.map((link) => {
            return (
              <li key={link.to} className="select-none">
                <RouteLink {...link} />
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

function Logo({ name }: HeaderProps): JSX.Element {
  return (
    <Link
      to="/"
      title={name}
      data-custom-color
      data-custom-border
      className="font-bold text-xl leading-normal text-black dark:text-white my-5 border-0 select-none"
    >
      {name}
    </Link>
  )
}

function RouteLink({ to, children }: NavLinkProps): JSX.Element {
  return (
    <NavLink
      to={to}
      prefetch="intent"
      data-custom-color
      className={({ isActive }) =>
        clsx(isActive ? "text-link-active" : "text-link")
      }
    >
      {children}
    </NavLink>
  )
}
