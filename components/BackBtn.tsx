import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

export default function BackBtn({ href }: { href: string }) {
  const lastPart = href.split("/").pop();
  return (
    <Button
      asChild
      variant={"ghost"}
      className="mb-8"
    >
      <Link href={href}>
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back to {lastPart ? lastPart.charAt(0).toUpperCase() + lastPart.slice(1) : "Home"}
      </Link>
    </Button>
  );
}
