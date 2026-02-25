import LinkBtn from "@/components/LinkBtn";
import { BlogPostsSkeleton } from "@/components/skeletons/blog";

export default function BlogLoading() {
  return (
    <main className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <LinkBtn href="/" />

        <h1 className="mb-8 text-3xl font-bold">Blog</h1>
        <BlogPostsSkeleton />
      </div>
    </main>
  );
}
