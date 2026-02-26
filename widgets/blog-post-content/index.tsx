import { notFound } from "next/navigation";
import Markdown from "@/components/Markdown";
import { getBlogPost } from "@/entities/blog/api";
import { formatDate } from "@/lib/formatters";

export async function BlogPostContent({ slug }: { slug: string }) {
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
