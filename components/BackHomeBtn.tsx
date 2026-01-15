import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

export default function BackHomeBtn() {
  return (
    <Button asChild variant={"ghost"} className="mb-8">
      <Link href={"/"}>
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to Home
      </Link>
    </Button>
  );
}
