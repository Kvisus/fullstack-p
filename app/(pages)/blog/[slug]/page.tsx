import LinkBtn from "@/components/LinkBtn";
import { BlogPostContentSkeleton } from "@/components/skeletons/blog";
import { Suspense } from "react";
import { BlogPostContent } from "@/widgets/blog-post-content";
import { getBlogPost, getBlogPosts } from "@/entities/blog/api";
import { Metadata } from "next";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  return {
    title: post?.title ?? "Blog Post",
  };
}
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
