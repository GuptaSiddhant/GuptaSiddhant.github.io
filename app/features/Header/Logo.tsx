import { Link } from "remix"

export default function Logo({ name }: { name: string }): JSX.Element {
  return (
    <Link
      to="/"
      title={name}
      data-custom-color
      data-custom-border
      className="font-bold text-xl leading-normal text-black dark:text-white my-5 border-0 select-none"
    >
      {name}
    </Link>
  )
}
