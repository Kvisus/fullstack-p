import { TDraggable, TDraggablesMap } from "./types";

const mockImages = [
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="%23e0e7ff"/><text x="100" y="100" font-size="80" font-family="Arial, sans-serif" font-weight="bold" fill="%233730a3" text-anchor="middle" dominant-baseline="middle">0</text></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="%23dbeafe"/><text x="100" y="100" font-size="80" font-family="Arial, sans-serif" font-weight="bold" fill="%231e40af" text-anchor="middle" dominant-baseline="middle">1</text></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="%23d1fae5"/><text x="100" y="100" font-size="80" font-family="Arial, sans-serif" font-weight="bold" fill="%23065f46" text-anchor="middle" dominant-baseline="middle">2</text></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="%23fef3c7"/><text x="100" y="100" font-size="80" font-family="Arial, sans-serif" font-weight="bold" fill="%2392400e" text-anchor="middle" dominant-baseline="middle">3</text></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="%23fed7aa"/><text x="100" y="100" font-size="80" font-family="Arial, sans-serif" font-weight="bold" fill="%239a3412" text-anchor="middle" dominant-baseline="middle">4</text></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="%23fecaca"/><text x="100" y="100" font-size="80" font-family="Arial, sans-serif" font-weight="bold" fill="%237f1d1d" text-anchor="middle" dominant-baseline="middle">5</text></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="%23fce7f3"/><text x="100" y="100" font-size="80" font-family="Arial, sans-serif" font-weight="bold" fill="%239f1239" text-anchor="middle" dominant-baseline="middle">6</text></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="%23e9d5ff"/><text x="100" y="100" font-size="80" font-family="Arial, sans-serif" font-weight="bold" fill="%236b21a8" text-anchor="middle" dominant-baseline="middle">7</text></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="%23e5e7eb"/><text x="100" y="100" font-size="80" font-family="Arial, sans-serif" font-weight="bold" fill="%231f2937" text-anchor="middle" dominant-baseline="middle">8</text></svg>',
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="%23f3f4f6"/><text x="100" y="100" font-size="80" font-family="Arial, sans-serif" font-weight="bold" fill="%23374151" text-anchor="middle" dominant-baseline="middle">9</text></svg>',
];

export const initialDraggables: TDraggable[] = mockImages.map((draggable, index) => ({
  id: String(index),
  draggable,
}));

export const initialDraggablesMap: TDraggablesMap = new Map(
  initialDraggables.map(d => [d.id, d])
);
