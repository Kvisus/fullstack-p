"use client";

import { TDraggable } from "@/app/tierlist/types";
import Image from "next/image";

export default function DraggableContent({ draggable }: { draggable: TDraggable }) {
  const isInlineImage = draggable.draggable.startsWith("data:") || draggable.draggable.startsWith("blob:");

  return (
    <Image
      src={draggable.draggable}
      alt={`draggable-${draggable.id}`}
      width={94}
      height={94}
      unoptimized={isInlineImage}
      draggable={false}
      className="select-none"
    />
  );
}
