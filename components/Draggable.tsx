"use client";

import type { TDraggable } from "@/app/tierlist/types";
import { useSortable } from "@dnd-kit/sortable";
import DraggableContent from "./DraggableContent";
import { CSS } from "@dnd-kit/utilities";

export default function Draggable(draggable: TDraggable) {
  const { id } = draggable;
  const { setNodeRef, listeners, attributes, transform, isDragging, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.2 : 1,
    transition,
  };

  return (
    <button
      className="cursor-pointer touch-none select-none"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      <DraggableContent draggable={draggable} />
    </button>
  );
}
