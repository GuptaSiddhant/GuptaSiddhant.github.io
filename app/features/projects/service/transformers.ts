import { cleanupText } from "~/helpers"
import { type QueryDocumentSnapshot } from "~/service/database"
import { convertImageLinksInText, toImageUrl } from "~/service/image"

import type { ProjectType, ProjectTeaser } from "../types"

export async function transformDocToProject(
  docSnap: QueryDocumentSnapshot,
): Promise<ProjectType> {
  const project = docSnapToProject(docSnap)

  const [icon, gallery] = await Promise.all([
    convertProjectIconUrl(project),
    convertProjectGalleryUrls(project),
  ])

  return {
    ...project,
    icon,
    gallery,
    cover: gallery?.[0]?.url,
    content: undefined,
  }
}

export async function transformDocToProjectWithContent(
  docSnap: QueryDocumentSnapshot,
): Promise<ProjectType> {
  const project = docSnapToProject(docSnap)

  const [icon, gallery, content] = await Promise.all([
    convertProjectIconUrl(project),
    convertProjectGalleryUrls(project),
    convertProjectContentUrls(project),
  ])

  return {
    ...project,
    icon,
    gallery,
    cover: gallery?.[0]?.url,
    content: cleanupText(content),
  }
}

function docSnapToProject(docSnap: QueryDocumentSnapshot): ProjectType {
  const data = docSnap.data()

  return {
    ...data,
    id: docSnap.id,
    dateStart: data.dateStart.toDate(),
    dateEnd: data.dateEnd?.toDate(),
    code: undefined,
  } as unknown as ProjectType
}

async function convertProjectIconUrl(
  project: ProjectType,
): Promise<string | undefined> {
  return project.icon ? toImageUrl(project.icon) : undefined
}

async function convertProjectGalleryUrls(
  project: ProjectType,
): Promise<ProjectType["gallery"]> {
  return Promise.all(
    (project.gallery || []).map(async (i) => ({
      ...i,
      url: await toImageUrl(i.url),
    })),
  )
}

async function convertProjectContentUrls(
  project: ProjectType,
): Promise<string | undefined> {
  return project.content ? convertImageLinksInText(project.content) : undefined
}

export function transformProjectToProjectTeaser(
  project: ProjectType,
): ProjectTeaser {
  return {
    id: project.id,
    title: project.title,
    cover: project.cover ?? "",
    dateStart: project.dateStart,
    dateEnd: project.dateEnd ?? "",
    draft: project.draft ?? false,
    description: project.description ?? "",
    icon: project.icon ?? "",
    subtitle: project.subtitle ?? "",
    tags: project.tags ?? [],
    featured: project.featured ?? false,
    association: project.association ?? "",
  }
}
