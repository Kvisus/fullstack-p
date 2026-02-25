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
    <main className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <LinkBtn href="/" />
        <h1 className="mb-4 text-3xl font-bold">Comments</h1>
        <p className="text-muted-foreground mb-8">Sign in to leave a comment or send message</p>

        <CommentForm session={session} />

        <div className="mt-12">
          <h2 className="mb-4 text-2xl font-bold">Comments ({comments.length})</h2>
          <CommentsList comments={comments} />
        </div>
      </div>
    </main>
  );
}
