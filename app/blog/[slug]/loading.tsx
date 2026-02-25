import LinkBtn from "@/components/LinkBtn";
import { BlogPostContentSkeleton } from "@/components/skeletons/blog";

export default function BlogPostLoading() {
  return (
    <main className="min-h-screen px-4 py-16">
      <LinkBtn href="/blog" />
      <BlogPostContentSkeleton />
    </main>
  );
}
