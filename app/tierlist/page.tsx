"use client";

import DraggableContent from "@/components/DraggableContent";
import Dropzone from "@/components/Dropzone";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, pointerWithin } from "@dnd-kit/core";
import { useState } from "react";
import { initialDraggablesMap } from "./mockData";
import { arrangeDropzones, defaultDropzones, UNSORTED_ID } from "./utils";
import { TDropzone, TDraggable } from "./types";

export default function TierlistPage() {
  const [dropzones, setDropzones] = useState<TDropzone[]>(defaultDropzones);
  const [activeDraggable, setActiveDraggable] = useState<TDraggable | undefined>(undefined);

  const handleDragStart = (event: DragStartEvent) => {
    const draggableId = String(event.active.id);
    setActiveDraggable(initialDraggablesMap.get(draggableId));
  };

  const handleDragEnd = () => {
    setActiveDraggable(undefined);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    setDropzones(prev => arrangeDropzones(prev, activeId, overId));
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <DndContext
        collisionDetection={pointerWithin}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
      >
        {dropzones.map(dropzone => (
          <Dropzone
            key={dropzone.id}
            dropzone={dropzone}
            draggablesMap={initialDraggablesMap}
            variant={dropzone.id === UNSORTED_ID ? "free" : "default"}
          />
        ))}

        <DragOverlay>{activeDraggable && <DraggableContent draggable={activeDraggable} />}</DragOverlay>
      </DndContext>
    </div>
  );
}
