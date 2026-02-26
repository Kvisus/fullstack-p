"use server";

import { getSession } from "@/lib/dataAccessLayer";
import { createShortLink, deleteShortLink, updateShortLinkSlug } from "@/entities/short-link/api";
import { revalidatePath } from "next/cache";
import { requireShortLinkAccess } from "@/lib/short-link-access";

export type CreateShortLinkState = {
  error?: string;
  success: boolean;
  slug?: string;
} | null;

async function createShortLinkFeature(
  _prevState: CreateShortLinkState,
  formData: FormData
): Promise<CreateShortLinkState> {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized", success: false };
  }

  const url = formData.get("url") as string;
  if (!url) {
    return { error: "URL is required", success: false };
  }

  const shortLink = await createShortLink(url, session.user.id);
  revalidatePath("/url-shortener");
  return { success: true, slug: shortLink.slug };
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
