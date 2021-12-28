import { useMemo } from "react"
import { Link } from "remix"

import { useIsSSR } from "@react-aria/ssr"
import GithubIcon from "remixicon-react/GithubFillIcon"
import HomepageIcon from "remixicon-react/Home2LineIcon"
import NpmIcon from "remixicon-react/NpmjsLineIcon"
import BlogIcon from "remixicon-react/QuillPenLineIcon"
import PrototypeIcon from "remixicon-react/PlayCircleLineIcon"
import DesignIcon from "remixicon-react/ArtboardLineIcon"

import { InfoBox } from "~/components/atoms/Info"
import CopyButton from "~/components/molecules/CopyButton"
import ExternalLink from "~/components/atoms/ExternalLink"
import Tooltip from "~/components/atoms/Tooltip"
import type { ProjectLink } from "./types"

export interface ProjectLinksProps {
  links: ProjectLink[]
}

/** ProjectLinks component */
export default function ProjectLinks({
  links,
}: ProjectLinksProps): JSX.Element | null {
  const pageUrl = useIsSSR() ? "" : window.location.href

  return (
    <InfoBox field="Links" hideField>
      <div className="flex gap-4">
        {links?.map((link) => (
          <ProjectLinkItem {...link} key={link.url} />
        ))}
        <CopyButton className="relative" content={pageUrl} label="Copy link" />
      </div>
    </InfoBox>
  )
}

function ProjectLinkItem({ url, title, type }: ProjectLink) {
  const [label, children] = useMemo(() => {
    switch (type) {
      case "github":
        return ["Open in GitHub", <GithubIcon aria-label="GitHub" />]
      case "homepage":
        return [
          "Open project's homepage",
          <HomepageIcon aria-label="Homepage" />,
        ]
      case "npm":
        return ["Open in NPM", <NpmIcon aria-label="NPM" />]
      case "blog":
        return ["Open related blog post", <BlogIcon aria-label="Homepage" />]
      case "prototype":
        return ["Open prototype", <PrototypeIcon aria-label="Prototype" />]
      case "design":
        return ["Open design file", <DesignIcon aria-label="Designs" />]
      default:
        return [title, undefined]
    }
  }, [type, title])

  const internal = !url.startsWith("http")

  if (internal)
    return (
      <InternalLink url={url} label={label}>
        {children}
      </InternalLink>
    )

  return (
    <ExternalLink href={url} tooltipLabel={label} customBorder>
      {children}
    </ExternalLink>
  )
}

function InternalLink({
  url,
  children,
  label,
}: {
  url?: string
  children?: React.ReactNode
  label?: string
}): JSX.Element | null {
  if (!url) return null

  const linkElement = (
    <Link to={url} data-custom-border>
      {children}
    </Link>
  )

  if (!label) return linkElement

  return <Tooltip label={label}>{linkElement}</Tooltip>
}
