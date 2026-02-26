import LinkBtn from "@/components/LinkBtn";
import { BlogPostContentSkeleton } from "@/components/skeletons/blog";
import { Suspense } from "react";
import { BlogPostContent } from "@/app/widgets/blog-post-content";

interface Params {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;

  return (
    <>
      <LinkBtn href="/blog" />
      <Suspense fallback={<BlogPostContentSkeleton />}>
        <BlogPostContent slug={slug} />
      </Suspense>
    </>
  );
}
