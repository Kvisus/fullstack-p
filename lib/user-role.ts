export const UserRole = {
  USER: "user",
  ADMIN: "admin",
} as const;

export type UserRoleValue = (typeof UserRole)[keyof typeof UserRole];
