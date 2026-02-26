import LinkBtn from "@/components/LinkBtn";
import { BlogPostContentSkeleton } from "@/components/skeletons/blog";

export default function BlogPostLoading() {
  return (
    <>
      <LinkBtn href="/blog" />
      <BlogPostContentSkeleton />
    </>
  );
}
