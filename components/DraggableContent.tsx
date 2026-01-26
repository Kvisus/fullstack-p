"use client";

import { TDraggable } from "@/app/tierlist/types";
import Image from "next/image";

export default function DraggableContent({ draggable }: { draggable: TDraggable }) {
  return (
    <Image
      src={draggable.draggable}
      alt={`draggable-${draggable.id}`}
      width={94}
      height={94}
    />
  );
}
