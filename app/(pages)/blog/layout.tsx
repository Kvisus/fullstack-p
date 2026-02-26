import type { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <main className="mx-auto min-h-screen max-w-3xl px-4 py-16">{children}</main>;
}
