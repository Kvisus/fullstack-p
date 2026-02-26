export type ShortLinkDTO = {
  id: string;
  slug: string;
  url: string;
  createdAt: Date;
};

export type AdminShortLinkDTO = ShortLinkDTO & {
  ownerName: string;
};
