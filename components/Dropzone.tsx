import { useDroppable } from "@dnd-kit/core";
import Draggable from "./Draggable";
import type { TDraggablesMap, TDropzone } from "@/app/tierlist/types";
import { SortableContext } from "@dnd-kit/sortable";
import { UNSORTED_ID } from "@/app/tierlist/utils";
import { cn } from "@/lib/utils";

type DropzoneProps = {
  dropzone: TDropzone;
  draggablesMap: TDraggablesMap;
  variant?: "default" | "free";
};

export default function Dropzone({ dropzone, draggablesMap, variant = "default" }: DropzoneProps) {
  const { id, draggablesIds } = dropzone;
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className={cn("flex w-full flex-row items-center justify-center", variant === "free" && "mt-4")}>
      {variant !== "free" && (
        <div className="flex h-full w-20 items-center justify-center bg-gray-200 text-2xl font-bold">{id}</div>
      )}
      <div
        ref={setNodeRef}
        className={`flex min-h-28 grow flex-wrap gap-2 border p-2 ${
          isOver ? "border-green-500 bg-green-50" : "border-gray-300 bg-gray-50"
        }`}
      >
        <SortableContext items={draggablesIds}>
          {draggablesIds.map(draggableId => {
            const draggable = draggablesMap.get(draggableId);
            if (!draggable) return null;

            return (
              <Draggable
                key={draggableId}
                {...draggable}
              />
            );
          })}
        </SortableContext>
      </div>
    </div>
  );
}
