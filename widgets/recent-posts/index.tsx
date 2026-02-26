import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { getRecentBlogPosts } from "@/entities/blog/api";
import { formatDate } from "@/lib/formatters";

export async function RecentPosts() {
  const posts = await getRecentBlogPosts();

  if (posts.length === 0) {
    return <p className="text-muted-foreground">No posts found</p>;
  }

  return (
    <ul className="space-y-4">
      {posts.map(post => (
        <Card
          key={post.id}
          className="hover:bg-accent transition-colors duration-200"
        >
          <Link href={`/blog/${post.slug}`}>
            <CardContent className="p-4">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-muted-foreground text-sm">{formatDate(post.createdAt)}</p>
            </CardContent>
          </Link>
        </Card>
      ))}
    </ul>
  );
}
