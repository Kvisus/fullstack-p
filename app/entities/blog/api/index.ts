import { cacheLife, cacheTag } from "next/cache";
import prisma from "@/lib/db";

export async function getBlogPosts() {
  "use cache";
  cacheLife("hours");
  cacheTag("blog-posts");

  return prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getRecentBlogPosts() {
  "use cache";
  cacheLife("hours");
  cacheTag("blog-posts");

  return prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
}

export async function getBlogPost(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("blog-post", `blog-post-${slug}`);

  return prisma.blogPost.findUnique({
    where: { slug },
  });
}
