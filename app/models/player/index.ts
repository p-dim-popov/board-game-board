import type { Point } from '~/models/point';
import { generateId } from '~/utils';
import { PointOps } from '~/models/point';
import type { Distinct } from '~/interfaces';

export type PlayerId = Distinct<string, 'PlayerId'>;
export type Player = {
  id: PlayerId;
  position: Point;
  isSelected: boolean;
};

export const PlayerOps = {
  new: (): Player => ({
    id: generateId() as PlayerId,
    position: PointOps.new(0, 0),
    isSelected: false,
  }),
  move: (position: Point) => (self: Player) => ({
    ...self,
    position,
  }),
  reset: (player: Player): Player => ({
    ...PlayerOps.new(),
    id: player.id,
  }),
};
