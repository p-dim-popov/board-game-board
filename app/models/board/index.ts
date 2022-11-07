import type { BoardBox } from '~/models/board/box';
import { createErrorClass } from '~/utils';
import type { Point } from '~/models/point';
import { PointOps } from '~/models/point';
import type { Player } from '~/models/player';
import Lazy from 'lazy.js';

export type Board = {
  boxes: BoardBox[];
  players: Player[];
};

type BoardDimension = {
  left: Point;
  right: Point;
};

export const BoardOps = {
  new: (): Board => ({
    boxes: [],
    players: [],
  }),

  setBoxes:
    (boxes: BoardBox[]) =>
      (self: Board): Board => {
        if (
          boxes.some((b) =>
            b.allowedNext.some(
              (an) => !boxes.some((b1) => PointOps.equals(an)(b1.position)),
            ),
          )
        ) {
          throw createErrorClass('BoardConstructError', [
            'NEXT_POINT_NOT_DECLARED',
          ]).create('NEXT_POINT_NOT_DECLARED');
        }

        return {
          ...self,
          boxes,
        };
      },

  getDimensions: (self: Board): BoardDimension => {
    const enumerable = Lazy(self.boxes);
    const byAsc = (a: number, b: number) => a - b;

    const {
      0: smallestX,
      length: xLength,
      [xLength - 1]: biggestX,
    } = enumerable
      .map((x) => x.position.x)
      .sort(byAsc)
      .toArray();

    const {
      0: smallestY,
      length: yLength,
      [yLength - 1]: biggestY,
    } = enumerable
      .map((x) => x.position.y)
      .sort(byAsc)
      .toArray();

    return {
      left: PointOps.new(smallestX, smallestY),
      right: PointOps.new(biggestX, biggestY),
    };
  },

  ConstructError: createErrorClass('BoardConstructError', [
    'NEXT_POINT_NOT_DECLARED',
  ]),

  setPlayers: (players: Player[]) => (board: Board) => ({ ...board, players }),
};
