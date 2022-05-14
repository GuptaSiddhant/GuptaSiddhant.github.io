import {
  getAnalytics,
  logEvent,
  isSupported,
  type Item,
} from "firebase/analytics"

import { __IS_DEV__ } from "helpers"
import firebaseApp from "./firebase"

async function logCustomEvent(
  eventName: string,
  eventParams?: { [key: string]: any },
) {
  const supported = await isSupported()
  if (!supported) return

  __IS_DEV__ && console.log(eventName, eventParams)
  return logEvent(getAnalytics(firebaseApp), eventName, eventParams)
}

// Item

export type AnalyticsEventItem = Item

export function logViewItemListEvent(items: AnalyticsEventItem[]) {
  return logCustomEvent("view_item_list", { items })
}

export function logViewItemEvent(item: AnalyticsEventItem) {
  return logCustomEvent("view_item", { items: [item] })
}

// Screen

export function logScreenViewEvent(name: string, location?: Location) {
  return logCustomEvent("screen_view", {
    firebase_screen: name,
    firebase_screen_class: "webpage",
    ...location,
  })
}
