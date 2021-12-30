import { generateJsonPath, getJsonFile } from "~/service/json.server"

export async function getAbout() {
  const path = generateJsonPath("about")

  return await getJsonFile<{}>(path)
}

export async function getCareer() {
  const path = generateJsonPath("career")

  return await getJsonFile<[]>(path)
}

export async function getEducation() {
  const path = generateJsonPath("education")

  return await getJsonFile<[]>(path)
}
