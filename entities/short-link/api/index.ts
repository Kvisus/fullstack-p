import "server-only";
import { cache } from "react";
import { getSession } from "@/lib/dataAccessLayer";
import { isAdmin } from "@/lib/is-admin";
import * as repo from "@/lib/short-links";
import type { ShortLinkDTO, AdminShortLinkDTO } from "../model/types";

export const getMyShortLinks = cache(async (): Promise<ShortLinkDTO[]> => {
  const session = await getSession();
  if (!session) return [];

  const links = await repo.getShortLinksByUserId(session.user.id);
  return links.map(l => ({
    id: l.id,
    slug: l.slug,
    url: l.url,
    createdAt: l.createdAt,
  }));
});

export const getAllShortLinks = cache(async (): Promise<AdminShortLinkDTO[]> => {
  const session = await getSession();
  if (!session || !(await isAdmin(session))) return [];

  const links = await repo.getAllShortLinks();
  return links.map(l => ({
    id: l.id,
    slug: l.slug,
    url: l.url,
    createdAt: l.createdAt,
    ownerName: l.user.name ?? l.user.email.split("@")[0],
  }));
});

export const getBySlug = cache(async (slug: string) => {
  return repo.getShortLinkBySlug(slug);
});

export {
  createShortLink,
  deleteShortLink,
  updateShortLinkSlug,
} from "@/lib/short-links";
