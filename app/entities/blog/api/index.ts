import prisma from "@/lib/db";

export async function getBlogPosts() {
  return prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getRecentBlogPosts() {
  return prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
}

export async function getBlogPost(slug: string) {
  return prisma.blogPost.findUnique({
    where: { slug },
  });
}
