import type { Point } from '~/models/point';
import { generateId } from '~/utils';

export type Player = {
  id: string
  position: Point
};

export const PlayerOps = {
  new: (): Player => ({
    id: generateId(),
    position: { x: 0, y: 0 },
  }),
  move: (position: Point) => (self: Player) => ({
    ...self,
    position,
  }),
};
