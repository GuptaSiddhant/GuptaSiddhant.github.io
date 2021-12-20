import { useIsSSR } from "@react-aria/ssr"
import { useState, useEffect } from "react"
import TextTransition, { presets } from "react-text-transition"

const INTERVAL_TIME = 3_000

/** AnimatedText component */
export default function AnimatedText({
  texts,
}: {
  texts: string[]
}): JSX.Element | null {
  const isSSR = useIsSSR()
  const text = useTextTransition(...texts)

  return isSSR ? (
    <>{texts[0]}</>
  ) : (
    <>
      <span className="motion-safe:hidden">{text}</span>
      <span className="motion-reduce:hidden">
        <TextTransition text={text} springConfig={presets.gentle} inline />
      </span>
    </>
  )
}

function useTextTransition(...texts: string[]): string {
  const TEXTS = texts.sort()

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      INTERVAL_TIME, // every 3 seconds
    )
    return () => clearTimeout(intervalId)
  }, [])

  return TEXTS[index % TEXTS.length]
}
