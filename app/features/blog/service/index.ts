import { __IS_DEV__ } from "helpers"
import {
  getCollection,
  getCollectionItem,
  setCollectionItem,
  orderBy,
  limit,
  draftConstraints,
} from "service/database"

import {
  transformDocToBlogPost,
  transformDocToBlogPostWithContent,
  transformProjectToBlogPostTeaser,
} from "./transformers"

import type { BlogPostType, BlogPostTeaserType } from "../types"

const INFO_COLLECTION_NAME = "info"
const COLLECTION_NAME = "blog"

export async function getAllBlogPosts(
  limitBy: number = 100,
): Promise<BlogPostType[]> {
  return getCollection(
    COLLECTION_NAME,
    transformDocToBlogPost,
    ...draftConstraints,
    orderBy("date", "desc"),
    limit(limitBy),
  )
}

export async function getBlogPostsList(
  limitBy: number = 5,
): Promise<BlogPostTeaserType[]> {
  return getCollectionItem(INFO_COLLECTION_NAME, COLLECTION_NAME, (docSnap) =>
    Object.values(docSnap.data())
      .map(transformProjectToBlogPostTeaser)
      .filter((project) => __IS_DEV__ || project.draft !== true)
      .sort((a, b) => (b.date > a.date ? 1 : -1))
      .slice(0, limitBy),
  )
}

export async function getBlogPostById(
  itemId: string,
): Promise<BlogPostType | undefined> {
  return getCollectionItem(
    COLLECTION_NAME,
    itemId,
    transformDocToBlogPostWithContent,
  )
}

export async function setBlogPostById(
  itemId: string,
  data: Partial<BlogPostType>,
) {
  return setCollectionItem(COLLECTION_NAME, itemId, data)
}

export async function updateBlogList() {
  const data: Record<string, BlogPostTeaserType> = (await getAllBlogPosts(100))
    .map(({ id, title, cover, date, draft }) => ({
      id,
      title,
      cover,
      date,
      draft,
    }))
    .reduce((acc, project) => ({ ...acc, [project.id]: project }), {})

  return setCollectionItem(INFO_COLLECTION_NAME, COLLECTION_NAME, data)
}
