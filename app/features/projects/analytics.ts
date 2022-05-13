import { useEffect } from "react"
import {
  logViewItemListEvent,
  logViewItemEvent,
  type AnalyticsEventItem,
} from "~/service/analytics"
import type { ProjectTeaserType } from "./types"

const analyticsProjectList = {
  item_list_id: "projects",
  item_list_name: "Projects",
}

export function useLogViewMultipleProjectsEvent(projects: ProjectTeaserType[]) {
  return useEffect(() => {
    const items: AnalyticsEventItem[] = projects.map(({ id, title }) => ({
      ...analyticsProjectList,
      item_id: id,
      item_name: title,
    }))

    logViewItemListEvent(items)
  }, [projects])
}

export function useLogViewProjectEvent({ id, title }: ProjectTeaserType) {
  return useEffect(() => {
    logViewItemEvent({
      ...analyticsProjectList,
      item_id: id,
      item_name: title,
    })
  }, [id, title])
}
