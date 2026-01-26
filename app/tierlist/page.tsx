"use client";

import DraggableContent from "@/components/DraggableContent";
import Dropzone from "@/components/Dropzone";
import { DndContext, DragOverEvent, DragOverlay, DragStartEvent, pointerWithin } from "@dnd-kit/core";
import { useState } from "react";
import { initialDraggablesMap } from "./mockData";
import { arrangeDropzones, createId, defaultDropzones, UNSORTED_ID } from "./utils";
import { TDropzone, TDraggable } from "./types";

export default function TierlistPage() {
  const [dropzones, setDropzones] = useState<TDropzone[]>(defaultDropzones);
  const [activeDraggable, setActiveDraggable] = useState<TDraggable | undefined>(undefined);
  const [draggablesMap, setDraggablesMap] = useState(() => new Map(initialDraggablesMap));

  const handleDragStart = (event: DragStartEvent) => {
    const draggableId = String(event.active.id);
    setActiveDraggable(draggablesMap.get(draggableId));
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
  const handleFilesSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    const dataUrls = await Promise.all(
      files.map(
        file =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = () => reject(new Error("Failed to read file"));
            reader.readAsDataURL(file);
          })
      )
    );

    const newDraggables = dataUrls.map(src => ({
      id: createId(),
      draggable: src,
    }));

    setDraggablesMap(prev => {
      const next = new Map(prev);
      newDraggables.forEach(draggable => next.set(draggable.id, draggable));
      return next;
    });

    setDropzones(prev =>
      prev.map(dropzone =>
        dropzone.id === UNSORTED_ID
          ? { ...dropzone, draggablesIds: [...dropzone.draggablesIds, ...newDraggables.map(d => d.id)] }
          : dropzone
      )
    );

    event.target.value = "";
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-start gap-4 pt-6">
      <div className="flex w-full max-w-5xl items-center justify-between gap-3 px-4">
        <div className="text-sm text-gray-600">Upload images to add them to the unsorted row.</div>
        <label className="cursor-pointer rounded bg-black px-3 py-2 text-sm text-white">
          <input
            className="hidden"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFilesSelected}
          />
          Add images
        </label>
      </div>
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
            draggablesMap={draggablesMap}
            variant={dropzone.id === UNSORTED_ID ? "free" : "default"}
          />
        ))}

        <DragOverlay>{activeDraggable && <DraggableContent draggable={activeDraggable} />}</DragOverlay>
      </DndContext>
    </div>
  );
}
