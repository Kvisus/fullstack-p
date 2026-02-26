import "server-only";
import { UserRole } from "@/generated/prisma/client";
import { Session } from "./types";

export async function isAdmin(session: Session | null) {
  if (!session) return false;
  return session.user.role === UserRole.admin;
}
