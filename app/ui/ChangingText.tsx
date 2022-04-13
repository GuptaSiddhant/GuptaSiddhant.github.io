import { useEffect, useState } from "react"

export default function ChangingText({
  texts,
  duration = 4000,
}: {
  texts: string[]
  duration?: number
}): JSX.Element {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((currentIndex) => (currentIndex + 1) % texts.length)
    }, duration)

    return () => {
      clearInterval(interval)
    }
  }, [texts, duration])

  return (
    <span className="inline-block animate-appear" key={index}>
      {texts[index]}
    </span>
  )
}
