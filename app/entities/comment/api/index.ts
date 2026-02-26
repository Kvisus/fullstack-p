import prisma from "@/lib/db";
import { CommentGetPayload } from "@/generated/prisma/models";

export type CommentWithUser = CommentGetPayload<{
  include: { user: true };
}>;

export async function getComments(): Promise<CommentWithUser[]> {
  return prisma.comment.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
