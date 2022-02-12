import { logEvent } from "firebase/analytics"
import { useEffect } from "react"

import { analyticsInstance } from "./firebase"

export interface EventParams {
  [key: string]: any
}

export function logToFirebase(eventName: string, eventParams?: EventParams) {
  logEvent(analyticsInstance, eventName, eventParams)
  console.log(eventName, eventParams)
}

export function logScreenName(screenName: string) {
  logToFirebase("screen_view", { firebase_screen: screenName })
}

export function useLogScreenName(screenName: string) {
  useEffect(() => logScreenName(screenName), [screenName])
}
