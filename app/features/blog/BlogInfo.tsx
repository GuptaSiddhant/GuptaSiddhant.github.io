import { useIsSSR } from "@react-aria/ssr"
import LinkedinIcon from "remixicon-react/LinkedinBoxFillIcon"

import CopyButton from "~/components/CopyButton"
import ExternalLink from "~/components/ExternalLink"
import { InfoBox, InfoList } from "~/components/Info"
import { formatDate } from "~/helpers"
import type { BlogPostData } from "./types"

export function BlogInfo({
  className,
  data: { date, author, subtitle },
}: {
  data: BlogPostData
  className?: string
}) {
  const pageUrl = useIsSSR() ? "" : window.location.href
  const linkedInShareUrl =
    "https://www.linkedin.com/sharing/share-offsite/?url=" +
    encodeURIComponent(pageUrl)

  return (
    <InfoList className={className}>
      {subtitle ? (
        <InfoBox field="Description" hideField className="w-full">
          {subtitle}
        </InfoBox>
      ) : null}
      <div>
        <InfoBox field="Author" hideField>
          <small className="text-yellow-500">{author}</small>
        </InfoBox>
        <InfoBox field="Date" hideField>
          <small className={"text-tertiary"}>
            {formatDate(date, { day: "numeric" })}
          </small>
        </InfoBox>
      </div>
      <div className="flex self-center gap-4">
        <ExternalLink
          href={linkedInShareUrl}
          tooltipLabel="Share on LinkedIn"
          customBorder
        >
          <LinkedinIcon aria-label="LinkedIn" />
        </ExternalLink>
        <CopyButton className="relative" content={pageUrl} label="Copy link" />
      </div>
    </InfoList>
  )
}
