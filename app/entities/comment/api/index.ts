import "server-only";
import { cache } from "react";
import prisma from "@/lib/db";

export type CommentDTO = {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    name: string | null;
    displayName: string;
    image: string | null;
  };
};

export const getComments = cache(async (): Promise<CommentDTO[]> => {
  const rows = await prisma.comment.findMany({
    include: {
      user: { select: { name: true, email: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return rows.map(row => ({
    id: row.id,
    content: row.content,
    createdAt: row.createdAt,
    author: {
      name: row.user.name,
      displayName: row.user.name ?? row.user.email.split("@")[0],
      image: row.user.image,
    },
  }));
});
