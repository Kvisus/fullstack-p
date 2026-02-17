import { getShortLinkBySlug } from "./short-links";
import { isAdmin } from "./is-admin";
import type { Session } from "./types";

export type AccessResult =
  | { ok: true; shortLink: Awaited<ReturnType<typeof getShortLinkBySlug>> }
  | { ok: false; error: string };

export async function requireShortLinkAccess(session: Session | null, slug: string): Promise<AccessResult> {
  if (!session) return { ok: false, error: "Unauthorized" };
  const shortLink = await getShortLinkBySlug(slug);
  if (!shortLink) return { ok: false, error: "Not found" };
  const isCreator = session.user.id === shortLink.userId;
  if (!isCreator && !(await isAdmin(session))) {
    return { ok: false, error: "Forbidden" };
  }
  return { ok: true, shortLink };
}
