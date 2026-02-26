import LinkBtn from "@/components/LinkBtn";
import { BlogPostsSkeleton } from "@/components/skeletons/blog";
import { Suspense } from "react";
import { BlogPostsList } from "@/widgets/blog-posts-list";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog",
  };
}

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
