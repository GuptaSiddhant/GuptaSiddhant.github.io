import { cleanupText, __IS_DEV__ } from "~/helpers"
import {
  getCollection,
  getCollectionItem,
  setCollectionItem,
  orderBy,
  limit,
  where,
  type QueryDocumentSnapshot,
} from "~/service/database"
import { convertImageLinksInText, toImageUrl } from "~/service/image"

import type { BlogPostType } from "./types"

const COLLECTION_NAME = "blog"

export async function getAllBlogPosts(
  limitBy: number = 100,
): Promise<BlogPostType[]> {
  const draftConstraints = __IS_DEV__ ? [] : [where("draft", "!=", true), orderBy("draft")]

  return getCollection(
    COLLECTION_NAME,
    transformDocToBlogPostLimited,
    ...draftConstraints,
    orderBy("date", "desc"),
    limit(limitBy),
  )
}

export async function getBlogPostById(
  itemId: string,
): Promise<BlogPostType | undefined> {
  return getCollectionItem(
    COLLECTION_NAME,
    itemId,
    transformDocToBlogPostWithDetails,
  )
}

export async function setBlogPostById(
  itemId: string,
  data: Partial<BlogPostType>,
) {
  return setCollectionItem(COLLECTION_NAME, itemId, data)
}

// Helpers

async function transformDocToBlogPostLimited(docSnap: QueryDocumentSnapshot) {
  const blogPost = docSnapToBlogPost(docSnap)

  const [icon, gallery] = await Promise.all([
    convertBlogPostIconUrl(blogPost),
    convertBlogPostGalleryUrls(blogPost),
  ])

  return {
    ...blogPost,
    icon,
    gallery,
    content: undefined,
  }
}

async function transformDocToBlogPostWithDetails(
  docSnap: QueryDocumentSnapshot,
): Promise<BlogPostType> {
  const blogPost = docSnapToBlogPost(docSnap)

  const [icon, gallery, content] = await Promise.all([
    convertBlogPostIconUrl(blogPost),
    convertBlogPostGalleryUrls(blogPost),
    convertBlogPostContentUrls(blogPost),
  ])

  return {
    ...blogPost,
    icon,
    gallery,
    content: cleanupText(content),
  }
}

function docSnapToBlogPost(docSnap: QueryDocumentSnapshot): BlogPostType {
  const data = docSnap.data()

  return {
    ...data,
    id: docSnap.id,
    date: data.date.toDate(),
  } as unknown as BlogPostType
}

async function convertBlogPostIconUrl(
  blogPost: BlogPostType,
): Promise<string | undefined> {
  return blogPost.icon ? toImageUrl(blogPost.icon) : undefined
}

async function convertBlogPostGalleryUrls(
  BlogPost: BlogPostType,
): Promise<BlogPostType["gallery"]> {
  return Promise.all(
    (BlogPost.gallery || []).map(async (i) => ({
      ...i,
      url: await toImageUrl(i.url),
    })),
  )
}

async function convertBlogPostContentUrls(
  blogPost: BlogPostType,
): Promise<string | undefined> {
  return blogPost.content
    ? convertImageLinksInText(blogPost.content)
    : undefined
}
