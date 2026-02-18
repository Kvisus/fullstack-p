import React from "react";
import { Button, type buttonVariants } from "./ui/button";
import Link from "next/link";
import { ArrowLeftIcon, type LucideIcon } from "lucide-react";
import type { VariantProps } from "class-variance-authority";

interface LinkBtnProps {
  href: string;
  label?: string;
  icon?: LucideIcon;
  variant?: VariantProps<typeof buttonVariants>["variant"];
}

export default function LinkBtn({ href, label, icon: Icon = ArrowLeftIcon, variant = "ghost" }: LinkBtnProps) {
  const defaultLabel = () => {
    const lastPart = href.split("/").pop();
    return `Back to ${lastPart ? lastPart.charAt(0).toUpperCase() + lastPart.slice(1) : "Home"}`;
  };

  return (
    <Button
      asChild
      variant={variant}
      className="hover:bg-accent hover:text-accent-foreground border-border mb-8 border"
    >
      <Link href={href}>
        <Icon className="mr-2 h-4 w-4" />
        {label ?? defaultLabel()}
      </Link>
    </Button>
  );
}
