import { Card, CardContent } from "@/components/ui/card";
import { CustomAvatar } from "@/components/ui/avatar";
import type { CommentWithUser } from "@/app/entities/comment/api";

export default function CommentsList({ comments }: { comments: CommentWithUser[] }) {
  if (comments.length === 0) {
    return <p className="text-muted-foreground">No comments found</p>;
  }
  return (
    <div className="flex flex-col gap-4">
      {comments.map(comment => (
        <Card key={comment.id}>
          <CardContent>
            <div className="mb-2 flex items-center gap-2">
              <CustomAvatar
                image={comment.user?.image || ""}
                name={comment.user?.name}
              />
              <span>{comment.user?.name || comment.user?.email?.split("@")[0]}</span>
              <span className="text-muted-foreground text-sm">
                {new Date(comment.createdAt).toLocaleDateString("ru-RU")}
              </span>
            </div>
            <p className="text-sm">{comment.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
