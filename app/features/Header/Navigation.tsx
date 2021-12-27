import { Menu, MenuList, MenuButton, MenuLink } from "@reach/menu-button"
import { useWindowSize } from "@reach/window-size"
import clsx from "clsx"
import { NavLink, type NavLinkProps } from "remix"

import ExternalLink from "~/components/ExternalLink"
import MenuIcon from "remixicon-react/MenuLineIcon"
import CloseIcon from "remixicon-react/CloseCircleLineIcon"

export interface NavigationProps {
  navLinks: NavLinkProps[]
  socialLinks: SocialLink[]
}

interface SocialLink {
  href: string
  children: JSX.Element
}

export default function Navigation({
  navLinks,
  socialLinks,
}: NavigationProps): JSX.Element {
  const { width } = useWindowSize()

  // https://tailwindcss.com/docs/screens
  if (width <= 640) {
    return (
      <Menu>
        {({ isExpanded }) => (
          <>
            <MenuButton className="block sm:hidden">
              {isExpanded ? (
                <CloseIcon aria-label="Close menu" />
              ) : (
                <MenuIcon aria-label="Open menu" />
              )}
            </MenuButton>
            <MenuList className="text-lg font-normal">
              {navLinks.map(({ to, children }) => (
                <MenuLink key={to.toString()} href={to.toString()}>
                  {children}
                </MenuLink>
              ))}
              {socialLinks.map(({ href, children }) => (
                <MenuLink key={href} href={href}>
                  {children}
                </MenuLink>
              ))}
            </MenuList>
          </>
        )}
      </Menu>
    )
  }

  return (
    <nav aria-label="Main navigation">
      <ul className="hidden sm:flex text-lg font-normal gap-4 sm:gap-6 md:gap-8 items-center justify-end">
        {navLinks.map(({ to, children }) => {
          return (
            <li key={to.toString()} className="select-none">
              <NavLink
                to={to}
                prefetch="intent"
                data-custom-color
                className={({ isActive }) =>
                  clsx(isActive ? "text-link-active font-bold" : "text-link")
                }
              >
                {children}
              </NavLink>
            </li>
          )
        })}
        {socialLinks.map(({ href, children }) => (
          <li key={href}>
            <ExternalLink href={href}>{children}</ExternalLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
