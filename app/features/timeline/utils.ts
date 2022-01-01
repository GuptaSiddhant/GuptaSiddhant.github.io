import type { CareerItem, EducationItem } from "./types"

/** Type guard for EducationItem */
export function isEducationItem(item: any): item is EducationItem {
  return (item as EducationItem).degree !== undefined
}

/** Type guard for CareerItem */
export function isCareerItem(item: any): item is CareerItem {
  return (item as CareerItem).position !== undefined
}
