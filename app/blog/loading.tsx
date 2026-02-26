import LinkBtn from "@/components/LinkBtn";
import { BlogPostsSkeleton } from "@/components/skeletons/blog";

export default function BlogLoading() {
  return (
    <>
      <LinkBtn href="/" />

      <h1 className="mb-8 text-3xl font-bold">Blog</h1>
      <BlogPostsSkeleton />
    </>
  );
}
