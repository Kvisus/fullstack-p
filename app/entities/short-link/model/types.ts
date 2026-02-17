import { ShortLink } from "@/generated/prisma/client";

type CreateShortLinkInput = {
  slug: string;
  url: string;
};

export type { CreateShortLinkInput, ShortLink };
