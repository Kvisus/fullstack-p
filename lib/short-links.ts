import prisma from "./db";
import { generateShortCodeSlug } from "./generate-short-code";

export async function createShortLink(url: string, userId: string) {
  const existingShortLink = await prisma.shortLink.findFirst({
    where: { url, userId },
  });

  if (existingShortLink) return existingShortLink;
  const slug = generateShortCodeSlug();
  const shortLink = await prisma.shortLink.create({
    data: { slug, url, userId },
  });
  return shortLink;
}

export async function getShortLinkBySlug(slug: string) {
  const shortLink = await prisma.shortLink.findUnique({
    where: { slug },
    include: {
      user: true,
    },
  });
  return shortLink;
}

export async function getShortLinksByUserId(userId: string) {
  const shortLinks = await prisma.shortLink.findMany({
    where: { userId },
  });
  return shortLinks;
}

export async function getAllShortLinks() {
  const shortLinks = await prisma.shortLink.findMany({
    include: {
      user: true,
    },
  });
  return shortLinks;
}

export async function deleteShortLink(slug: string) {
  await prisma.shortLink.delete({
    where: { slug },
  });
}

export async function updateShortLinkSlug(id: string, newSlug: string) {
  await prisma.shortLink.update({
    where: { id },
    data: { slug: newSlug },
  });
}
