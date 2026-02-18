import CommentForm from "@/components/CommentForm";
import CommentsList from "@/components/CommentsList";
import prisma from "@/lib/db";
import { getSession } from "@/lib/dataAccessLayer";
import LinkBtn from "@/components/LinkBtn";

export default async function CommmentPage() {
  const session = await getSession();

  const comments = await prisma.comment.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <LinkBtn href="/" />
        <h1 className="text-3xl font-bold mb-4">Comments</h1>
        <p className="text-muted-foreground mb-8">
          Sign in to leave a comment or send message
        </p>

        <CommentForm session={session} />

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">
            Comments ({comments.length})
          </h2>
          <CommentsList comments={comments} />
        </div>
      </div>
    </main>
  );
}
