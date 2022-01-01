import clsx from "clsx"
import GithubIcon from "remixicon-react/GithubFillIcon"
import LinkedinIcon from "remixicon-react/LinkedinBoxFillIcon"

import { socialLinks } from "~/helpers/about"
import Logo from "./Logo"
import Navigation, { type NavigationProps } from "./Navigation"

const links: NavigationProps = {
  navLinks: [
    { to: "/about", children: "Timeline" },
    { to: "/projects", children: "Projects" },
    { to: "/blog", children: "Blog" },
  ],
  socialLinks: [
    {
      href: socialLinks.linkedin,
      children: <LinkedinIcon aria-label="LinkedIn" />,
    },
    {
      href: socialLinks.github,
      children: <GithubIcon aria-label="GitHub" />,
    },
  ],
}

export default function Header(): JSX.Element {
  return (
    <header
      id="header"
      className={clsx(
        "!bg-opacity-75 bg-base backdrop-blur-md",
        "flex flex-row justify-between items:center sm:items-baseline",
        "container-mx top-0 z-30 sticky",
      )}
    >
      <Logo />
      <Navigation {...links} />
    </header>
  )
}
