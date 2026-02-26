import LinkBtn from "@/components/LinkBtn";
import { BlogPostsSkeleton } from "@/components/skeletons/blog";
import { Suspense } from "react";
import { BlogPostsList } from "@/app/widgets/blog-posts-list";

export default function BlogPage() {
  return (
    <>
        <LinkBtn href="/" />
        <h1 className="mb-8 text-3xl font-bold">Blog</h1>
        <Suspense fallback={<BlogPostsSkeleton />}>
          <BlogPostsList />
        </Suspense>
      </>
  );
}
