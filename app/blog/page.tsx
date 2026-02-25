import LinkBtn from "@/components/LinkBtn";
import { BlogPostsSkeleton } from "@/components/skeletons/blog";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Suspense } from "react";
import { getBlogPosts } from "@/app/entities/blog/api";
import { formatDate } from "@/lib/formatters";  

async function BlogPostsList() {
  const posts = await getBlogPosts();

  if (posts.length === 0) {
    return <p className="text-muted-foreground">No posts found</p>;
  }

  return (
    <ul className="space-y-4">
      {posts.map(post => (
        <Card
          key={post.id}
          className="hover:bg-accent transition-colors duration-200"
        >
          <Link href={`/blog/${post.slug}`}>
            <CardContent className="p-4">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-muted-foreground text-sm">{formatDate(post.createdAt)}</p>
            </CardContent>
          </Link>
        </Card>
      ))}
    </ul>
  );
}

export default function BlogPage() {
  return (
    <main className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <LinkBtn href="/" />

        <h1 className="mb-8 text-3xl font-bold">Blog</h1>
        <Suspense fallback={<BlogPostsSkeleton />}>
          <BlogPostsList />
        </Suspense>
      </div>
    </main>
  );
}
