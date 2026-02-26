"use server";

import { getSession } from "@/lib/dataAccessLayer";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export type CreateCommentState = {
  error?: string;
  success: boolean;
} | null;

export async function createComment(_prevState: CreateCommentState, formData: FormData): Promise<CreateCommentState> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized", success: false };
  }

  const content = formData.get("content") as string;
  if (!content?.trim()) {
    return { error: "Content is required", success: false };
  }

  await prisma.comment.create({
    data: {
      content: content.trim(),
      userId: session.user.id,
    },
  });

  revalidatePath("/comments");
  return { success: true };
}
