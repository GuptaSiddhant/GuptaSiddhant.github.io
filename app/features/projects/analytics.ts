import { useEffect } from "react"
import {
  logViewItemListEvent,
  logViewItemEvent,
  type AnalyticsEventItem,
} from "service/analytics"
import type { ProjectTeaser } from "./types"

const analyticsProjectList = {
  item_list_id: "projects",
  item_list_name: "Projects",
}

export function useLogViewMultipleProjectsEvent(projects: ProjectTeaser[]) {
  return useEffect(() => {
    const items: AnalyticsEventItem[] = projects.map(({ id, title }) => ({
      ...analyticsProjectList,
      item_id: id,
      item_name: title,
    }))

    logViewItemListEvent(items)
  }, [projects])
}

export function useLogViewProjectEvent({ id, title }: ProjectTeaser) {
  return useEffect(() => {
    logViewItemEvent({
      ...analyticsProjectList,
      item_id: id,
      item_name: title,
    })
  }, [id, title])
}
