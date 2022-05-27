import { __IS_DEV__ } from "~/helpers"
import {
  getCollection,
  getCollectionItem,
  setCollectionItem,
  updateInfoList,
  orderBy,
  limit,
  FirestoreCollection,
} from "~/service/database"

import {
  transformDocToBlogPost,
  transformDocToBlogPostWithContent,
  transformBlogPostToBlogPostTeaser,
} from "./transformers"

import type { BlogPostType, BlogPostTeaser } from "../types"

const collectionName = FirestoreCollection.Blog

export async function getBlogPostsList(
  limitBy: number = 5,
): Promise<BlogPostTeaser[]> {
  return getCollectionItem(
    FirestoreCollection.Info,
    collectionName,
    (docSnap) =>
      Object.values(docSnap.data())
        .map((post) => ({
          ...post,
          date:
            typeof post.date === "string"
              ? post.date
              : (post.date as any).toDate(),
        }))
        .filter((project) => __IS_DEV__ || !project.draft)
        .sort((a, b) => (b.date > a.date ? 1 : -1))
        .slice(0, limitBy),
  )
}

export async function getBlogPostById(
  itemId: string,
): Promise<BlogPostType | undefined> {
  return getCollectionItem(
    collectionName,
    itemId,
    transformDocToBlogPostWithContent,
  )
}

export async function getCrossSellBlogPosts(
  post: BlogPostType,
): Promise<BlogPostTeaser[]> {
  const postList = await getBlogPostsList(20)

  return postList
    .filter((p) => p.id !== post.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)
}

export async function setBlogPostById(
  itemId: string,
  data: Partial<BlogPostType>,
) {
  return setCollectionItem(collectionName, itemId, data)
}

export async function updateBlogList() {
  const data = (await getAllBlogPosts(100)).map(
    transformBlogPostToBlogPostTeaser,
  )

  return updateInfoList(collectionName, data)
}

async function getAllBlogPosts(limitBy: number = 100): Promise<BlogPostType[]> {
  return getCollection(
    collectionName,
    transformDocToBlogPost,
    orderBy("date", "desc"),
    limit(limitBy),
  )
}
