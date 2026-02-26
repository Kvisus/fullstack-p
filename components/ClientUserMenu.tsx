"use client";

import dynamic from "next/dynamic";

const UserMenu = dynamic(() => import("@/components/UserMenu"), {
  ssr: false,
});

export default function ClientUserMenu() {
  return <UserMenu />;
}
