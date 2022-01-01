import { type NavLinkProps } from "remix"
import GithubIcon from "remixicon-react/GithubFillIcon"
import LinkedinIcon from "remixicon-react/LinkedinBoxFillIcon"

import { socialLinks as aboutSocialLinks } from "~/helpers/about"

export const navLinks = [
  { to: "/timeline", children: "Timeline" },
  { to: "/projects", children: "Projects" },
  { to: "/blog", children: "Blog" },
]

export const socialLinks = [
  {
    href: aboutSocialLinks.linkedin,
    children: <LinkedinIcon aria-label="LinkedIn" />,
  },
  {
    href: aboutSocialLinks.github,
    children: <GithubIcon aria-label="GitHub" />,
  },
]

export interface NavigationProps {
  navLinks: NavLinkProps[]
  socialLinks: SocialLink[]
}

export interface SocialLink {
  href: string
  children: JSX.Element
}
