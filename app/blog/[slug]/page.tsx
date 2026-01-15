import prisma from "@/lib/db";
import { notFound } from "next/navigation";

import Markdown from "@/components/Markdown";
import BackHomeBtn from "@/components/BackHomeBtn";

interface Params {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: {
      slug,
    },
  });

  if (!post) {
    return notFound();
  }

  return (
    <main className="min-h-screen py-16 px-4">
      <article className="max-w-3xl mx-auto">
        <BackHomeBtn />

        <h1 className="text-3xl font-bold mb-8">{post.title}</h1>
        <p className="text-sm text-muted-foreground">
          {new Date(post.createdAt).toLocaleDateString("ru-RU")}
        </p>

        <div className="mt-8">
          <Markdown content={post.content} />
        </div>
      </article>
    </main>
  );
}
