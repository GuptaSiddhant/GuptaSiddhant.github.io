import clsx from "clsx"
import { Link } from "remix"

import type { ProjectType } from "../types"

export default function ProjectTeaserCard({
  id,
  title,
  gallery,
}: ProjectType): JSX.Element {
  const cover = gallery?.[0].url

  return (
    <Link to={"projects/" + id} className="group">
      <li
        className={clsx(
          "relative",
          "h-72 min-w-[12rem] overflow-hidden rounded-lg shadow-xl sm:h-[25rem] sm:min-w-[20rem]",
          "bg-gray-800 bg-cover bg-center bg-no-repeat",
        )}
        style={{ backgroundImage: `url(${cover})` }}
      >
        <div
          className={clsx(
            "absolute bottom-0 left-0 right-0",
            "bg-gradient-to-t from-gray-900",
            "p-4 transition-[padding] duration-300 group-hover:py-8 group-focus:py-8",
          )}
        >
          <span className={"text-shadow text-2xl font-bold"}>{title}</span>
        </div>
      </li>
    </Link>
  )
}
