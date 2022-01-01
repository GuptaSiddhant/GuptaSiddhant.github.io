import { Menu, MenuList, MenuButton, MenuLink } from "@reach/menu-button"
import clsx from "clsx"
import { NavLink } from "remix"
import MenuIcon from "remixicon-react/MenuLineIcon"
import CloseIcon from "remixicon-react/CloseCircleLineIcon"

import ExternalLink from "~/components/atoms/ExternalLink"
import useBreakpoints from "~/helpers/useBreakpoints"
import { navLinks, socialLinks } from "./links"

export default function Navigation(): JSX.Element {
  const { isMobile } = useBreakpoints()

  if (isMobile) {
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
