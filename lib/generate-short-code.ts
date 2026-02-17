import { nanoid } from "nanoid";

export function generateShortCodeSlug() {
  return nanoid(8);
}
