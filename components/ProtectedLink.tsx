"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button, type buttonVariants } from "./ui/button";
import AuthModal from "./AuthModal";
import type { VariantProps } from "class-variance-authority";

interface ProtectedLinkProps {
  href: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  children: ReactNode;
}

export default function ProtectedLink({ href, variant = "ghost", children }: ProtectedLinkProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (session?.user) {
      router.push(href);
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <Button
        variant={variant}
        className="hover:bg-accent hover:text-accent-foreground border-border mb-8 border"
        onClick={handleClick}
      >
        {children}
      </Button>
      <AuthModal
        open={showModal}
        onOpenChange={setShowModal}
      />
    </>
  );
}
