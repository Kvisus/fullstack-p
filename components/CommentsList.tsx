import { Card, CardContent } from "./ui/card";
import { CustomAvatar } from "./ui/avatar";
import { CommentGetPayload } from "@/generated/prisma/models";

export default function CommentsList({
  comments,
}: {
  comments: CommentGetPayload<{
    include: {
      user: true;
    };
  }>[];
}) {
  if (comments.length === 0) {
    return <p className="text-muted-foreground">No comments found</p>;
  }
  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment) => (
        <Card key={comment.id}>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <CustomAvatar
                image={comment.user?.image || ""}
                name={comment.user?.name}
              />
              <span>
                {comment.user?.name || comment.user?.email?.split("@")[0]}
              </span>
              <span className="text-sm text-muted-foreground">
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
