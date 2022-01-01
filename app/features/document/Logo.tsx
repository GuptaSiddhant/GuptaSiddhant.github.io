import { Link } from "remix"

import { name } from "../about"

export default function Logo(): JSX.Element {
  return (
    <Link
      to="/"
      title={name}
      data-custom-color
      data-custom-border
      className="font-bold text-2xl leading-normal text-black dark:text-white my-5 border-0 select-none"
    >
      {name}
    </Link>
  )
}
