import { notFound } from "next/navigation";

import Markdown from "@/components/Markdown";
import LinkBtn from "@/components/LinkBtn";
import { BlogPostContentSkeleton } from "@/components/skeletons/blog";
import { Suspense } from "react";
import { getBlogPost } from "@/app/entities/blog/api";
import { formatDate } from "@/lib/formatters";

interface Params {
  params: Promise<{
    slug: string;
  }>;
}

async function BlogPostContent({ slug }: { slug: string }) {
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="mb-8 text-3xl font-bold">{post.title}</h1>
      <p className="text-muted-foreground text-sm">{formatDate(post.createdAt)}</p>

      <div className="mt-8">
        <Markdown content={post.content} />
      </div>
    </article>
  );
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;

  return (
    <main className="min-h-screen px-4 py-16">
      <LinkBtn href="/blog" />
      <Suspense fallback={<BlogPostContentSkeleton />}>
        <BlogPostContent slug={slug} />
      </Suspense>
    </main>
  );
}
