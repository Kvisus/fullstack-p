import LinkBtn from "@/components/LinkBtn";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/db";
import { ArrowRightIcon, BookOpenIcon, Link2, MessageCircleIcon, TextAlignJustify } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const posts = await prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
  return (
    <main className="min-h-screen">
      <section className="flex flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="animate-in fade-in-0 mb-4 text-4xl font-bold duration-1000">Hi, I&apos;m Andrew</h1>
        <p className="text-muted-foreground mb-6 max-w-md text-lg">Fullstack Developer and Stuff</p>
        <div className="flex gap-4">
          <LinkBtn
            href="/blog"
            label="Read Blog"
            icon={BookOpenIcon}
            prefetch
          />
          <LinkBtn
            href="/comments"
            label="Contact Me"
            icon={MessageCircleIcon}
            prefetch
          />
          <LinkBtn
            href="/url-shortener"
            label="URL Shortener"
            icon={Link2}
            prefetch
          />
          <LinkBtn
            href="/tierlist"
            label="Tierlist"
            icon={TextAlignJustify}
            prefetch
          />
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="mb-4 text-2xl font-bold">About Me</h2>
        <p className="text-muted-foreground">
          My main stack is React + Next.js, Tailwind CSS, and TypeScript. I have also worked with Svelte and Vue.js.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="mb-4 text-2xl font-bold">Recent Posts</h2>
        {posts.length > 0 ? (
          <ul className="space-y-4">
            {posts.map(post => (
              <Card
                key={post.id}
                className="hover:bg-accent transition-colors duration-200"
              >
                <Link href={`/blog/${post.slug}`}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {new Date(post.createdAt).toLocaleDateString("ru-RU")}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No posts found</p>
        )}
        <Button
          asChild
          variant={"link"}
          className="mt-4 px-0"
        >
          <Link href="/blog">
            Read Blog
            <ArrowRightIcon className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </section>
    </main>
  );
}
