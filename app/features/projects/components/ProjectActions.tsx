import ShareIcon from "remixicon-react/ShareForwardLineIcon"
import StarLineIcon from "remixicon-react/StarLineIcon"
import EditIcon from "remixicon-react/EditLineIcon"

import { InternalLink } from "ui/Link"

export default function ProjectActions() {
  return (
    <menu className="flex gap-4">
      <li>
        <InternalLink to="edit">
          <EditIcon aria-label="Edit project" />
        </InternalLink>
      </li>
      <li>
        <StarLineIcon
          aria-label="Add to favourites"
          className="fill-blue-400 hover:fill-blue-100"
        />
      </li>
      <li>
        <InternalLink to="#">
          <ShareIcon aria-label="Share project" />
        </InternalLink>
      </li>
    </menu>
  )
}
