"use server";

import { getSession } from "@/lib/dataAccessLayer";
import { createShortLink, deleteShortLink, updateShortLinkSlug } from "@/app/entities/short-link/api";
import { revalidatePath } from "next/cache";
import { requireShortLinkAccess } from "@/lib/short-link-access";

async function createShortLinkFeature(formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized", success: false };
  }

  const url = formData.get("url") as string;
  if (!url) {
    return { error: "URL is required", success: false };
  }

  await createShortLink(url, session.user.id);
  revalidatePath("/url-shortener");
  return { success: true };
}

async function deleteShortLinkFeature(slug: string) {
  const session = await getSession();
  const accessResult = await requireShortLinkAccess(session, slug);
  if (!accessResult.ok) {
    return { error: accessResult.error, success: false };
  }

  await deleteShortLink(slug);
  revalidatePath("/url-shortener");
  return { success: true };
}

async function renameShortLinkFeature(slug: string, newSlug: string) {
  const session = await getSession();
  const accessResult = await requireShortLinkAccess(session, slug);
  if (!accessResult.ok) {
    return { error: accessResult.error, success: false };
  }

  await updateShortLinkSlug(accessResult.shortLink!.id, newSlug);
  revalidatePath("/url-shortener");
  return { success: true };
}

export { createShortLinkFeature, deleteShortLinkFeature, renameShortLinkFeature };
