import BackBtn from "@/components/BackBtn";
import { Card, CardContent } from "@/components/ui/card";
import prisma from "@/lib/db";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <BackBtn href="/" />

        <h1 className="text-3xl font-bold mb-8">Blog</h1>
        {posts.length > 0 ? (
          <ul className="space-y-4">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="hover:bg-accent transition-colors duration-200"
              >
                <Link href={`/blog/${post.slug}`}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-muted-foreground">
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
      </div>
    </main>
  );
}
