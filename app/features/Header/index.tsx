import clsx from "clsx"
import GithubIcon from "remixicon-react/GithubFillIcon"
import LinkedinIcon from "remixicon-react/LinkedinBoxFillIcon"

import Logo from "./Logo"
import Navigation, { type NavigationProps } from "./Navigation"

const links: NavigationProps = {
  navLinks: [
    { to: "/about", children: "About" },
    { to: "/projects", children: "Projects" },
    { to: "/blog", children: "Blog" },
    // { to: "/career", children: "Career" },
    // { to: "/education", children: "Education" },
  ],
  socialLinks: [
    {
      href: "https://www.linkedin.com/in/guptasiddhant9",
      children: <LinkedinIcon aria-label="LinkedIn" />,
    },
    {
      href: "https://github.com/guptasiddhant",
      children: <GithubIcon aria-label="GitHub" />,
    },
  ],
}

export default function Header({
  name = "Siddhant Gupta",
}: {
  name?: string
}): JSX.Element {
  return (
    <header
      id="header"
      className={clsx(
        "!bg-opacity-75 bg-base backdrop-blur-md",
        "flex flex-row justify-between items:center sm:items-baseline",
        "container-mx top-0 z-30 sticky",
      )}
    >
      <Logo name={name} />
      <Navigation {...links} />
    </header>
  )
}
