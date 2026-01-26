import { useDroppable } from "@dnd-kit/core";
import Draggable from "./Draggable";
import type { TDraggablesMap, TDropzone } from "@/app/tierlist/types";
import { SortableContext } from "@dnd-kit/sortable";

type DropzoneProps = {
  dropzone: TDropzone;
  draggablesMap: TDraggablesMap;
};

export default function Dropzone({ dropzone, draggablesMap }: DropzoneProps) {
  const { id, draggablesIds } = dropzone;
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`flex min-h-28 w-full flex-wrap gap-2 border p-2 ${
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
  );
}
