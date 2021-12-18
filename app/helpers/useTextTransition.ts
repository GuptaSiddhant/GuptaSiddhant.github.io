import { useEffect, useState } from "react"
import TextTransition, { presets } from "react-text-transition"

import useReducedMotion from "~/helpers/useReducedMotion"

const INTERVAL_TIME = 3_000

export type TextTransitionProps = Omit<
  NonNullable<typeof TextTransition["defaultProps"]>,
  "text"
> & {
  text: string | number
}

export default function useTextTransition(
  ...texts: string[]
): TextTransitionProps {
  const TEXTS = texts.sort()

  const [index, setIndex] = useState(0)
  const preferReducedMotion = useReducedMotion()

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      INTERVAL_TIME, // every 3 seconds
    )
    return () => clearTimeout(intervalId)
  }, [])

  return {
    text: TEXTS[index % TEXTS.length],
    springConfig: preferReducedMotion ? presets.slow : presets.gentle,
    inline: true,
  }
}
