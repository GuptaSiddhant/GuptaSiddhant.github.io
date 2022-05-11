import { useSubmit } from "@remix-run/react"
import Section from "./Section"
import type { PropsWithChildren } from "./types"

export default function FilterError({
  children = "No items found with the given filters.",
  ...props
}: PropsWithChildren): JSX.Element {
  const submit = useSubmit()

  return (
    <Section {...props}>
      <div className="text-center text-gray-500 text-2xl italic">
        {children}
        <br />
        Try changing or clearing them.
        <br />
        <button
          onClick={() => submit({})}
          className="text-sm m-4 px-2 py-1 text-gray-300 hover:text-gray-200 active:text-gray-400 border-[1px] border-current rounded"
        >
          Clear all the filters
        </button>
      </div>
    </Section>
  )
}
