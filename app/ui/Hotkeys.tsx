import clsx from "clsx"
import type { ComponentPropsWithoutRef } from "react"

export default function Hotkeys({
  keys,
}: {
  keys: string[]
}): JSX.Element | null {
  if (!keys.length) return null

  return (
    <span>
      {keys.map((key) => (
        <Kbd key={key}>{key.length === 1 ? key.toUpperCase() : key}</Kbd>
      ))}
    </span>
  )
}

function Kbd(props: ComponentPropsWithoutRef<"kbd">): JSX.Element {
  return (
    <kbd
      {...props}
      className={clsx(
        " text-tertiary bg-secondary",
        "border-[1px] border-gray-500 shadow rounded-sm",
        "inline-block font-normal text-sm font-monospace",
        "whitespace-nowrap px-1 py-0.5 ml-1",
      )}
    />
  )
}
