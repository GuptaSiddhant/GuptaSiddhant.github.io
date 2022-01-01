import { __IS_DEV__ } from "~/helpers"
import { generateJsonPath, getJsonFile } from "~/service/json.server"
import type { EducationItem, CareerItem } from "./types"

export async function getCareer() {
  const path = generateJsonPath("career")
  const career = await getJsonFile<CareerItem[]>(path)

  return career.filter(({ draft }) => __IS_DEV__ || !draft)
}

export async function getEducation() {
  const path = generateJsonPath("education")
  const education = await getJsonFile<EducationItem[]>(path)

  return education.filter(({ draft }) => __IS_DEV__ || !draft)
}
