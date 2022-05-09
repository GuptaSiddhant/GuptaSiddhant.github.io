import { useEffect, useRef } from "react"

export default function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  callback: (e: WindowEventMap[K]) => void,
) {
  const listenerRef = useRef(callback)

  useEffect(() => {
    listenerRef.current = callback
  }, [callback])

  useEffect(() => {
    window.addEventListener(eventName, listenerRef.current)
    return () => window.removeEventListener(eventName, listenerRef.current)
  }, [eventName, listenerRef])
}
