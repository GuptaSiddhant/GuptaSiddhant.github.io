import { Link } from "remix"

import { fullName } from "~/helpers/about"

export default function Logo(): JSX.Element {
  return (
    <Link
      to="/"
      title={fullName}
      data-custom-color
      data-custom-border
      className="font-bold text-2xl leading-normal text-white my-5 border-0 select-none"
    >
      {fullName}
    </Link>
  )
}
