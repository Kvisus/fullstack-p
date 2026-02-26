import "server-only";
import prisma from "@/lib/db";
import { cache } from "react";

export const getBlogPosts = cache(async () => {
  return await prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
});

export const getRecentBlogPosts = cache(async () => {
  return prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
});

export const getBlogPost = cache(async (slug: string) => {
  return prisma.blogPost.findUnique({
    where: { slug },
  });
});
