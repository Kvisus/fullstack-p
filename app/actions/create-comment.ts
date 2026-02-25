"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function createComment(prevState: unknown, formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return { error: "Unauthorized", success: false };
  }
  const content = formData.get("content") as string;
  if (!content) {
    return { error: "Content is required", success: false };
  }
  await new Promise(resolve => setTimeout(resolve, 3000));
  await prisma.comment.create({
    data: {
      content,
      userId: session?.user.id,
    },
  });
  // return { error: null, success: true };
  revalidatePath("/comments");
}
