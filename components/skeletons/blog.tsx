import { Card, CardContent } from "@/components/ui/card";

interface BlogPostsSkeletonProps {
  count?: number;
}

export function BlogPostsSkeleton({ count = 3 }: BlogPostsSkeletonProps) {
  return (
    <ul className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i}>
          <Card>
            <CardContent className="p-4">
              <div className="bg-muted h-5 w-2/3 animate-pulse rounded" />
              <div className="bg-muted mt-2 h-4 w-1/4 animate-pulse rounded" />
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export function BlogPostContentSkeleton() {
  return (
    <article className="mx-auto max-w-3xl">
      <div className="bg-muted h-9 w-2/3 animate-pulse rounded" />
      <div className="bg-muted mt-2 h-4 w-1/4 animate-pulse rounded" />
      <div className="mt-8 space-y-4">
        <div className="bg-muted h-4 w-full animate-pulse rounded" />
        <div className="bg-muted h-4 w-full animate-pulse rounded" />
        <div className="bg-muted h-4 w-2/3 animate-pulse rounded" />
      </div>
    </article>
  );
}
