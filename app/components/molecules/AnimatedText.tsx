import { useIsSSR } from "@react-aria/ssr"
import { useState, useEffect } from "react"
import TextTransition, { presets } from "react-text-transition"

import Text from "~/components/atoms/Text"

const INTERVAL_TIME = 3_000 // 3 seconds

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
      <Text className="motion-safe:hidden">{text}</Text>
      <Text className="motion-reduce:hidden">
        <TextTransition text={text} springConfig={presets.gentle} inline />
      </Text>
    </>
  )
}

function useTextTransition(...texts: string[]): string {
  const TEXTS = texts.sort()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      INTERVAL_TIME,
    )

    return () => clearTimeout(intervalId)
  }, [])

  return TEXTS[index % TEXTS.length]
}
