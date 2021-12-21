import type { RootData } from "~/types"

interface HeaderProps extends RootData {}

export default function Footer({ name }: HeaderProps): JSX.Element {
  return (
    <footer className="container-mx flex justify-center items-center border-t border-opacity-20 mt-10">
      <div className="text-center w-full my-4 text-gray-500">
        <small className="text-sm">&copy; {name}</small>
      </div>
    </footer>
  )
}