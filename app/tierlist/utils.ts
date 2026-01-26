import { arrayMove } from "@dnd-kit/sortable";
import { TDropzone } from "./types";
import { initialDraggables } from "./mockData";

export const DROPZONE_ID = "dropzone";
export const UNSORTED_ID = "unsorted";

export const defaultDropzones: TDropzone[] = [
  {
    id: DROPZONE_ID,
    draggablesIds: [],
  },
  {
    id: UNSORTED_ID,
    draggablesIds: initialDraggables.map(d => d.id),
  },
];

function findDropzoneByDraggableId(dropzones: TDropzone[], draggableId: string): TDropzone | undefined {
  return dropzones.find(dz => dz.draggablesIds.includes(draggableId));
}

function isDropzoneId(dropzones: TDropzone[], id: string): boolean {
  return dropzones.some(dz => dz.id === id);
}

export function arrangeDropzones(dropzones: TDropzone[], activeId: string, overId: string): TDropzone[] {
  const sourceDropzone = findDropzoneByDraggableId(dropzones, activeId);
  if (!sourceDropzone) return dropzones;

  // Case 1: drag to empty space dropzone
  if (isDropzoneId(dropzones, overId)) {
    const targetDropzoneId = overId;

    if (sourceDropzone.id === targetDropzoneId) return dropzones;

    return dropzones.map(dz => {
      if (dz.id === sourceDropzone.id) {
        return { ...dz, draggablesIds: dz.draggablesIds.filter(id => id !== activeId) };
      }
      if (dz.id === targetDropzoneId) {
        return { ...dz, draggablesIds: [...dz.draggablesIds, activeId] };
      }
      return dz;
    });
  }

  // overId — id of the different draggable
  const targetDropzone = findDropzoneByDraggableId(dropzones, overId);
  if (!targetDropzone) return dropzones;

  // Case 2: Sorting within the same dropzone
  if (sourceDropzone.id === targetDropzone.id) {
    const oldIndex = sourceDropzone.draggablesIds.indexOf(activeId);
    const newIndex = sourceDropzone.draggablesIds.indexOf(overId);

    if (oldIndex === newIndex) return dropzones;

    return dropzones.map(dz => {
      if (dz.id === sourceDropzone.id) {
        return { ...dz, draggablesIds: arrayMove(dz.draggablesIds, oldIndex, newIndex) };
      }
      return dz;
    });
  }

  // Case 3: Moving between different dropzones (to a specific element)
  const targetIndex = targetDropzone.draggablesIds.indexOf(overId);

  return dropzones.map(dz => {
    if (dz.id === sourceDropzone.id) {
      return { ...dz, draggablesIds: dz.draggablesIds.filter(id => id !== activeId) };
    }
    if (dz.id === targetDropzone.id) {
      const newIds = [...dz.draggablesIds];
      newIds.splice(targetIndex, 0, activeId);
      return { ...dz, draggablesIds: newIds };
    }
    return dz;
  });
}
