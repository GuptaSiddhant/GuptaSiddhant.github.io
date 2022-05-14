import { cleanupText } from "helpers"
import { type QueryDocumentSnapshot } from "service/database"
import { convertImageLinksInText, toImageUrl } from "service/image"

import type { BlogPostType, BlogPostTeaserType } from "../types"

export async function transformDocToBlogPost(docSnap: QueryDocumentSnapshot) {
  const blogPost = docSnapToBlogPost(docSnap)

  const [icon, gallery] = await Promise.all([
    convertBlogPostIconUrl(blogPost),
    convertBlogPostGalleryUrls(blogPost),
  ])

  return {
    ...blogPost,
    icon,
    gallery,
    cover: gallery?.[0]?.url,
    content: undefined,
  }
}

export async function transformDocToBlogPostWithContent(
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
    cover: gallery?.[0]?.url,
    content: cleanupText(content),
  }
}

export function transformProjectToBlogPostTeaser(
  blogPost: BlogPostType,
): BlogPostTeaserType {
  const date =
    typeof blogPost.date === "string"
      ? blogPost.date
      : (blogPost.date as any).toDate()

  return { ...blogPost, date }
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
