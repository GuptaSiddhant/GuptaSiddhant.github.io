import clsx from "clsx"
import { Link } from "@remix-run/react";
import { ProjectType } from "../types"

export default function ProjectCard({
  project,
  className,
}: {
  project: ProjectType
  className?: string
}): JSX.Element {
  const { id, title, icon, gallery, subtitle, description, featured, dateEnd } =
    project
  const cover = gallery?.[0].url
  const showDescription = (featured || !dateEnd) && description

  return (
    <Link to={id} className={clsx("group ", calculateProjectGridSpan(project))}>
      <article
        className={clsx(
          "relative",
          "h-full overflow-hidden rounded-lg",
          "bg-gray-800 bg-cover bg-center bg-no-repeat",
          className,
        )}
        style={{ backgroundImage: `url(${cover})` }}
      >
        <div
          className={clsx(
            "rounded-lg",
            "h-0 w-full p-4 pl-8 group-hover:h-full group-focus:h-full",
            "group-hover:bg-gray-700/50 group-hover:backdrop-blur",
            "group-focus:bg-gray-700/50 group-focus:backdrop-blur",
            "invisible transition-all group-hover:visible group-focus:visible",
            "flex flex-col items-start justify-center gap-2",
          )}
        >
          {icon ? (
            <img
              src={icon}
              alt={title}
              className="mb-2 h-12 rounded object-contain"
            />
          ) : null}
          <strong className="white text-2xl font-bold">{title}</strong>
          {subtitle ? <p className="white font-semibold">{subtitle}</p> : null}
          {showDescription ? (
            <p className="white hidden text-base italic sm:block">
              {description}
            </p>
          ) : null}
        </div>
      </article>
    </Link>
  )
}

function calculateProjectGridSpan({ dateEnd, featured }: ProjectType): string {
  const classList: string[] = []

  if (!dateEnd) {
    classList.push("col-span-full")
  }

  if (featured && dateEnd) {
    classList.push("md:row-span-2")
  }

  return classList.length ? classList.join(" ") : "aspect-square"
}
