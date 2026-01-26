export type TDraggable = {
  id: string;
  draggable: string;
};

export type TDropzone = {
  id: string;
  draggablesIds: string[];
};

export type TDraggablesMap = Map<string, TDraggable>;
